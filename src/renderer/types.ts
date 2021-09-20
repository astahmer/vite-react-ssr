import type { PageContextBuiltIn } from "vite-plugin-ssr/types";
export type Component = (pageProps: any) => JSX.Element;
export type Children = React.ReactNode | React.ReactNode[];
export type PageContext = PageContextBuiltIn & {
    Page: Component;
    pageExports: {
        documentProps?: DocumentProps;
    };
    pageProps: Record<string, unknown>;
    documentProps?: DocumentProps;
};

export interface DocumentProps {
    title: string;
    description?: string;
}
