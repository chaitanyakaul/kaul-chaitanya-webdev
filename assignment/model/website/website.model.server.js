module.exports = function () {


    //the API object for a website has the RESTful parameters
    var api = {
        "createWebsiteForUser": createWebsiteForUser,
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById": findWebsiteById,
        "updateWebsite": updateWebsite,
        "deleteWebsite": deleteWebsite,
        "setModel": setModel,
        "getModel":getModel

    };


    var mongoose = require('mongoose');

    var WebsiteSchema;
    var model = null;
    var WebsiteModel;
    return api;



    //this method sets the current instance of the model
    function setModel(_model) {
        model = _model;
        WebsiteSchema = require('./website.schema.server.js')(_model);
        WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);
    }

    //this method gets the model which is currently instantiated
    function getModel()
    {
        return WebsiteModel;
    }

function createWebsiteForUser(userId, website)
{
    //return the Website Model by synchronising the process of creating a website and then associating
    //the website to a particular user.
return WebsiteModel
    .create(website)
    .then(
        function(returnedWebsite)
        {
            console.log(returnedWebsite)
            return model.userModel
                .findUserById(userId)
                .then(function (user)
                {
                    returnedWebsite._user = user.id;
                    user.websites.push(returnedWebsite);
                    returnedWebsite._user = user._id;
                    user.save();
                    returnedWebsite.save();
                    return website;
                }, function(error)
                {
                    return error
                })

        }, function(err){
            console.log(err);
        }


    )
}

function findAllWebsitesForUser(userId)
{
    return WebsiteModel.find({"_user": userId});
}

function findWebsiteById(websiteId)
{
return WebsiteModel.findOne({_id:websiteId});
}

function updateWebsite(websiteId, website)
{
return WebsiteModel.update({_id:websiteId},{$set:website})
}

function deleteWebsite(websiteId)
{
    return WebsiteModel.findByIdAndRemove(websiteId, function (err,website) {
        website.remove();
    });
}

}