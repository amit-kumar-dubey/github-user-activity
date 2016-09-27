// @amit kumar dubey
// For beter structure i breaking files into the following folder structure-
// js
//   controllers      
//   conponents
//   services
//   partials
//   filters

'use strict';
var app = angular.module('Reddit', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'javascript/templates/pages/about-this.html',
                 
            })
            .when('/reddit.com', {
                templates:"<reddit-c></reddit-c>"
            })
            .otherwise({
                redirectTo: '/'
            });
    }).filter('getDate', function($filter) {
        return function(input) {
            if (input == null) {
                return "null";
            }
            var timestamp1 = new Date().getTime(),
                timestamp2 = input * 1000,
                diff = timestamp1 - timestamp2,
                days = Math.floor(diff / (1000 * 60 * 60 * 24)),
                months = Math.floor(days / 31),
                years = Math.floor(months / 12),
                d = new Date(diff),
                hours = d.getHours(),
                message = 'Submitted ';
            
            if (days >= 365) {
                days = days - months * 31 - years * 12 * 31;
            }
            if (years >= 1) {
                months = months - years * 12;
                message += years + " years ";
            }
            if (months >= 1) {
                message += months + " months "
            }
            if (days > 1) {
                message += days + " days "
            }
            if (hours >= 1 && hours <= 23) {
                message += hours + " hours \n"
            }
            message += " ago by ";
            return message;
        };
    });