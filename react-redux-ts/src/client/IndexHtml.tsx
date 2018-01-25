import * as React from 'react';

class HeaderPlaceholder extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div id="header">Header Component will be rendered HERE</div>
        );
    }
}

const IndexHtml = () => (
    <html>
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Фреймворки Демо</title>
            <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css" />
        </head>
        <body>
            <HeaderPlaceholder />

            <div id="app"></div>

            <script src="/index.js"></script>

        </body>
    </html>
);

export default IndexHtml;