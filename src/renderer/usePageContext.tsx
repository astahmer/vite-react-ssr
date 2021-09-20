import React, { useContext } from "react";

import { Children, PageContext } from "./types";

const ReactPageContext = React.createContext<PageContext>(undefined as any);

export function PageContextProvider({ pageContext, children }: { pageContext: PageContext; children: Children }) {
    return <ReactPageContext.Provider value={pageContext}>{children}</ReactPageContext.Provider>;
}

export function usePageContext() {
    const pageContext = useContext(ReactPageContext);
    return pageContext;
}
