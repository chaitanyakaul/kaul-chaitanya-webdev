/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, $location, WidgetService) {
        //hold the current instance of the object in the variable vm
        var vm = this;
        //use AngularJS's routeparams class and pass the current uid to it
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.widgetUpdate = widgetUpdate;
        vm.deleteWidget = deleteWidget;
        vm.gotoProfile = gotoProfile;
        vm.goToWidgetList = goToWidgetList;
        vm.gotoFlickr = gotoFlickr;

        //this is iffy related call to the annonymous function
        function init() {
            console.log("hit in init")
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (widget) {
                    console.log("another hit")
                    console.log(widget);

                    vm.widget = angular.copy(widget.data);

                }, function (error)
                {
                    console.log(error)
                });

        }

        init();


        function widgetUpdate(widget) {
            //call the WidgetUpdate service and fetch all the widgets for a particular user using his id

          WidgetService.updateWidget(vm.widgetId, widget)
                .then(function (widgets) {

                        vm.widgeter = widgets.data
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                    }
                )




        }

        function deleteWidget() {

            //call the delete widget service from the Node.JS backed system and delete the particular widget
            //using the id
            console.log("printing widgetID for deletetion")
            console.log(vm.widgetId)
          var promise =   WidgetService.deleteWidget(vm.widgetId)
                promise.then(function (widgets) {
                    console.log("printing widgetID for deletetion")
                    console.log(vm.widgetId)

                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                    }
                )


        }

        function gotoFlickr()

        {
            //call the Flikr part of the application and pass all the object related parameters
            console.log("pahucha");
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId+"/flickrsearch")
        }

        function gotoProfile() {
            $location.url("/profile/" + vm.userId);
        }


        function goToWidgetList() {

            //goto the widgetList and fetch the whole list
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }



        function getEditorTemplateUrl(type) {
            console.log("type pucho");
            console.log(type);

            return 'views/widget/widget-' + type + '-editor.view.client.html';
        }
    }
})();