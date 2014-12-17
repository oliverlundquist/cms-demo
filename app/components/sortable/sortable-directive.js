'use strict';

angular.module('myApp.sortable.sortable-directive', [])

.directive('sortable', ['$timeout', 'draggable', function($timeout, draggable) {
  return function(scope, elm, attrs) {
    console.log(draggable);
  };
}])

.service('contentsWidget', [function () {
  this.contents = {};
}])

//myApp.service('helloWorldFromService', function() {
//     this.sayHello = function() {
//         return "Hello, World!"
//     };
// });

.directive('widgetsMenu', ['$document', 'draggable', function ($document, draggable) {

  return function (scope, elm, attrs) {

    elm.attr('draggable', true);

    elm.on('dragstart', function (e) { draggable.source = this; draggable.adding = true; });

    elm.on('dragend', function (e) { draggable.adding = false; $document.find('.templates div').removeClass('over'); $document.find('.templates div').removeClass('moving'); });

  }

}])

.directive('contentsContainer', ['$document', '$timeout', 'draggable', function($document, $timeout, draggable) {
  return {
    scope: null,
    link: function (scope, elm, attrs) {

      elm.attr('draggable', true);

      elm.on('dragstart', function (e) {
          this.style.opacity = '0.4';
          this.classList.add('moving');
          //dragSrcEl = this;
          draggable.source = this;
          e.originalEvent.dataTransfer.effectAllowed = 'move';
          e.originalEvent.dataTransfer.setData('text/html', this.innerHTML);
      });

      elm.on('dragenter', function (e) {
        this.classList.add('over');
      });

      elm.on('dragleave', function (e) {
        this.classList.remove('over');
      });

      elm.on('dragover', function (e) {
        if (e.preventDefault) { e.preventDefault(); }
        e.originalEvent.dataTransfer.dropEffect = 'move';
        return false;
      });

      elm.on('drop', function (e) {
        if (e.stopPropagation) { e.stopPropagation(); } //stops redirection
        if (draggable.source != this) {
          var currentindex = $document.find('.templates div').index(this)
          var filtered = [];

          if(draggable.adding === false) {
            $document.find('.templates div').each(function (i, obj) {
                if(obj.innerHTML !== draggable.source.innerHTML) {
                  filtered.push(obj.innerHTML);
                }
            });
          }
          else {
            $document.find('.templates div').each(function (i, obj) {
              filtered.push(obj.innerHTML);
            });
          }

          filtered.splice(currentindex, 0, draggable.source.innerHTML);
          $(filtered).each(function (i, obj) { scope.templates[i] = obj; }); //rebuild
          console.log(scope.templates);
          scope.$apply();
        }
        return false;
      });

      elm.on('dragend', function (e) {
        //change to children()
        //make this directive attach on wrapper only
        $document.find('.templates div').removeClass('over');
        $document.find('.templates div').removeClass('moving');
        this.style.opacity = '1.0';
      });

    }
  };
}])

.factory('draggable', [function() {
  return {
    adding: false,
    source: {}
  };
}]);

