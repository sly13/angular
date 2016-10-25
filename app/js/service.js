angular.module('service', [])
    .service('yamaneta', function () {
        var domain = 'http://yamaneta.dev/api/';
        this.option = {
            offersUrl : domain + 'offers/index',
            authUrl : domain + 'profile/index'
        }
    })
    .service('jsonplaceholder', function () {
        var domain = 'http://jsonplaceholder.typicode.com/';
        this.option = {
            usersUrl : domain + 'users',
            createUserUrl : domain + 'users',
            deleteUserUrl : function (id) {
                return domain + 'users/' + id + '/'
            },
            updateUserUrl : function (id) {
                return domain + 'users/' + id + '/'
            }
        }
    });