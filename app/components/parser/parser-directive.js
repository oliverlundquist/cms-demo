(function() {
    'use strict';

    angular
        .module('myApp.parser.parser-directive', [])
        .directive('parser', parser);

    parser.$inject = ['$parse'];

    function parser($parse) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {

            scope.$watch(function (n, o) {
                if(n !== o) {
                    //element.html( $.parseHTML( scope.templates[ parseInt(attrs.index, 10) ].contents ) );
                    element.html( $.parseHTML( scope.templates[attrs.index].contents ) );

                    //refactor to another directive
                    //scope.templates[ scope.$index ].index = scope.$index;


                    //element.html( $.parseHTML( attrs.contents ) );
                }
            });

        };
    };

})();
