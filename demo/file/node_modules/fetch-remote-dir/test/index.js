var fetcher = require('../lib')

fetcher.run({
    remote: 'http://res.wisedu.com/WeCloud/emap-meta/wec-smmp/wec-smmp-sinfo/',
    selector: 'body>pre>a',
    target: 'meta-json'
})
