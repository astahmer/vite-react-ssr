import { PageContext } from "./types";

export function getPageTitle(pageContext: PageContext): string {
    const title =
        // For static titles (defined in the `export { documentProps }` of the page's `.page.js`)
        pageContext.pageExports.documentProps?.title ||
        // For dynamic tiles (defined in the `export addContextProps()` of the page's `.page.server.js`)
        pageContext.documentProps?.title ||
        "vite-react-ts-chakra-ssr";
    return title;
}

export const getPageDocumentProps = (pageContext: PageContext) =>
    pageContext.pageExports.documentProps || pageContext.documentProps;
