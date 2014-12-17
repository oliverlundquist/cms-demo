(function() {
    'use strict';

    angular
        .module('myApp.widgets.widgets-factory', [])
        .factory('widgets', widgets);

    widgets.$inject = [];

    function widgets() {
        var someValue = '';
        var service = {
            getTemplate: getTemplate,
            someValue: someValue
        };
        return service;

        ////////////

        function getTemplate() {
            return { contents: $.parseHTML('<h1 contenteditable="true">abc</h1>') }
        };

    }




})();
