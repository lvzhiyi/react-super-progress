import fecha from 'fecha';

export const format = (date, format) => {
    if (!date || !format) {
        return date;
    }
    if (typeof date === 'string') {
        date = fecha.parse(date, format);
    }

    var o = {
        'M+': date.getMonth() + 1, //month
        'D+': date.getDate(), //day
        'H+': date.getHours(), //hour
        'm+': date.getMinutes(), //minute
        's+': date.getSeconds(), //second
        'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
        S: date.getMilliseconds() //millisecond
    };
    if (/(Y+)/.test(format))
        format = format.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp('(' + k + ')').test(format))
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : ('00' + o[k]).substr(('' + o[k]).length)
            );
    return format;
};

Date.prototype.format = function(s) {
    return format(this, s);
};
