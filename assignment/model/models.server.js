/**
 * Created by chaitanyakaul on 17/03/17.
 */
module.exports = function() {
    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server.js")();
    var widgetModel = require("./widget/widget.model.server")();

    var model =
        {
            userModel: userModel,
            websiteModel: websiteModel,
            pageModel: pageModel,
            widgetModel: widgetModel
        };


    //the setter methods for the respective models.
    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model)

    return model;
}
