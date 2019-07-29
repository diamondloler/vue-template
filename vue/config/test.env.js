const PACKAGE = require('../package.json');

module.exports = {
    NODE_ENV: 'development',
    publicPath: `http://testhd.huya.com/${PACKAGE.category}/${PACKAGE.projectName}/`
};