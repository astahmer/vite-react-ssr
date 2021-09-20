import "./PageWrapper.css";

import { ChakraProvider } from "@chakra-ui/react";
import React, { ReactNode } from "react";

import { Layout } from "@/components/Layout";

import { PageContext } from "./types";
import { PageContextProvider } from "./usePageContext";

export function PageWrapper({ pageContext, children }: { pageContext: PageContext; children: ReactNode }) {
    return (
        <React.StrictMode>
            <PageContextProvider pageContext={pageContext}>
                <ChakraProvider>
                    <Layout>{children}</Layout>
                </ChakraProvider>
            </PageContextProvider>
        </React.StrictMode>
    );
}
