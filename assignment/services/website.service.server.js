/**
 * Created by chaitanyakaul on 26/02/17.
 */
module.exports = function (app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [];

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
