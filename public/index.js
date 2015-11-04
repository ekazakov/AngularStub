var http;
var log = console.log.bind(console);
angular.module('app', [])
    .config(function($provide) {
//                $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    })
    //            .run(function ($httpBackend) {
    //                $httpBackend.whenGET('/api/v1/methodA').respond(200, {
    //                    "res": 'fake'
    //                }, null, 'Nice');
    //
    //                $httpBackend.whenGET(/^\/api\/.+/).passThrough();
    //            })
    .controller('AppController', function ($http) {
        http = $http;
    });

//    http.get('/api/v1/methodA').then(log, log)

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js', {scope: '/'})
        .then((reg) => {
            log('Registration succeeded. Scope is ', reg.scope);
        })
        .catch((err) => {
            log('Registration failed with ', err);
        });
}