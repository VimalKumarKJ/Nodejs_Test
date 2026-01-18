//helper
const setJson = (res, statusCode, payload) => {
    res.statusCode = statusCode;
    res.end(JSON.stringify({payload}));
}
//////////////////////////////////////////////////////////////////

export const getHome = (req, res) => {
    return setJson(res, 200, {name: 'vimal'});
};

export const getHealth = (req, res) => {
    return setJson(res, 200, {status: "ok", env: "development", timeStamp: new Date().toISOString()});
};

export const echoPing = (req, res, param) => {
    if(param === 'hello'){
        return setJson(res, 200, {message: "hello"});
    }
    else {
        return setJson(res, 404, {message: "Not found"});
    }
}

export const setHomeText = (req, res) => {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    })

    req.on("end", () => {
        return setJson(res, 201, {body});
    })

    req.on("error", (error) => {
        console.log(error);
    })
};

export const notFound = (req, res) => {
    return setJson(res, 404, {message: 'Page not found'});
}