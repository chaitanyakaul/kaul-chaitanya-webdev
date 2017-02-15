/**
 * Created by chaitanyakaul on 06/02/17.
 */
/**
 * Created by chaitanyakaul on 06/02/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

    var widgets=
        [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "6456", "widgetType": "HEADER", "pageId": "412", "size": 2, "text": "GIZMODO"},
            { "_id": "456456", "widgetType": "HEADER", "pageId": "412", "size": 4, "text": "Lorem ipsum"},
            { "_id": "7567", "widgetType": "IMAGE", "pageId": "412", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "87686", "widgetType": "HTML", "pageId": "412", "text": "<p>Lorem ipsum</p>"},
            { "_id": "45456", "widgetType": "HEADER", "pageId": "412", "size": 4, "text": "Lorem ipsum"},
            { "_id": "567567", "widgetType": "YOUTUBE", "pageId": "412", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "567567", "widgetType": "HTML", "pageId": "412", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "createHeaderWidget": createHeaderWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "findWidgetById": findWidgetById,
            "createImageWidget": createImageWidget,
            "createYoutubeWidget": createYoutubeWidget,
            "createHtmlWidget": createHtmlWidget


        };
        return api;


        function createHeaderWidget(pageId) {
          var widget = new Object();
          widget._id = getRandomInt(100,999).toString();
          widget.widgetType ="HEADER";
          widget.pageId = pageId;
          widgets.push(widget);
            return widget._id;

        }


        function createHtmlWidget(pageId) {
            var widget = new Object();
            widget._id = getRandomInt(100,999).toString();
            widget.widgetType ="HTML";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget._id;

        }
        function createImageWidget(pageId) {
            var widget = new Object();
            widget._id = getRandomInt(100,999).toString();
            widget.widgetType ="IMAGE";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget._id;

        }


        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function createYoutubeWidget(pageId)
        {
            var widget = new Object();
            widget._id = getRandomInt(100,999).toString();
            widget.widgetType ="YOUTUBE";
            widget.pageId = pageId;
            widgets.push(widget);
            return widget._id;
        }



        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function findWidgetsByPageId(pageId)
        {
            var widgu = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    widgu.push(widgets[w]);
                }
            }
            return widgu;

        }

        function updateWidget(widgetId, widget)
        {

            for(var w in widgets)
            {
                if(widgets[w]._id==widgetId)
                {
                    widgets[w] = widget;
                }
            }

        }


        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                }
            }

        }

        }
    })();


