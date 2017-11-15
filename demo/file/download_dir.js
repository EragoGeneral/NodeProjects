var fetcher = require('fetch-remote-dir')
fetcher.run({
    remote: 'http://jimu.ubtrobot.com/syncUser/WX_o-gShww4URXiLTqFh7q_6rWuxmJM/',
    selector: 'body>pre>a',
    target: 'E://JimuServer'
});