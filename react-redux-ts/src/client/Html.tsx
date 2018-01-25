import * as React from 'react';
import { Link, StaticRouter } from 'react-router-dom';

import Header from './components/common/Header';

interface HtmlProps {
    location: string;
    context: any;
}

const Html = (props: HtmlProps) => (
    <html>
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Фреймворки Демо</title>
            <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css" />
        </head>
        <body>

            <Header
                location={ props.location }
                context={ props.context } />

            <div id="app"></div>

            <script src="/index.js"></script>

        </body>
    </html>
);

export default Html;