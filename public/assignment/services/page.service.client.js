/**
 * Created by chaitanyakaul on 06/02/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
       var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
            { "_id": "412", "name": "Post 4", "websiteId": "567", "description": "Lor" }

        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = getRandomInt(100,999).toString();
            pages.push(page);

        }


        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        function findPageByWebsiteId(websiteId)
        {

            var pagesg = [];

            for(var p in pages) {

                if(pages[p].websiteId === websiteId) {

                    pagesg.push(pages[p]);
                }
            }
            return pagesg;


        }
        function findPageById(pageId)
        {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }


        function updatePage(pageId, page)
        {
            for(var p in pages)
            {
                if(pages[p]._id==pageId)
                {
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                }
            }

        }

        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages.splice(p, 1);
                }
            }
        }


        }
    })();