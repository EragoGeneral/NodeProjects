/**
 * Created by Administrator on 2017/12/3.
 */
module.exports = {
    sleep : function sleep(numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    }
};