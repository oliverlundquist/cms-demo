'use strict';

angular.module('myApp.view1', ['ngRoute', 'myApp.draggable.draggable-directive', 'myApp.widgets.widgets-factory'])// 'htmlSortable'])//, 'myApp.sortable.sortable-directive'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

  $scope.containers = ['container1', 'container2', 'container3', 'container4'];

  $scope.templates = ['タイトル','段落','イメージ'];

  $scope.yey = [];

  $scope.trustAsHtml = $sce.trustAsHtml;

  // for(var i=0; i<5; i++) {
  //   var a = contentsWidget;
  //   a.contents = "woohoo" + i;
  //   $scope.yey.push(a);
  // }
  // console.log($scope.yey);

  //$scope.gimmethatapply = function () { $scope.$apply(); };
  //$scope.$watch('templates');

  // $scope.sortableOptions = {
  //   placeholder: '<div class="sortable-placeholder col-md-3"><div></div></div>',
  //   forcePlaceholderSize: true,
  //   connectWith: '.connected'
  // };

  // $scope.sortableCallback = function (startModel, destModel, start, end) {
  //     console.log(startModel);
  //     console.log(destModel);
  //     $scope.templates = ['タイトル', '段落'];
  // };

}]);
