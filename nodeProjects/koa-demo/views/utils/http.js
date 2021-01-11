
const METHOD = {
    GET: 'GET',
    POST: 'POST'
};

const ajax = ({
    type = METHOD.GET,
    url,
    data,
    headers = {},
    timeout = 8000,
}) => {
    type = type.toUpperCase();
    return new Promise((resolve, reject) => {
        _ajax({
            type,
            url,
            data,
            headers,
            successCb: resolve,
            failCb: reject,
            timeout,
        });
    });
};

async function _ajax({
    type,
    url,
    data = {},
    headers = {},
    successCb,
    failCb,
    timeout = 8000,
    addDefaultData
}) {
    if (url[0] === '/') {
        url = `http://localhost:3000${url}`;
    }

    let xhr = new XMLHttpRequest();
    if (type === METHOD.GET) {
        xhr.open('GET', `${url}?${parseData(data)}`, true);
    } else if (type === METHOD.POST) {
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
    }
    addHeader({ xhr, headers });

    listenLoad({ xhr, url, data, successCb, failCb });
    listenError({ xhr, failCb });
    listenTimeout({ xhr, timeout, failCb });

    console.log('request data:', data);
    if (type === METHOD.GET) {
        xhr.send();
    } else if (type === METHOD.POST) {
        xhr.send(JSON.stringify(data));
    }
}

function listenLoad({ xhr, failCb, successCb }) {
    xhr.onload = async function () {
        if (xhr.status !== 200) {
            console.log(`request error xhr.status: ${xhr.status}`);
            failCb(xhr.response);
            return;
        }

        try {
            let json = JSON.parse(xhr.response);
            if (!json.code) {
                successCb(json);
            }
            let code = Number(json.code);
            if (code === 200 || code === 1001) {
                successCb(json);
            } else {
                failCb(json);
            }
        } catch (e) {
            failCb(xhr.response);
        }
    };
}

function listenError({ xhr, failCb }) {
    xhr.onerror = function () {
        console.log('请求失败');
        failCb({
            code: '1',
            msg: '请求失败'
        });
    };
}

function listenTimeout({ xhr, failCb, timeout }) {
    xhr.timeout = timeout;
    xhr.ontimeout = function () {
        console.log('请求失败(网络超时)');
        failCb({
            code: '408',
            msg: '请求失败(网络超时)'
        });
    };
}

function parseData(data) {
    let strArr = [];
    for (let key in data) {
        if (data[key] !== null && data[key] !== undefined) {
            strArr.push(`${key}=${encodeURIComponent(data[key])}`);
        }
    }
    console.log('query:', strArr.join('&'));
    return strArr.join('&');
}

function addHeader({ xhr, headers }) {
    for (let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
    }
}
