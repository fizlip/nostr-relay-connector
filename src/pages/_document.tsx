import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Hurricane&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Hurricane&family=Permanent+Marker&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700;900&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Monoton&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Gruppo&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Contrail+One&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+39+Text&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Chicle&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Nosifer&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Rubik+Beastly&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Lexend+Peta&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Knewave&display=swap" rel="stylesheet" /> 
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
