/**
 * Created by chaitanyakaul on 19/03/17.
 */
/**
 * Created by chaitanyakaul on 16/03/17.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var model = null;
    var WidgetSchema;
    var WidgetModel;
    var api = {
        "createWidget": createWidget,
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById": findWidgetById,
        "updateWidget": updateWidget,
        "deleteWidget": deleteWidget,
        "reOrderWidget": reOrderWidget,
        "setModel": setModel,
        "getModel": getModel

    }
    return api;

    function setModel(_model) {
        model = _model;
        WidgetSchema = require('./widget.schema.server')(_model);
        WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
    }

    function getModel() {
        return WidgetModel;
    }


    function deleteWidget(widgetId) {
        return WidgetModel.findByIdAndRemove(widgetId, function (err, widget) {
            console.log("in delete");
            console.log(widget);
            var pageId = widget._page;
            var order = widget.order;
            WidgetModel.find({_page:pageId},function (err,widgets) {
                    widgets.forEach(function (widget) {
                        if(widget.order > order) {
                            widget.order = widget.order - 1;
                            widget.save();
                        }
                    });
                });
            widget.remove();
        });
    }


    function createWidget(pageId, widget) {
        return model.pageModel.findPageById(pageId)
            .then(function (page) {
                console.log("hit")
                console.log(page);
                widget.order = page.widgets.length;
                console.log("another hit")
                console.log(widget);

                return WidgetModel
                    .create(widget)
                    .then(function (widget) {
                        console.log(widget);
                        return model
                            .pageModel
                            .findPageById(pageId)
                            .then(function (result) {
                                widget._page = result._id;
                                result.widgets.push(widget._id)
                                widget.save()
                                result.save()
                                return widget;

                            }, function (err) {
                                return err
                            })
                    }, function (err) {
                        return err
                    })
            });

    }


    function retWidg(countOfWids, wids, aggregate) {
        if (countOfWids == 0) {
            console.log("count is 0");
            return aggregate;
        }
        return WidgetModel.findById(wids.shift()).select('-__v')
            .then(function (widget) {
                ;
                aggregate.push(widget);
                return retWidg(--countOfWids, wids, aggregate);
            }, function (err) {
                return err;
            });
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({"_page": pageId});
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId).select('-__v');
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel.update({_id: widgetId}, {$set: widget});
    }


    function reOrderWidget(pageId, beg, ending) {
        // return model
        //     .pageModel
        //     .findPageById(pageId)
        //     .then(function (response) {
        //         response.widgets.splice(end, 0, response.widgets.splice(start, 1)[0]);
        //         response.save();
        //         return 200;
        //     }, function (error) {
        //         return error;
        //     })

        return WidgetModel
            .find({_page: pageId}, function (error, widgets) {
                widgets.forEach(function (returnedResult) {
                    if (beg < ending) {
                        if (returnedResult.order == beg) {
                            returnedResult.order = ending;
                            returnedResult.save();
                        }
                        else if (returnedResult.order > beg && returnedResult.order <= ending) {
                            returnedResult.order = returnedResult.order - 1;
                            returnedResult.save();
                        }
                    } else {
                        if (returnedResult.order == beg) {
                            returnedResult.order = ending;
                            returnedResult.save();
                        }

                        else if (returnedResult.order < beg && returnedResult.order >= ending) {
                            returnedResult.order = returnedResult.order + 1;
                            returnedResult.save();
                        }
                    }
                });
            });

    }


}