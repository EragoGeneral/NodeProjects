var sa = require('superagent');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var url = require('url');

const downfile = (fileUrl, targetFile) => {
    sa.get(fileUrl).then(({res}) => {
        fs.writeFile(targetFile, res.text, 'utf-8');
    }, e => {
        console.error('fetch file error: ' + fileUrl);
    });
};

const run = (args) => {
    if (!args) {
        console.error('error: no arguments specified');
        return;
    }

    let basicDir = path.resolve('.');
    if (args.target) {
        basicDir = path.resolve(basicDir, args.target);
    }

    console.log('checking target dir:' + basicDir);
    try {
        if (!fs.existsSync(basicDir)) {
            fs.mkdirSync(basicDir);
        }
    } catch (e) {
        console.error('create dir failed, please mkdir: ' + basicDir);
        return;
    }

    console.log('fetching file list ...');
    sa.get(args.remote).then(({res}) => {
        // console.log(res.text);
        let $ = cheerio.load(res.text);
        $('pre > a').each((i, elem) => {
            let href = $(elem).attr('href');
            if (/^\.\.?\/?/.test(href)) {
                return;
            }

            let name = $(elem).text();
            console.log('downloading file: ' + name);
            downfile(url.resolve(args.remote, href), path.resolve(basicDir, name));
        })
    }, e => {
        console.error('visit page failed:' + args.remote);
    });
};

module.exports = {
    run: run
};
