import * as React from 'react';
import { Link, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as ReactDOMServer from 'react-dom/server';

import Header from './components/common/Header';

const Html = (location: string, context: any, preloadedState: any) => {
    const header = ReactDOMServer.renderToString(
        <Header location={ location } context={ context } />
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

                ${ header }

                <div id="app"></div>

                <script>
                    __PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
                </script>

                <script src="/index.js"></script>

            </body>
        </html>
        `
    );
};

export default Html;