addMock({
    method: 'GET',
    url: '/api/A',
    response (...args) {
        return {
            data: 'fake response A for GET',
            status: 200,
            statusText: 'Stabbed response A'
        };
    }
});

addMock({
    url: '/api/C',
    response: {
        data: 'fake response C',
        status: 201,
        statusText: 'Stabbed response C'
    }
})

addMock({
    url: '/api/B',
    response: () => ({
        data: 'fake response B',
        status: 201,
        statusText: 'Stabbed response B'
    })
})