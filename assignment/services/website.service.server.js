/**
 * Created by chaitanyakaul on 26/02/17.
 */
module.exports = function (app, websiteModel) {

    //all the RESTful API method calls for managing a particular website
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    //global array to hold all the websites for a particular user.
    var websites = [];
    function findWebsiteById(req, res) {


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
        //call the website model and delete the particular website
       websiteModel
           .deleteWebsite(websiteId)
           .then (function (response){
               //send a HTTP 200 response code saying the request is a success
               res.sendStatus(200)
           }, function (error)
           {
               //report any issue back to the console
               console.log(error)
               res.sendStatus(404)
           })


    }


    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var updater = req.body;
        //update a particular website using it's website ID and the updated website
        websiteModel
            .updateWebsite(websiteId, updater)
            .then(function(response)
            {
                res.sendStatus(200);
            }, function(err)
            {
                res.sendStatus(400);
            })
    }

    function createWebsite(req, res) {

        //call the createWebsite method at MongoDB and pass a new website and the user
        var userId = req.params.userId;
        var website = req.body;
        var new_website = {
            developerId: userId,
            name: website.name,
            created: new Date(),
            description: website.description
        };

        //MongoDB based method call
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
    }

    //find website for a specific user by decapusulating the req
    function findWebsitesByUser(req, res) {

        //the req object also contains the userid
        var user_id = req.params.userId;

        //call the mongoDB based interface.
        websiteModel
            .findAllWebsitesForUser(user_id)
            .then (function (response)
            {
                res.json(response);
            }, function (err)
            {
                res.sendStatus(404)
            })


    }
};
