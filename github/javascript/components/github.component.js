(function() {
    'use strict';
    angular
        .module('Github')
        .component('githubComponent', {
            bindings: {
                data: '<'
            },
            transclude: true,

            templateUrl: 'javascript/templates/pages/github.component.html',

            controller: function($log, userService) {
                var vm = this;
                var userData;
                getDataService();

                function getDataService() {
                    return getData().then(function() {
                        $log.info('geting data from server active');
                    });

                }

                function getData() {
                    return userService.getData().then(function(data) {
                        return vm.userData = data;
                    });
                }

            },
        }).component('userProfileBio', {
            bindings: {
                data: "<"
            },
            templateUrl: 'javascript/templates/pages/user.profile.bio.html'
        }).component('userProfileNav', {
            bindings: {
                data: "<"
            },
            templateUrl: 'javascript/templates/pages/user.profile.nav.html'
        }).component('userProfileRepo', {
            bindings: {
                data: "<"
            },
            templateUrl: 'javascript/templates/pages/user.profile.repo.html'
        });



})();
