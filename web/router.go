package web

import (
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gobuffalo/packr"
	"github.com/smartcontractkit/chainlink/logger"
	"github.com/smartcontractkit/chainlink/services"
)

// Router listens and responds to requests to the node for valid paths.
func Router(app *services.ChainlinkApplication) *gin.Engine {
	engine := gin.New()
	config := app.Store.Config
	basicAuth := gin.BasicAuth(gin.Accounts{config.BasicAuthUsername: config.BasicAuthPassword})
	engine.Use(
		loggerFunc(),
		corsHandler(),
		gin.Recovery(),
		basicAuth,
	)

	v1 := engine.Group("/v1")
	{
		ac := AssignmentsController{app}
		v1.POST("/assignments", ac.Create)
		v1.GET("/assignments/:ID", ac.Show)
	}

	v2 := engine.Group("/v2")
	{
		j := JobSpecsController{app}
		v2.GET("/specs", j.Index)
		v2.POST("/specs", j.Create)
		v2.GET("/specs/:SpecID", j.Show)

		jr := JobRunsController{app}
		v2.GET("/specs/:SpecID/runs", jr.Index)
		v2.POST("/specs/:SpecID/runs", jr.Create)
		v2.PATCH("/runs/:RunID", jr.Update)

		tt := BridgeTypesController{app}
		v2.POST("/bridge_types", tt.Create)

		backup := BackupController{app}
		v2.GET("/backup", backup.Show)
	}

	box := packr.NewBox("./gui/out/")
	engine.StaticFS("/gui", box)

	return engine
}

// Inspired by https://github.com/gin-gonic/gin/issues/961
func loggerFunc() gin.HandlerFunc {
	return func(c *gin.Context) {
		buf, err := ioutil.ReadAll(c.Request.Body)
		if err != nil {
			logger.Warn("Web request log error: ", err.Error())
			c.Next()
			return
		}
		rdr := bytes.NewBuffer(buf)
		c.Request.Body = ioutil.NopCloser(bytes.NewBuffer(buf))

		start := time.Now()
		c.Next()
		end := time.Now()

		logger.Infow("Web request",
			"method", c.Request.Method,
			"status", c.Writer.Status(),
			"path", c.Request.URL.Path,
			"query", c.Request.URL.RawQuery,
			"body", readBody(rdr),
			"clientIP", c.ClientIP(),
			"comment", c.Errors.ByType(gin.ErrorTypePrivate).String(),
			"servedAt", end.Format("2006/01/02 - 15:04:05"),
			"latency", fmt.Sprintf("%v", end.Sub(start)),
		)
	}
}

// TODO:
// Only configure this in development. When the gui is served from the
// binary it has the same origin.
func corsHandler() gin.HandlerFunc {
	c := cors.Config{
		// next.js dev server
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	return cors.New(c)
}

func readBody(reader io.Reader) string {
	buf := new(bytes.Buffer)
	buf.ReadFrom(reader)

	s := buf.String()
	return s
}
