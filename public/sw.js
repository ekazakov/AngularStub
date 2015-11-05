const mocks = [];

function responseFactory(event, mock) {
    const url = event.request.url;
    const method = event.request.method;

    const handler = (body) => {
        const response = getResponse(mock, url, method, body);
        return new Response(stringify(response.data), response);
    }

    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        return event.request.json()
            .then(handler)
            .catch(error => console.error(error));
    }

    return Promise.resolve(null).then(handler);
}

function getResponse(mock, url, method, body) {
    if (typeof mock.response === 'function') {
        return mock.response(url, method, body);
    }

    return mock.response;
}

function stringify(data) {
    return typeof data === 'string' ? data : JSON.stringify(data);
}

function isRequestMatches(requestUrl, requestMethod, mock) {
    const regexp = mock.url instanceof RegExp ? mock.url : new RegExp(mock.url);
    return regexp.test(requestUrl);
}

function addMock(mock) {
    mocks.push(mock);
}

self.addEventListener('fetch', (event) => {
    const url = event.request.url;
    const method = event.request.method;
    const mock = mocks.find((mock) => isRequestMatches(url, method, mock));

    if (mock == null) {
        return;
    }

    console.warn(`Request to ${url} is mocked`);
    event.respondWith(responseFactory(event, mock));
});

self.importScripts('mocks.js');