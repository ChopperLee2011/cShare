'use strick'

angular.module('fullstackApp')
    .controller('cShareCtrl', function($scope, $http, $routeParams, $location, shareThingsFactory) {
        $scope.loadTags = function(query) {
            //Todo
            //return $http.get('/tags?query=' + query);
            return;
        };
        $scope.create = function() {
            var createUser = 'ChopperLee';
            if ($scope.title === '') {
                return;
            }

            var shareThings = new shareThingsFactory({
                title: $scope.title,
                tags: $scope.tags,
                content: $scope.content,
                create: createUser,
                time: new Date().toString(),
                active: true
            });
            shareThings.$save();
            // var shareThings = {
            //     title: $scope.title,
            //     tags: $scope.tags,
            //     content: $scope.content,
            //     create: createUser,
            //     time: new Date().toString(),
            //     active: true
            // };

            // $http.post('/api/cshare', shareThings);
            $location.path('/cShare/list');
        };
        $scope.find = function() {
            $scope.sharethings = shareThingsFactory.query();
            // $http.get('/api/cshare')
            //     .
            // success(function(data, status, headers, config) {
            //     console.log('find data is : ' + data);
            //     $scope.sharethings = data;
            // }).
            // error(function(data, status, headers, config) {
            //     console.log('can not find any shares');
            // });
        };

        $scope.findOne = function() {
            $scope.shareImg = false;
            $scope.shareTxt = false;
            $scope.shareMpg = false;
            var shareThing = shareThingsFactory.get({
                sharethingid: $routeParams.share_id
            }, function(response) {
                $scope.sharething = shareThing;
                $scope.sharething._id= shareThing._id;
                var tags = $scope.tags = shareThing.tags[0].text;
                switch (tags.toLowerCase()) {
                    case "music":
                        $scope.shareMpg = true;
                        var audioAddr = /(www[^>"]+)/g.exec(shareThing.content)[0];
                        $scope.audioAddr = "//" + audioAddr;
                        break;
                    case "text":
                        $scope.shareTxt = true;
                        $scope.textContent = shareThing.content;

                        console.info($scope.textContent);
                        break;
                    case "image":
                        $scope.shareImg = true;
                        break;
                }

            });
        };
        $scope.removeOne = function(sharething) {
            console.info(sharething._id);
            shareThingsFactory.remove({
                sharethingid: sharething._id
            }, function(response) {
                $location.path('/cShare/list');

            });

        }

    })
    .filter('trusted', ['$sce',
        function($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl(url);
            };
        }
    ]);
