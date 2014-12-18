(function() {
    'use strict';

    angular
        .module('myApp.widgets.widgets-factory', [])
        .factory('widgets', widgets);

    widgets.$inject = ['$document'];

    function widgets($document) {
        var someValue = 'someValue';
        var service = {
            getTemplate: getTemplate,
            saveTemplates: saveTemplates,
            someValue: someValue
        };
        return service;

        ////////////

        function getTemplate(type) {
            if (typeof type === "undefined") { type = 'title'; };

            switch (type) {
                case 'title':
                    return { contents: '<h1 contenteditable="true">タイトル</h1>' }
                    break;
                case 'subtitle':
                    return { contents: '<h2 contenteditable="true" class="plus">サブタイトル</h2>' }
                    break;
                case 'paragraph':
                    return { contents: '<p contenteditable="true">段落</p>' }
                    break;
                case 'image':
                    return { contents: '<img src="http://assets.kurashicom.com/blog/uploads/2014/11/honda_29_1215.jpg" alt="" />' }
            }
        };

        function saveTemplates(templates) {
            $document.find('.templates .template').each(function (i, obj) {
                console.log(obj);
                console.log(obj.innerHTML);
                console.log($(obj).html());
                console.log( templates[i] );
                templates[i].contents = obj.innerHTML;
            });
            return templates;
        };

    }

})();
