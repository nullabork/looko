const conf = require('./base.webpack.config');

conf.entry.app = [ 
    ...conf.entry.app,
    'webpack-hot-middleware/client'
];

module.exports = conf;
