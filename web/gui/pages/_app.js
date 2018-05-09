import React from 'react'
import App, {Container} from 'next/app'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

class Layout extends React.Component {
  render () {
    const {children} = this.props

    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <AppBar position='static' color='primary'>
            <Toolbar>
              <Grid container>
                <Grid item xs={6}>
                  <img src="/static/logo.svg" title="Chainlink" />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={8}>
              {children}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props

    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    )
  }
}
