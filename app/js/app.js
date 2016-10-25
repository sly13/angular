var app = angular.module('myApp', [
    'controllers',
    'ui.router',
    'factory',
    'service',
    'directives',
    'ngStorage',
    'ui.bootstrap',
    'utf8-base64'
]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/app/dashboard');
    $stateProvider
        .state('app', {
            url: '/app',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })

        .state('app.login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('app.test-login', {
            url: '/test-login',
            templateUrl: 'views/test-login.html',
            controller: 'TestLoginCtrl'
        })

        .state('app.logout', {
            url: '/logout',
            //templateUrl: 'views/login.html',
            controller: 'LogoutCtrl'
        })

        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        })

        .state('app.users', {
            url: '/users',
            templateUrl: 'views/users/list.html',
            controller: 'UsersCtrl',
            resolve : {
                myResolve : function ($q, userRestApiFactory) {
                    var defer = $q.defer();
                    userRestApiFactory.getUsers().success(function (data) {
                        defer.resolve(data);
                    }).error(function (data) {
                        defer.reject();
                    });

                    return defer.promise;
                }
            }
        })
        .state('app.offers', {
            url: '/offers',
            templateUrl: 'views/offers.html',
            controller: 'OffersCtrl'
        })
});
