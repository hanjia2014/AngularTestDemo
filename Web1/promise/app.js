var app = angular.module('angularjs-starter', []);

app.controller('MainCtrl', function ($scope, myService) {

    //The clean way
    $scope.foo = myService.getFoo();

    //The "but I really like callbacks" way.
    myService.getFoo().then(function (data) {
        $scope.foo2 = data;
    });

    //The "common callback" pattern
    myService.getBar(function (data) {
        $scope.bar = data;
    });

    //So what happens if I just return 
    // whatever $http.get() returns?
    $scope.test = myService.testHttpGetResult();
});

app.factory('myService', function ($http, $q) {
    return {
        getFoo: function () {
            var deferred = $q.defer();
            $http.get('foo.json').success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });
            return deferred.promise;
        },
        getBar: function (callback) {
            $http.get('foo.json').success(callback);
        },
        testHttpGetResult: function () {
            return $http.get('foo.json');
        }
    }
});