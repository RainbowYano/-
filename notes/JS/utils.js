// 隐藏手机号中间四位
function hidePhone(tel) {
    let phone = tel
    if (typeof (tel) === 'number') {
        phone = tel + ''
    }
    let reg = /^(\d{3})\d{4}(\d{4})$/
    return phone.replace(reg, "$1****$2");
}

// 隐藏姓名中间的那个字
function hideUserName(name) {
    // 如果姓名是两位数
    if (name.length <= 2) {
        return name.substring(0, 1) + '*'
    }
    // 如果姓名是三位及以上的数
    let star = ''
    for (var i = 0; i < name.length - 2; i++) {
        star += '*'
    }
    let firstName = name.substring(0, 1)
    let endName = name.substring(name.length - 1)
    return firstName + star + endName
}

// 金额大写
function toUpeerCase(num) {
    var strOutput = "";
    var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    if (num) {
        num += "00";
        var intPos = num.indexOf('.');
        if (intPos >= 0)
            num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
        strUnit = strUnit.substr(strUnit.length - num.length);
        for (var i = 0; i < num.length; i++)
            strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
        return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(
            /零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
    } else {
        return '-';
    }
}

// JS格式化数字金额用逗号隔开保留两位小数
function fmoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}
// 还原
function rmoney(s) {
    return parseFloat(s.replace(/[^\d\.-]/g, ""));
}


// 时间戳改为日期  类似 2018-09-12 10:12:30
function timestampToTime(timestamp) {
    var date = new Date(timestamp );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D+h+m+s;
}

//时间转换器
function timestampToTime(timestamp) {
var date = new Date(timestamp);
var y = date.getFullYear();// 年
var MM = date.getMonth() + 1;// 月
MM = MM < 10 ? ('0' + MM) : MM;
var d = date.getDate();// 日
d = d < 10 ? ('0' + d) : d;
var h = date.getHours();// 时
h = h < 10 ? ('0' + h) : h;
var m = date.getMinutes();// 分
m = m < 10 ? ('0' + m) : m;
var s = date.getSeconds();// 秒
s = s < 10 ? ('0' + s) : s;
return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
          }