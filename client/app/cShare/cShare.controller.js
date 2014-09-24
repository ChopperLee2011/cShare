'use strick'

angular.module('fullstackApp')
    .controller('cShareCtrl', function($scope, $http) {

        $scope.create = function() {
            var createUser = 'ChopperLee';
            if ($scope.title === '') {
                return;
            }
            var shareThings = {
                title: $scope.title,
                content: $scope.content,
                create: createUser,
                time: new Date().toString()
            };
            $http.post('/api/cshare', shareThings);
        };

        $scope.find = function() {
                $http({
                    method: 'GET',
                    url: '/api/cshare'
                }).
            success(function(data, status, headers, config) {
                console.log('find data is : ' + data );
                $scope.sharethings = data;
            }).
            error(function(data, status, headers, config) {
                console.log('can not find any shares');
            });
        };

    });
