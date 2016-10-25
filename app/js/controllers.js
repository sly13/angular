angular.module('controllers', [])
    .controller('MainCtrl', function ($scope) {

    })

    .controller('TestLoginCtrl', function ($scope, $state, $localStorage, yamanetaRestApiFactory, base64, $http) {
        user = {
            email : 'vadimsemenko@gmail.com',
            password: 'sly130013'
        };
        token = base64.encode(user.email+':'+user.password);
        console.log(token);
        yamanetaRestApiFactory.auth(token).success(function (data) {
            console.log(data);
            $scope.data = 'success';
            /*$localStorage.userAvatarUrl = data.avatarUrl;
             $localStorage.userAuthKey = data.authKey;
             $localStorage.userBalanceMoney = data.balanceMoney;
             $localStorage.userHoldMoney = data.holdMoney;
             $localStorage.userCashbackKey = data.cashbackKey;
             $localStorage.userEmail = data.email;*/

        }).error(function (data) {
            $scope.data = 'error';
        });
    })

    .controller('LoginCtrl', function ($scope, $state, $localStorage, yamanetaRestApiFactory, base64) {
        $scope.login = function (user) {
            /*console.log(user);
            token = base64.encode(user.email+':'+user.password);
            console.log(token);
            yamanetaRestApiFactory.auth(token).success(function (data) {
                console.log(data);
                /!*$localStorage.userAvatarUrl = data.avatarUrl;
                $localStorage.userAuthKey = data.authKey;
                $localStorage.userBalanceMoney = data.balanceMoney;
                $localStorage.userHoldMoney = data.holdMoney;
                $localStorage.userCashbackKey = data.cashbackKey;
                $localStorage.userEmail = data.email;*!/

                $state.go('app.dashboard');
            }).error(function (data) {
                console.log(data);
            });*/

            if (user.email === 'admin' && user.password === 'admin') {
                $localStorage.login = true;
                $state.go('app.dashboard');
            }


        }
    })

    .controller('LogoutCtrl', function ($scope, $state, $localStorage) {
        $localStorage.login = false;
        $state.go('app.login');
    })

    .controller('DashboardCtrl', function ($scope, $state, $localStorage) {
        if (!$localStorage.login) {
            $state.go('app.login');
        }
    })

    .controller('OffersCtrl', function ($scope, $state, $localStorage, yamanetaRestApiFactory) {
        /*if (!$localStorage.login) {
            $state.go('app.login');
        }*/

        $scope.offers = [];

        yamanetaRestApiFactory.getOffers().success(function (data, status, header) {
            $scope.offers = data;
            console.log(data);
        }).error(function (data) {
            console.log('error');
        });
    })

    .controller('UsersCtrl', function ($scope, $state, $localStorage, userRestApiFactory, $uibModal, myResolve) {
        if (!$localStorage.login) {
            $state.go('app.login');
        }

        console.log(myResolve)
        $scope.users = [];

        // get Users list
        userRestApiFactory.getUsers().success(function (data) {
            $scope.users = data;

            //pagination
            $scope.totalItems = $scope.users.length;
            $scope.pageSize = 4;
            $scope.currentPage = 1;

        }).error (function (data) {
            console.log('error')
        });

        // modal window for create user
        $scope.createUserModal = function () {
            $scope.createUserModal = $uibModal.open({
                'templateUrl' : 'views/users/create.html',
                scope : $scope,
                //size : 'sm',
                animation: true
            })
        };

        // create new user
        $scope.submitCreateUserForm = function (user) {
            userRestApiFactory.createUser(user).success(function (data) {
                console.log(data);
                $scope.users.push(data);
                $scope.users.totalItems = $scope.users.length;
                console.log($scope.users.totalItems);
                $scope.createUserModal.close();
            }).error(function () {
                console.log('error')
            })
        };

        // delete user
        $scope.deleteUser = function (id) {
            userRestApiFactory.deleteUser(id).success(function (data) {
                $scope.users = $scope.users.filter(function (user) {
                    return user.id !== id;
                });

                console.log(data);
                //$scope.users = data;
            }).error(function () {
                console.log('error')
            })
        };

        // update user
        $scope.createUserModalUpdate = function (user, index) {
            $scope.currentUser = user;
            $scope.currentUser.index = index;

            $scope.createUserModalUpdate = $uibModal.open({
                'templateUrl' : 'views/users/update.html',
                scope : $scope,
                //size : 'sm',
                animation: true
            });
        };

        $scope.submitUpdateUserForm = function (user, id, index) {
            userRestApiFactory.updateUser(user, id).success(function (data) {
                console.log(data);
                $scope.users[index] = data;
                $scope.createUserModalUpdate.close();
                //$scope.users = data;
            }).error(function () {
                console.log('error')
            })
        };
    })

    .controller('HeaderCtrl', function ($scope) {

    })

    .controller('FooterCtrl', function ($scope) {

    });

