/**
 * Created by chaitanyakaul on 16/03/17.
 */
module.exports = function (model) {
    var mongoose = require('mongoose');

    //the widget schema for the MongoDB system call
    var WidgetSchema = mongoose.Schema({
            _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
            type: {type:String, enum:['HEADER','IMAGE','YOUTUBE','HTML','TEXT']},
            name: String,
            text: String,
            placeholder: String,
            description: String,
            url: String,
            width: String,
            height: String,
            rows: String,
            size: String,
            class: String,
            icon: String,
            deletable: Boolean,
            formatted: Boolean,
            order: Number,
            dateCreated: {type: Date, default: Date.now()}

        },
        {collection: 'widgets'});


    //recursive implementation of delete function which is propogated to the server
    WidgetSchema.post('remove', function(next) {
        console.log("hit in remove section of widget");
        var pageModel = model.pageModel.getModel();
        var widget = this;
        pageModel.findById(widget._page)
            .then(function (page) {
                var index = page.widgets.indexOf(widget._id);
                if (index > -1) {
                    page.widgets.splice(index, 1);
                    page.save();
                }
            });
    });



    return WidgetSchema;
};