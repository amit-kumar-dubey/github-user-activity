// @amit kumar dubey
// app.js

(function() {
    'use strict';

    angular.module('Github', ['ngRoute'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    template: "<github-component></github-component>"
                })
                .otherwise({
                    template: "<github-component></github-component>"
                });
            //$locationProvider.html5Mode(true);
        });
})();
