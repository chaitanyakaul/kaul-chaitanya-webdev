/**
 * Created by chaitanyakaul on 26/02/17.
 */
module.exports = function (app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem", created: new Date()},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date()},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem", created: new Date()},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem", created: new Date()}
    ];

    function findWebsiteById(req, res) {
        /*for (var w in websites) {
         if (websites[w]._id === wid) {
         return angular.copy(websites[w]);
         }
         }
         return null;*/

        var websiteId = req.params.websiteId;
        var website = websites.find(function (websiteObject) {
            return websiteObject._id == websiteId;
        });
        res.json(website);
    }

    function deleteWebsite(req, res) {

        var websiteId = req.params.websiteId;

        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
    }


    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var updater = req.body;
        console.log(updater);
        for (var w in websites) {
            if (websites[w]._id == websiteId) {
                websites[w].name = updater.name;
                websites[w].description = updater.description;
                res.sendStatus(200);
            }
        }


    }

    function createWebsite(req, res) {

        var userId = req.params.userId;
        var website = req.body;
        var new_website = {
            _id: (new Date()).getTime().toString(),
            developerId: userId,
            name: website.name,
            created: new Date(),
            description: website.description
        };
        websites.push(new_website);
        res.json(new_website);

    }

    function findWebsitesByUser(req, res) {

        var user_id = req.params.userId;
        var sites = [];
        for (var w in websites) {
            if (websites[w].developerId === user_id) {
                sites.push(websites[w]);
            }
        }

        res.json(sites);


    }
}
