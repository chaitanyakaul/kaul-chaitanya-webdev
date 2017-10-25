/**
 * Created by chaitanyakaul on 19/03/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller('FlickrImageSearchController',FlickrImageSearchController);


    function FlickrImageSearchController($routeParams, $location, WidgetService, FlickrService)
    {
        //hold the current instance of the object in the variable vm
        var vm = this;
        //use AngularJS's routeparams class and pass the current uid to it
        function init()
        {

            //use AngularJS's routeparams class and pass the current uid to it
            vm.userId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.pageId = $routeParams['pid'];
            vm.widgetId = $routeParams['wgid'];



            //call the WidgetService from the Node.JS part to find a particular widget by it's ID
         WidgetService
             .findWidgetById(vm.widgetId)
             .then(function(result)
             {
                 vm.widget = result
             }, function (error)
             {
                 console.log(error);
             })

        }


        //call the init function
        init();
        //call the Flickr Service based modules and pass the search term to get all the related results.
        vm.searchPhotos = function (searchTerm) {
        FlickrService
            .searchPhotos(searchTerm)
            .then(function (response) {
                console.log(response);
                //store the response in a data variable
                data = response.data.replace("jsonFlickrApi(", "");
                data = data.substring(0, data.length - 1);
                data = JSON.parse(data);
                vm.photos = data.photos;
            }, function (err) {
                vm.error = err;
            });
    };

        vm.selectPhoto = function (photo) {
            //pass the api photo form and get the part
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            vm.widget.data.url = url;
            //call the updateWidget function from Node.JS based controller.
            WidgetService
                .updateWidget(vm.widgetId, vm.widget.data)
                .then(function (response) {
                    console.log("widget Id is"+vm.widgetId);
                    console.log(vm.widget);
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                }, function (err) {
                    vm.error = "Failed to update widget";
                });
        }
    }
})();







