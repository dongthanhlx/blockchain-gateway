function success(res, data) {
    data = data || {};
    res.set('Content-Type', 'application/json');
    res.send({
        success: true,
        data: data,
        error: ''
    });
}

function fail(res, msg, code) {
    code = code || 500;
    msg = msg || '';
    res.status(code);
    res.set('Content-Type', 'application/json');
    res.send({
        success: false,
        error: msg,
        data: {}
    });
}

module.exports = {success, fail}