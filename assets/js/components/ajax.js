module.exports = class Ajax {
    constructor() {

    }

    x() {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        }
        var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];

        var xhr;
        for (var i = 0; i < versions.length; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch (e) {
            }
        }
        return xhr;
    }

    send(url, callback, method, data, async, dataType) {
        if (async === undefined) {
            async = true;
        }
        var x = this.x();
        x.open(method, url, async);
        x.onreadystatechange = function () {
            if (x.readyState == 4) {
                callback(x.responseText)
            }
        };
        if (method == 'POST') {
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            if (dataType == 'json') {
                x.setRequestHeader('Accept', 'application/json');
            }
        }
        x.send(data)
    }

    get(url, data, callback, async) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        this.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
    }

    post(url, data, callback, async, dataType) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        this.send(url, callback, 'POST', query.join('&'), async, dataType)
    }
}