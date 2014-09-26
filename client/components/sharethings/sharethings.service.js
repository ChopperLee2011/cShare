'use strict';

angular.module('fullstackApp')
    .factory('shareThingsFactory',function($resource) {

        return $resource('/api/cshare/:sharethingid', {
            sharethingid: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });
