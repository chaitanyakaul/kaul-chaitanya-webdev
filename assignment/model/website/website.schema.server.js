/**
 * Created by chaitanyakaul on 16/03/17.
 */
module.exports = function (model) {
    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        name: String,
        description: String,
        pages:  [{type: mongoose.Schema.Types.ObjectId, ref:'PageModel'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "websites"});

    WebsiteSchema.post('remove', function(next) {
        var pageModel = model.pageModel.getModel();
        var widgetModel = model.widgetModel.getModel();
        var userModel = model.userModel.getModel();
        var website = this;
        console.log(website._id);
        userModel.findById(website._user)
            .then(function (user) {
                var index = user.websites.indexOf(website._id);
                if (index > -1) {
                    user.websites.splice(index, 1);
                    user.save();
                }
            });
        widgetModel.remove({_page: {$in: website.pages}}).exec();
        pageModel.remove({_id: {$in: website.pages}}).exec();
    });
    return WebsiteSchema;
};



