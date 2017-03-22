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

    function WidgetService($http) {


        var api = {
            "createHeaderWidget": createHeaderWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "findWidgetById": findWidgetById,
            "createImageWidget": createImageWidget,
            "createYoutubeWidget": createYoutubeWidget,
            "createHtmlWidget": createHtmlWidget,
            "WidOrderUpdate": WidOrderUpdate,
            "createTextWidget":createTextWidget



        };
        return api;


        function createHeaderWidget(pageId) {
            /*var widget = new Object();
             widget._id = getRandomInt(100,999).toString();
             widget.widgetType ="HEADER";
             widget.pageId = pageId;
             widgets.push(widget);
             return widget._id;*/

            //return $http.post("/api/widget/"+pageId+"/page", page);
            return $http.post("/api/page/" + pageId + "/widget_header");

        }


        function createHtmlWidget(pageId) {
            /*      var widget = new Object();
             widget._id = getRandomInt(100,999).toString();
             widget.widgetType ="HTML";
             widget.pageId = pageId;
             widgets.push(widget);
             return widget._id;*/
            return $http.post("/api/page/" + pageId + "/widget_html");

        }


        function createTextWidget(pageId) {
            /*      var widget = new Object();
             widget._id = getRandomInt(100,999).toString();
             widget.widgetType ="HTML";
             widget.pageId = pageId;
             widgets.push(widget);
             return widget._id;*/
            return $http.post("/api/page/" + pageId + "/widget_text");

        }

        function createImageWidget(pageId) {
            /*            var widget = new Object();
             widget._id = getRandomInt(100,999).toString();
             widget.widgetType ="IMAGE";
             widget.pageId = pageId;
             widgets.push(widget);
             return widget._id;*/
            return $http.post("/api/page/" + pageId + "/widget_image");
        }


        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function createYoutubeWidget(pageId) {
            /*var widget = new Object();
             widget._id = getRandomInt(100,999).toString();
             widget.widgetType ="YOUTUBE";
             widget.pageId = pageId;
             widgets.push(widget);
             return widget._id;*/
            return $http.post("/api/page/" + pageId + "/widget_youtube");
        }


        function findWidgetById(widgetId) {
            /*  for(var w in widgets) {
             if(widgets[w]._id === widgetId) {
             return angular.copy(widgets[w]);
             }
             }
             return null;*/
            return $http.get("/api/widget/" + widgetId);
        }

        function findWidgetsByPageId(pageId) {
            /* var widgu = [];
             for(var w in widgets) {
             if(widgets[w].pageId === pageId) {
             widgu.push(widgets[w]);
             }
             }
             return widgu;*/
            return $http.get("/api/page/" + pageId + "/widget");

        }

        function updateWidget(widgetId, widget) {

            /*  for(var w in widgets)
             {
             if(widgets[w]._id==widgetId)
             {
             widgets[w] = widget;
             }
             }*/
            return $http.put("/api/widget/" + widgetId, widget);


        }


        function deleteWidget(widgetId) {
            /*   for(var w in widgets) {
             if(widgets[w]._id === widgetId) {
             widgets.splice(w, 1);
             }
             }*/
            return $http.delete("/api/widget/" + widgetId);

        }

        function WidOrderUpdate(pageId, startingIndex, endingIndex)
        {

            return $http.put("/page/" + pageId + "/widget?initial=" + startingIndex + "&final=" + endingIndex)
        }


    }
})();


