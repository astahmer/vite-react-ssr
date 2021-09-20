import ReactDOMServer from "react-dom/server";
import { dangerouslySkipEscape, escapeInject } from "vite-plugin-ssr";

import { getPageDocumentProps, getPageTitle } from "./getPageTitle";
import logoUrl from "./logo.png";
import { PageWrapper } from "./PageWrapper";
import { PageContext } from "./types";

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps", "documentProps", "urlPathname"];

export function render(pageContext: PageContext) {
    const { Page, pageProps } = pageContext;
    const pageContent = ReactDOMServer.renderToString(
        <PageWrapper pageContext={pageContext}>
            <Page {...pageProps} />
        </PageWrapper>
    );

    const title = getPageTitle(pageContext);
    const props = getPageDocumentProps(pageContext);

    const documentHtml = escapeInject`<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                ${props?.description ? `<meta name="description" content="${props.description}" />` : ""}
                <title>${title}</title>
                <link rel="icon" href="${logoUrl}" />
            </head>
            <body>
                <div id="page-view">${dangerouslySkipEscape(pageContent)}</div>
            </body>
        </html>`;

    return {
        documentHtml,
        pageContext: {
            // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
        },
    };
}
