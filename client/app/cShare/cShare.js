'use strict';

angular.module('fullstackApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/cShare/create',{
      	templateUrl:'app/cShare/create-share.html',
      	controller: 'cShareCtrl'
      })
      .when('/cShare/list',{
      	templateUrl:'app/cShare/list-share.html'
      });
  });