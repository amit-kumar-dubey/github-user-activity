(function() {
    'use strict';

    angular.module('Github').factory('userService', userService);

    userService.$inject = ['$http', '$log', '$q', '$location'];

    function userService($http, $log, $q, $location) {

        return {
            getData: getData
        }

        function getData(username) {
            var url = $location.url();

            return $http.get("https://api.github.com/users" + url).then(dataComplete, dataFailed);

            function dataComplete(response) {
                var allData = [];
                var values = response.data;
                var promise_url = $http({ method: 'GET', url: values.url, cache: 'true' });
                var promise_followers_url = $http({ method: 'GET', url: values.followers_url, cache: 'true' });
                var promise_subscriptions_url = $http({ method: 'GET', url: values.subscriptions_url, cache: 'true' });
                var promise_repos_url = $http({ method: 'GET', url: values.repos_url, cache: 'true' });
                var promise_received_events_url = $http({ method: 'GET', url: values.received_events_url, cache: 'true' });
                $q.all([promise_url, promise_followers_url, promise_subscriptions_url, promise_repos_url, promise_received_events_url]).then(function(data) {
                    for (var i = 0; i < data.length; i++) {
                        allData.push(data[i]);
                    }
                });
                return allData;
            }
        }

        function dataFailed(error) {

            $q.reject(error.status);
            //return $log.error('geting data from server failed',error.data);
        }

    }



})();


// example for single request  - 

// function dataFailed(error){
//                  need q object only for tesing perpose 
//                  q.reject(error.status);
//                 
//               }


//other way to do it in multiple request-- 


// return $q.all(tasks.map(function(d){
//         return $http.post('upload/tasks',d).then(someProcessCallback, onErrorCallback);
//     }));
