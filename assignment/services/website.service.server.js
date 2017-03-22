/**
 * Created by chaitanyakaul on 26/02/17.
 */
module.exports = function (app, websiteModel) {
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

        /*var websiteId = req.params.websiteId;
        var website = websites.find(function (websiteObject) {
            return websiteObject._id == websiteId;
        });
        res.json(website);*/

        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (answer) {
                res.json(answer)
            }, function (error){
                res.sendStatus(404);
                console.log(error);
            })
    }

    function deleteWebsite(req, res) {

        var websiteId = req.params.websiteId;

       /* for (var w in websites) {
            if (websites[w]._id === websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }*/
       websiteModel
           .deleteWebsite(websiteId)
           .then (function (response){
               res.sendStatus(200)
           }, function (error)
           {
               console.log(error)
               res.sendStatus(404)
           })


    }


    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var updater = req.body;
        websiteModel
            .updateWebsite(websiteId, updater)
            .then(function(response)
            {
                res.sendStatus(200);
            }, function(err)
            {
                res.sendStatus(400);
            })


       /* console.log(updater);
        for (var w in websites) {
            if (websites[w]._id == websiteId) {
                websites[w].name = updater.name;
                websites[w].description = updater.description;
                res.sendStatus(200);
            }
        }*/


    }

    function createWebsite(req, res) {

        var userId = req.params.userId;
        var website = req.body;
        var new_website = {
            developerId: userId,
            name: website.name,
            created: new Date(),
            description: website.description
        };

        websiteModel
            .createWebsiteForUser(userId,new_website)
            .then(function(response){
                console.log("lol");
                res.sendStatus(200);
            }, function (err)
                {
                    res.sendStatus(400);
                }
            )
        /*websites.push(new_website);
        res.json(new_website);*/

    }

    function findWebsitesByUser(req, res) {

        var user_id = req.params.userId;

        websiteModel
            .findAllWebsitesForUser(user_id)
            .then (function (response)
            {
                res.json(response);
            }, function (err)
            {
                res.sendStatus(404)
            })




        /*  var sites = [];
        for (var w in websites) {
            if (websites[w].developerId === user_id) {
                sites.push(websites[w]);
            }
        }

        res.json(sites);*/


    }
};
