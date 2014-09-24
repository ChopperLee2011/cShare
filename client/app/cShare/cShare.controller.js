'use strick'

angular.module('fullstackApp')
    .controller('cShareCtrl', function($scope, $http, $routeParams, $location) {
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
            var shareThings = {
                title: $scope.title,
                tags: $scope.tags,
                content: $scope.content,
                create: createUser,
                time: new Date().toString(),
                active: true
            };
            $http.post('/api/cshare', shareThings);
            $location.path('/cShare/list');
        };

        $scope.find = function() {
            $http.get('/api/cshare')
                .
            success(function(data, status, headers, config) {
                console.log('find data is : ' + data);
                $scope.sharethings = data;
            }).
            error(function(data, status, headers, config) {
                console.log('can not find any shares');
            });
        };

        $scope.findOne = function() {
            $scope.shareImg = false;
            $scope.shareTxt = false;
            $scope.shareMpg = false;
            var shareId = $scope.shareId = $routeParams.share_id;
            $http.get('/api/cshare/' + shareId)
                .
            success(function(data, status, headers, config) {
                var shareThing = $scope.sharething = data;
                var tags = $scope.tags = shareThing.tags[0].text;
                switch(tags.toLowerCase()){
                    case "music":
                        $scope.shareMpg = true;
                        var audioAddr = /(www[^>"]+)/g.exec(shareThing.content)[0];
                        $scope.audioAddr = "//" + audioAddr;
                        console.info($scope.audioAddr);
                        break;
                    case "text":
                        $scope.shareTxt = true;
                        $scope.textContent = shareThing.content;
                        // document.write('<iframe id="someIframe" src="data:text/html,' + escape(shareThing.content) + '"></iframe>'); 
                        console.info($scope.textContent);
                        break;
                    case "image":
                        $scope.shareImg = true;
                        break;
                }
            }).
            error(function(data, status, headers, config) {
                console.info('can not find any shares');
            });
        };

    })
    .filter('trusted', ['$sce',
        function($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl(url);
            };
        }
    ]);
