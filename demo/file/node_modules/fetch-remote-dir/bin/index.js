var fetcher = require('../lib/index.js');

const getArgs = () => {
    var args = process.argv.slice(2);
    return args.map(arg => {
        return arg.replace('--', '').split('=');
    }).reduce((ret, arg) => {
        ret[arg[0]] = arg[1];
        return ret;
    }, {});
};

const help = () => {
    console.log('usage: fetch-remote-dir --remote=http://yoursite/dirname --selector="body>pre>a" [--target=your/target/dir]');
};

const run = () => {
    let args = {};

    try {
        args = getArgs();
        if (!args.remote || !args.selector) {
            throw 'arguments error: need remote url !';
        }
    } catch (e) {
        console.error(e);
        help();
        return;
    }

    fetcher.run(args);
};

run();
