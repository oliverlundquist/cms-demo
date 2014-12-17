(function() {
    'use strict';

    angular
        .module('myApp.draggable.draggable-directive', [])
        .directive('draggable', draggable);

    draggable.$inject = ['$document', 'widgets'];

    function draggable($document, widgets) {
        var sourceElement = null;
        var sourceElementType = null;
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            var isContentWidget = attrs.type === 'contentsWidget' ? true : false;

            if (isContentWidget) {
              element.bind('dragenter', dragenter);
              element.bind('dragleave', dragleave);
              element.bind('dragover',  dragover);
              element.bind('drop',      drop);
            }
            element.bind('dragstart', dragstart);
            element.bind('dragend', dragend);

            ////////////

            function dragenter (e) {
                element.addClass('over');
            }

            function dragleave (e) {
                element.removeClass('over');
            }

            function dragover (e) {
                if (e.preventDefault) {
                  e.preventDefault();
                }
                e.originalEvent.dataTransfer.dropEffect = 'move';
                return false;
            }

            function drop (e) {
                var addingNewTemplate = sourceElementType === 'templateWidget' ? true : false;
                var targetElement = this;


                if (e.stopPropagation) {
                  e.stopPropagation(); //stops redirection
                }

                if (sourceElement !== targetElement) {
                  var currentindex = $document.find('.templates div').index(targetElement)
                  var filtered = [];

                  if( ! addingNewTemplate) {
                    $document.find('.templates div').each(function (i, obj) {
                        if(obj.innerHTML !== sourceElement.html()) {
                          filtered.push(obj.innerHTML);
                        }
                    });
                  }
                  else {
                    $document.find('.templates div').each(function (i, obj) {
                      filtered.push(obj.innerHTML);
                    });
                    filtered.push(widgets.getTemplate()['contents'][0]);
                  }

                  filtered.splice(currentindex, 0, sourceElement.html());
                  $(filtered).each(function (i, obj) { scope.templates[i] = obj; }); //rebuild
                  console.log(scope.templates);
                  scope.$apply();
                }
                return false;
            }

            function dragstart (e) {
                sourceElement = element;
                sourceElementType = attrs.type;
                sourceElement.css({ 'opacity': '0.4' });
                sourceElement.addClass('moving');
                e.originalEvent.dataTransfer.effectAllowed = 'move';
                e.originalEvent.dataTransfer.setData('text/html', element.html());
            }

            function dragend (e) {
                $document.find('.templates div').removeClass('over');
                $document.find('.templates div').removeClass('moving');
                sourceElement.removeClass('over');
                sourceElement.removeClass('moving');
                sourceElement.css({ 'opacity': '1.0' });
            }

        }

    }

})();
