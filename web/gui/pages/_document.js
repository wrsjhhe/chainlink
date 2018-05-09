import Document, { Head, Main, NextScript } from 'next/document'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import CssBaseline from 'material-ui/CssBaseline'
import green from 'material-ui/colors/green'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#776bfa',
      main: '#3c40c6',
      dark: '#001894',
      contrastText: '#fff',
    },
    success: {
      light: green.A400,
      main: green.A700,
      dark: green['700'],
      contrastText: '#fff'
    }
  }
})

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
        </Head>
        <body className="chainlink_custom_class">
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Main />
          </MuiThemeProvider>
          <NextScript />
        </body>
      </html>
    )
  }
}
