(function(){
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);

    var key = "71a364e3ec0d23bf5855edfaf761c17b";
    var secret = "d77dbfcc70838e49";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http){

        var api = {
            searchPhotos : searchPhotos
        };
        return api;



        function searchPhotos(searchTerm){
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();/**
 * Created by chaitanyakaul on 19/03/17.
 */
