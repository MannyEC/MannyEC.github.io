/**
 * Created by MacBook on 16/5/7.
 */
var app = angular.module('mainApp',['ngRoute']);
    app.config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/',{templateUrl:'test.html'})
            .when('/regist',{template:'regist page'})
            .when('/login',{template:'login page'})
            .otherwise({redirectTo:'/'});
    }]);