var app = angular.module("myApp", ["ngRoute"]);
    app.config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : "timer.html"
        })
        .when("/settings", {
            templateUrl : "settingsPage.html"
        })
        .when("/help", {
            templateUrl : "helpPage.html"
        })
        .when("/breakTime", {
            templateUrl : "breakTimePage.html"
        })
        .when("/studyTime", {
            templateUrl : "studyTimePage.html"
        });
    });