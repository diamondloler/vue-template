const jdists = require('jdists');


class JdistsHtml {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {

        compiler.hooks.compilation.tap('JdistsHtml', (compilation) => {
            // Staic Plugin interface |compilation |HOOK NAME | register listener
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
                'JdistsHtml', // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                    // Manipulate the content

                    let html = jdists.build(data.html, {
                        fromString: true,
                        remove: this.options.remove,
                        trigger: 'release'
                    });

                    data.html = html;
                    // Tell webpack to move on
                    cb(null, data);
                }
            );
        });
    }
}

module.exports = JdistsHtml;