import * as React from 'react';
import { Link, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as ReactDOMServer from 'react-dom/server';

import Header from './components/common/Header';

const Html = (location: string, context: any, store: any, preloadedState: any) => {
    const serverRenderComponents = ReactDOMServer.renderToString(
        <Provider store={ store }>
            <Header location={ location } context={ context } />
        </Provider>
    );

    return (
        `
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Фреймворки Демо</title>
                <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css" />
            </head>
            <body>

                ${ serverRenderComponents }

                <div id="app"></div>

                <script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
                </script>

                <script src="/index.js"></script>

            </body>
        </html>
        `
    );
};

export default Html;