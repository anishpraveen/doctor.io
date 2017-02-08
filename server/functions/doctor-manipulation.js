module.exports = {
    getTime: function (time) {
        if (time > 12) {
            time = time - 12;
            var length = Math.ceil(Math.log(time + 2) / Math.LN10);
            if (length > 1)
                time = time + ':00 PM';
            else
                time = '0' + time + ':00 PM';
        }
        else {
            var length = Math.ceil(Math.log(time + 1) / Math.LN10);
            if (length > 1)
                time = time + ':00 AM';
            else
                time = '0' + time + ':00 AM';
        }
        return time;
    }
}