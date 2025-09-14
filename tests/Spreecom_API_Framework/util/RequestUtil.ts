const baseURI = "https://demo.spreecommerce.org";
var basePath = "";
var reqobj = { headers: {}, data: {} }
function setBasePath(basePathTerm) {
    basePath = basePathTerm
}
function resetBasePath() {
    basePath = ""
}
function setContentTypeJson() {
    reqobj.headers['Content-Type'] = 'application/vnd.api+json'
}
function setBody(data) {
    reqobj.data = data
}
function setToken(token) {
    reqobj.headers['Authorization'] = 'Bearer ' + token
}
function resetReqObj() {
    reqobj = { headers: {}, data: {} }
}
async function response(request, method) {
    console.log(method, baseURI, basePath, reqobj)
    switch (method) {
        case "get": return request.get(baseURI + basePath, reqobj);
        case "post": return request.post(baseURI + basePath, reqobj);
        case "put": return request.put(baseURI + basePath, reqobj);
        case "delete": return request.delete(baseURI + basePath, reqobj);
        case "patch": return request.patch(baseURI + basePath, reqobj);
    }
}

export {setBasePath, resetBasePath, setContentTypeJson, setBody, setToken, resetReqObj, response}



