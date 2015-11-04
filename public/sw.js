var log = console.log.bind(console);
log('SW ready');
var apiCall = /\/api\//i;

var context = this;

function requestsMock(base, config) {
    context.addEventListener('fetch', (event) => {
        var url = event.request.url;
        var method = event.request.method;

        if (!base.test(url)) {
            return;
        }

        console.log(event.request);

        var stub = config.find((stub) => isRequestMatches(url, method, stub));

        if (stub != null) {
            console.warn(`Request ${url} stubbed`);
            if (method === 'POST' && typeof stub.response === 'function') {
                event.respondWith(
                    event.request.json()
                        .then((body) => {
                            var response = stub.response(url, method, body);
                            return new Response(getData(response.data), response);
                        })
                );
            } else {
                event.respondWith(
                    new Response(getData(stub.response.data), stub.response)
                );
            }

        }
    });
}

function getData(data) {
    return typeof data === 'string' ? data : JSON.stringify(data);
}

function isRequestMatches(requestUrl, requestMethod, stub) {
    if (stub.url instanceof RegExp) {
        return stub.url.test(requestUrl);
    }

    return requestUrl.search(stub.url) !== -1;
}

requestsMock(apiCall, [
    {
        url: '/api/A',
        response: {
            data: 'fake response A',
            status: 201,
            statusText: 'Stabbed response A'
        }
    },
    {
        url: '/api/B',
        response: () => ({
            data: 'fake response B',
            status: 201,
            statusText: 'Stabbed response B'
        })
    }

]);