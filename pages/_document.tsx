import Document, { Html, Head, Main, NextScript } from "next/document";
import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID } from "../lib/gtag";

class EntendedDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                        page_path: window.location.pathname,
                      });
                  `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default EntendedDocument;
