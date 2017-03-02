/**
 * Created by chaitanyakaul on 26/02/17.
 */
/**
 * Created by chaitanyakaul on 26/02/17.
 */
module.exports = function (app) {

    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {

            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {

            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'image_upload' + Date.now() + '.' + extension)
        }
    });

    var upload = multer({storage: storage});

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget_header", createHeaderWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget_image", createImageWidget);
    app.post("/api/page/:pageId/widget_html", createHtmlWidget);
    app.post("/api/page/:pageId/widget_youtube", createYoutubeWidget);


    var widgets =
        [];


    function createHeaderWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        widget._id = getRandomInt(100, 999).toString();
        widget.widgetType = "HEADER";
        widget.pageId = pageId;
        widget.tag = "new"
        widgets.push(widget);
        //return widget._id;
        res.send(widget._id);


    }


    function createHtmlWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        widget._id = getRandomInt(100, 999).toString();
        widget.widgetType = "HTML";
        widget.pageId = pageId;
        widget.tag = "new"
        widgets.push(widget);
        res.send(widget._id);


    }

    function createImageWidget(req, res) {

        var pageId = req.params.pageId;
        var widget = new Object();
        widget._id = getRandomInt(100, 999).toString();
        widget.widgetType = "IMAGE";
        widget.pageId = pageId;
        widget.tag = "new"
        widgets.push(widget);
        res.send(widget._id);

    }


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function createYoutubeWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        widget._id = getRandomInt(100, 999).toString();
        widget.widgetType = "YOUTUBE";
        widget.pageId = pageId;
        widget.tag = "new"
        widgets.push(widget);
        res.send(widget._id);


    }


    function findWidgetById(req, res) {
        /*    var widgetId = req.params.widgetId;
         var widget = widgets.find(function (widget) {
         return widget._id === widgetId;
         })
         res.json(widget);*/
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                res.json(widgets[w]);
                return;
            }
        }

    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;

        var widgu = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                widgu.push(widgets[w]);
            }
        }
        res.json(widgu);

    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body

        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets[w] = widget;
                res.send(widgets[w]);

            }
        }

    }


    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
            }
        }

    }

    function uploadImage(req, res) {

        var pageId = null;
        console.log(req.body);
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;
        var destination = myFile.destination;
        var path = myFile.path;
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                pageId = widgets[i].pageId;


            }
        }

        res.redirect("/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");

    }


}
