/**
 * Created by chaitanyakaul on 16/03/17.
 */



module.exports = function () {

    var mongoose = require('mongoose');
    var model = null;
    var PageSchema
    var PageModel


    var api={
        "createPage": createPage,
        "findAllPagesForWebsite":findAllPagesForWebsite,
        "findPageById":findPageById,
        "updatePage":updatePage,
        "deletePage":deletePage,
        "setModel":setModel,
        "getModel":getModel

    }



    return api;


    function setModel(_model) {
        model = _model;
        PageSchema = require('./page.schema.server')(_model);
        PageModel = mongoose.model('PageModel', PageSchema);
    }
    function getModel()
    {
        return PageModel;
    }

    function createPage(websiteId, page)
    {
        return PageModel
            .create(page)
            .then(function (page){
                return model
                    .websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (result)
                    {
                        result.pages.push(page);
                        page._website = result._id;
                        result.save();
                        page.save();
                        return page;
                    }, function (error)

                    {
                        console.log(error)
                        return error
                    }), function (error)
                {
                    console.log(error);
                    return error;
                }
            })
    }


    function deletePage(pageId)
    {
        return PageModel
            .findByIdAndRemove(pageId,function (error, page){
                page.remove()
            })
    }

    function findAllPagesForWebsite(websiteId)
    {
        return PageModel.find({_website:websiteId});

    }

    function findPageById(pageId){
        return PageModel.findOne({_id:pageId});
    }

    function updatePage(pageId, page){
        return PageModel.update({_id:pageId},{$set: page});
    }





}