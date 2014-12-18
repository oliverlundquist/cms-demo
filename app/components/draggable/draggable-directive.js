(function() {
    'use strict';

    angular
        .module('myApp.draggable.draggable-directive', [])
        .directive('draggable', draggable);

    draggable.$inject = ['$document', 'widgets'];

    function draggable($document, widgets) {
        var sourceElement = null;
        var sourceElementType = null;
        var sourceElementIndex = 0;
        var sourceElementTemplateName = null;
        var directive = {
            link: link,
            //scope: { isDragging: '=dragz' },
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

              //element.bind('paste', function (e) { e.preventDefault(); document.execCommand('inserttext', false, prompt('このハコにテキストをはりつけてください。')); });
              element.bind('keyup', function (e) { scope.templates = widgets.saveTemplates(scope.templates); });
              element.bind('keydown', function (e) { if (e.keyCode === 13) { document.execCommand('insertHTML', false, '<br>'); return false; } } );

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
                var isAddingTemplate = (sourceElementType === 'templateWidget') ? true : false;
                //var targetElement = this;
                var targetElement = element;

                if (e.stopPropagation) {
                  e.stopPropagation(); //stops redirection
                }

                if (sourceElement !== targetElement) {
                  var droppedAtIndex = attrs.index;
                  var newTemplate = {}

                  if (isAddingTemplate) {
                    scope.templates.splice((droppedAtIndex+1), 0, widgets.getTemplate(sourceElementTemplateName))
                  }
                  else {
                    var backup_source = angular.copy( scope.templates[sourceElementIndex] );
                    var backup_target = angular.copy( scope.templates[droppedAtIndex] );
                    scope.templates[sourceElementIndex] = backup_target;
                    scope.templates[droppedAtIndex] = backup_source;
                  }

                }

                scope.$apply();



                  // if( ! addingNewTemplate) {
                  //   $document.find('.templates .template').each(function (i, obj) {
                  //       if(obj.innerHTML !== sourceElement.html()) {
                  //         filtered.push(obj.innerHTML);
                  //       }
                  //   });
                  // }
                  // else {
                  //   $document.find('.templates .template').each(function (i, obj) {
                  //     filtered.push(obj.innerHTML);
                  //   });
                  //   //filtered.splice(currentindex, 0, sourceElement.html());
                  //   console.log(widgets.getTemplate(sourceElementTemplateName));
                  //   console.log(sourceElementTemplateName);
                  //   filtered.splice(currentindex, 0, widgets.getTemplate(sourceElementTemplateName).contents);
                  // }

                  // $(filtered).each(function (i, obj) { scope.templates[i] = {contents: obj}; }); //rebuild
                  // console.log(scope.templates);
                return false;
            }

            function dragstart (e) {
                sourceElement = element;
                sourceElementType = attrs.type;
                sourceElementIndex = attrs.index;
                sourceElementTemplateName = attrs.templateName;
                //sourceElement.css({ 'opacity': '0.4' });
                sourceElement.addClass('moving');
                e.originalEvent.dataTransfer.effectAllowed = 'move';
                e.originalEvent.dataTransfer.setData('text/html', element.html());
            }

            function dragend (e) {
                $document.find('.templates .template').removeClass('over');
                $document.find('.templates .template').removeClass('moving');
                sourceElement.removeClass('over');
                sourceElement.removeClass('moving');
                //sourceElement.css({ 'opacity': '1.0' });
            }

        }

    }

})();
