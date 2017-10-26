module.exports = function (app) {
    //user model
    var model = require('./model/models.server')();
    require('./services/user.service.server')(app, model.userModel);
    require("./services/website.service.server.js")(app, model.websiteModel);
    require("./services/page.service.server.js")(app, model.pageModel);
    require("./services/widget.service.server.js")(app, model.widgetModel)
    var abc = model.widgetModel;

};