/**
 * Created by chaitanyakaul on 16/03/17.
 */
module.exports = function (model) {
    var mongoose = require('mongoose');

    //the MongoDB schema for a user is instantiated below
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email:String,
            facebook: {id:String, token: String},
        phone: String,
            websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
            dateCreated: {type:Date, default: Date.now()}

        },

        {collection: 'users'});


    //this calls the recursion which passes down
    UserSchema.post('remove', function(next) {
        var websiteModel =model.websiteModel.getModel();
        var pageModel = model.pageModel.getModel();
        var widgetModel = model.widgetModel.getModel();
        var users = this;

        //find a particular page by passing the model
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