const conf = require('./base.webpack.config');

conf.entry.app = [ 
    ...conf.entry.app,
    'webpack-hot-middleware/client'
];

// conf.performance = {
//     hints: false,
//     maxEntrypointSize: 512000,
//     maxAssetSize: 512000
// };

conf.devtool = 'source-map';
module.exports = conf;
