/**
 * Created by chaitanyakaul on 16/03/17.
 */
module.exports = function (model) {
    var mongoose = require('mongoose');
    var PageSchema = mongoose.Schema({
            _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
            name: String,
            title: String,
            description: String,
            widgets: [{type: mongoose.Schema.Types.ObjectId, ref:'WidgetModel'}],
            dateCreated: {type:Date, default: Date.now()}

        },
        {collection: 'pages'});

    PageSchema.post('remove', function (next) {
        var page = this;
        var widgetModel = model.widgetModel.getModel();
        var websiteModel = model.websiteModel.getModel();
        widgetModel.remove({_page: page._id}).exec();
        websiteModel.findById(page._website)
            .then(function (website) {
                var index = website.pages.indexOf(page._id);
                if (index > -1) {
                    website.pages.splice(index, 1);
                    website.save();
                }
            });

    });



    return PageSchema;
};