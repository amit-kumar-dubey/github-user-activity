app.component('redditC', {
   bindings: {
    data: '<'
  },

  templateUrl:'javascript/templates/pages/redditC.html',
  controller: function ($scope, $interval, redditService) {
    function init(){
      redditService.getData().then(function(res){
        $scope.redditData = res.data;
      });
    }
    init();
}
});