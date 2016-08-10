app.service('redditService',["$http", function($http) {
    this.getData = function(){
      return $http.get("https://www.reddit.com/r/javascript.json");
     }
}]);