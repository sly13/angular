angular.module('factory', [])
    .factory('yamanetaRestApiFactory', function ($http, yamaneta) {
        return {
            auth : function (token) {
                return $http({
                    method : 'GET',
                    url : yamaneta.option.authUrl,
                    headers : {
                        'Content-Type' : "application/x-www-form-urlencoded",
                        'Authorization' : 'Basic ' + token
                    }
                })
            },
            getOffers : function () {
                return $http({
                    method : 'GET',
                    url : yamaneta.option.offersUrl,
                    headers : {
                        'Content-Type' : 'application/json; charset=UTF-8',
                        'Authorization' : 'Bearer ophKo4A6XthwMKZPOQqnDAhYs1gPbOx0'
                    }
                })
            }
        }
    })
    .factory('userRestApiFactory', function ($http, jsonplaceholder) {
        return {
            getUsers : function () {
                return $http({
                    method : 'GET',
                    url : jsonplaceholder.option.usersUrl
                })
            },
            createUser : function (user) {
                return $http({
                    method : 'POST',
                    data : user,
                    url : jsonplaceholder.option.createUserUrl
                })
            },
            deleteUser : function (id) {
                return $http({
                    method : 'DELETE',
                    url : jsonplaceholder.option.deleteUserUrl(id)
                })
            },
            updateUser : function (data, id) {
                return $http({
                    method : 'PUT',
                    data : data,
                    url : jsonplaceholder.option.updateUserUrl(id)
                })
            }
        }
    });