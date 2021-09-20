import path from "path";

import express from "express";
import { createPageRenderer } from "vite-plugin-ssr";

const isProduction = process.env.NODE_ENV === "production";
const rootDir = process.cwd();
const root = `${__dirname}/..`;

startServer();

export async function startServer() {
    const app = express();

    let viteDevServer;
    if (isProduction) {
        app.use(express.static(`${root}/dist/client`, { index: false }));
    } else {
        const vite = await import("vite");
        const { default: reactRefresh } = await import("@vitejs/plugin-react-refresh");
        const { default: reactJsx } = await import("vite-react-jsx");
        viteDevServer = await vite.createServer({
            root,
            resolve: {
                alias: [{ find: "@", replacement: path.join(rootDir, "./src") }],
            },
            server: { middlewareMode: true },
            plugins: [reactRefresh(), reactJsx()],
        });
        app.use(viteDevServer.middlewares);
    }

    const renderPage = createPageRenderer({ viteDevServer, isProduction, root });
    app.get("*", async (req, res, next) => {
        const url = req.originalUrl;
        const pageContextInit = { url };
        const pageContext = await renderPage(pageContextInit);
        if (!pageContext.httpResponse) return next();

        res.status(pageContext.httpResponse.statusCode).send(pageContext.httpResponse.body);
    });

    const port = process.env.PORT || 3010;
    app.listen(port);
    console.log(`Server running at http://localhost:${port}`);
}
