import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        {/* <link rel="shortcut icon" href={getStrapiMedia(global.favicon)} /> */}
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Staatliches'
        />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
