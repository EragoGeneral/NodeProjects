# fetch-remote-dir

Very easy downloader to fetch all listed files(with anchor element '<a>') from a remote web page via HTTP.

### usage

install:
```
npm install fetch-remote-dir [-g]
```

cli mode:
```
fetch-remote-dir --remote=http://yoursite/dirname --selector="x>y>z" [--target=your/target/dir]
```

program mode:
```
var fetcher = require('fetch-remote-dir')
fetcher.run({
    remote: 'http://yoursite/dirname',
    selector: 'file>anchor>selector',
    target: 'your/target/dir'
})
```

### options

__remote__ 
> remote url of file list page

__selector__
> jquery-like selector to get all file links(present as element <a>)

__target__
> local directory to save downloaded files