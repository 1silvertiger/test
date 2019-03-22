const express = require('express'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    babel = require('@babel/core');

const test = require('./src/test');

const app = express();
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);

// Step 2: Attach the dev middleware to the compiler & the server
app.use(require("webpack-dev-middleware")(compiler, {
    logLevel: 'warn', publicPath: webpackConfig.output.publicPath
}));

// Step 3: Attach the hot middleware to the compiler & the server
app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

const server = app.listen(8000);

console.log('Express server listening on port 8080');

app.use(express.static('./src/public'));
app.set('views', './src/public/html/');
app.use(express.static('./src/public'));
app.set('views', './src/public/html/');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.all('/', function (req, res, next) {
    test.test();
    res.send('It worked.');
});