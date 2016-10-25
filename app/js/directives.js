angular.module('directives', [])
    .directive('appHeader', function () {
        return {
            'templateUrl' : 'app/layouts/header.html',
            'controller' : 'HeaderCtrl'
        }
    })
    .directive('appFooter', function () {
        return {
            'templateUrl' : 'app/layouts/footer.html',
            'controller' : 'FooterCtrl'
        }})
    .filter('startFrom', function () {
        return function (data, start) {
            return data.slice(start);
        }
    })