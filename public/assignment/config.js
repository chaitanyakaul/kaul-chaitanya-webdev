/**
 * Created by chaitanyakaul on 06/02/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .config(configuration);



    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope) {
        console.log("checking if logged in")
        return $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
            } else{
                $location.url('/login');
            }
        });
    }

    function configuration($routeProvider, $locationProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';


        $routeProvider

            .when("/login", {

                templateUrl: 'views/user/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when("/", {
                templateUrl: 'views/user/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })

            .when("/register",{
                templateUrl: 'views/user/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })

            .when("default", {
                templateUrl: 'views/user/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when("/user/:uid", {
                templateUrl: 'views/user/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedIn }
            })

            .when("/profile/:uid",{
                templateUrl:"views/user/profile.view.client.html",
                controller: 'profileController',
                controllerAs: 'model'
            })


            .when("/user/:uid/website", {
                templateUrl: 'views/website/website-list.view.client.html',
                controller: 'WebsiteListController',
                controllerAs: 'model'
            })



            .when("/user/:uid/website/new",{
                templateUrl: 'views/website/website-new.view.client.html',
                controller: 'WebsiteNewController',
                controllerAs: 'model'

            })

            .when("/user/:uid/website/:wid",{
                templateUrl:"views/website/website-edit.view.client.html",
                controller: 'WebsiteEditController',
                controllerAs: 'model'
            })


            .when("/user/:uid/website/:wid/page", {
                templateUrl: 'views/page/page-list.view.client.html',
                controller: 'PageListController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: 'views/page/page-new.view.client.html',
                controller: 'PageNewController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: 'views/page/page-edit.view.client.html',
                controller: 'PageEditController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: 'views/widget/widget-list.view.client.html',
                controller: 'WidgetListController',
                controllerAs: 'model'
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: 'views/widget/widget-chooser.view.client.html',
                controller: 'WidgetNewController',
                controllerAs: 'model'
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: 'views/widget/widget-edit.view.client.html',
                controller: 'WidgetEditController',
                controllerAs: 'model'
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickrsearch",{
                templateUrl: 'views/widget/widget-flickr-search.view.client.html',
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })

            .otherwise({
                // Default
                templateUrl: 'views/user/login.view.client.html'
            });


    }
})();