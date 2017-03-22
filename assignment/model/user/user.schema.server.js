/**
 * Created by chaitanyakaul on 16/03/17.
 */
module.exports = function (model) {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email:String,
        phone: String,
            websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
            dateCreated: {type:Date, default: Date.now()}

        },
        {collection: 'users'});


    UserSchema.post('remove', function(next) {
        var websiteModel =model.websiteModel.getModel();
        var pageModel = model.pageModel.getModel();
        var widgetModel = model.widgetModel.getModel();
        var users = this;

        pageModel.find({_website: {$in: users.websites}}, '_id', function (err, pages) {
            if(err == null) {
                widgetModel.remove({_page: {$in: pages}}).exec();
                pageModel.remove({_id: {$in: pages}}).exec();
                websiteModel.remove({_id: {$in: users.websites}}).exec();
            }
        });

    })


    return UserSchema;
};