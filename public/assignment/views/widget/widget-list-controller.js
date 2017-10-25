/**
 * Created by chaitanyakaul on 07/02/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $location, $routeParams, WidgetService) {
        //hold the current instance of the object in the variable vm
        var vm = this;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        //get the userid, website id and pageid using  routeParams.
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        function init() {
            //find all the widgets using the current page id
             WidgetService.findWidgetsByPageId(vm.pageId)
                .then(function (widgets) {

                        vm.widgets = widgets.data;
                        console.log(widgets)
                        //print all the widgets to the screen
                        console.log(vm.widgets);
                    }
                )
        }

        init();


        vm.gotoCreate = gotoCreate;

        vm.goBackToProfile = goBackToProfile;
        vm.gotoProfile = gotoProfile;
        //get the particular widget type's url
        function getWidgetTemplateUrl(widgetType) {
            console.log(widgetType);
            console.log("hit")
            var url = 'views/widget/templates/widget-' + widgetType + '.view.client.html';
            return url;
        }


        //check if the user passed works or not.
        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        //this method is for youtube controller specifically.
        //this fetches the youtube model out of the embed url
        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function gotoCreate() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");
        }

        function goBackToProfile() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function gotoProfile() {
            $location.url("/profile/" + vm.userId);
        }
    }
})();