import { omit } from "@pastable/utils";
import axios from "axios";
import type { PageContextBuiltIn } from "vite-plugin-ssr/types";

import type { MovieDetails } from "./movie.types";

export async function onBeforeRender(pageContext: PageContextBuiltIn) {
    const response = await axios(`https://star-wars.brillout.com/api/films/${pageContext.routeParams.movieId}.json`);

    // We remove data we don't need because we pass `pageContext.movie` to
    // the client; we want to minimize what is sent over the network.
    const movie = omit(response.data, ["data"]) as MovieDetails;

    return {
        pageContext: {
            pageProps: { movie },
            documentProps: {
                title: movie.title, // The page's <title>
            },
        },
    };
}
