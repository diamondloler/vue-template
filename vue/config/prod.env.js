const PACKAGE = require('../package.json');

module.exports = {
    NODE_ENV: 'production',
    publicPath: `https:/a.msstatic.com/huya/hd/${PACKAGE.category}/${PACKAGE.projectName}/`
};