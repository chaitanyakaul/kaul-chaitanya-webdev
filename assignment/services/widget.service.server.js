/**
 * Created by chaitanyakaul on 26/02/17.
 */
/**
 * Created by chaitanyakaul on 26/02/17.
 */
module.exports = function (app, widgetModel) {

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
    app.post("/api/page/:pageId/widget_text", createTextWidget);
    app.put("/page/:pageId/widget", WidOrderUpdate)


    var widgets =
        [];


    function createHeaderWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = new Object();
       //widget._id = getRandomInt(100, 999).toString();
        widget.type = "HEADER";
        widget.page = pageId;
        //widgets.push(widget);

        widgetModel
            .createWidget(pageId, widget)
            .then(function (widget){
                console.log(widget);
                console.log(widget._id);
                res.json(widget._id)


            }, function (error)
            {
                console.log(error);
                res.sendStatus(404)
            })
    }


    function createHtmlWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        //widget._id = getRandomInt(100, 999).toString();
        widget.type = "HTML";
        widget.page = pageId;
        //widgets.push(widget);
        //res.send(widget._id);

        widgetModel
            .createWidget(pageId, widget)
            .then (function (widget)
            {
                res.json(widget._id)
            }, function (error)
            {
                res.sendStatus(404)
            })


    }
    function createTextWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        //widget._id = getRandomInt(100, 999).toString();
        widget.type = "TEXT";
        widget.name = "defaultname"
        widget.page = pageId;
       widget.formatted  = false;
       widget.rows = 1;
       widget.placeholder="default"
        widget.text = ""
        /*widgets.push(widget);
         res.send(widget._id);*/

        widgetModel
            .createWidget(pageId, widget)
            .then (function (widget)
            {
                res.json(widget._id)
            }, function (error)
            {
                res.sendStatus(404);
            })



    }
    function createImageWidget(req, res) {

        var pageId = req.params.pageId;

        var widget = new Object();
        //widget._id = getRandomInt(100, 999).toString();
        widget.type = "IMAGE";
        widget.page = pageId;
        console.log("image widget print")
        console.log(widget)


    /*    widgets.push(widget);
        res.send(widget._id);*/
    widgetModel
        .createWidget(pageId, widget)
        .then (function (widget)
        {
            res.json(widget._id)
        }, function (error)
        {
            res.sendStatus(404)
        })

    }


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function createYoutubeWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        //widget._id = getRandomInt(100, 999).toString();
        widget.type = "YOUTUBE";
        widget.page = pageId;
        widgetModel
            .createWidget(pageId, widget)
            .then (function (widget)
            {
                res.json(widget._id)
            }, function (error)
            {
                res.sendStatus(404)
            })
  /*      widgets.push(widget);
        res.send(widget._id);*/


    }


    function findWidgetById(req, res) {
        /*    var widgetId = req.params.widgetId;
         var widget = widgets.find(function (widget) {
         return widget._id === widgetId;
         })
         res.json(widget);*/
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(404);
            });



       /* for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                res.json(widgets[w]);
                return;
            }*/



        }



    function findWidgetsByPageId(req, res) {

        var pageId = req.params.pageId;

        console.log("server side page id pahucha");
        console.log(req.params);
        console.log("end");


      /*  var widgu = [];
        console.log(widgets)
        for (var w in widgets) {
            if (widgets[w].pageId == pageId) {
                widgu.push(widgets[w]);
            }
        }

        res.json(widgu);*/

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                console.log("hit in find all widgets")
                console.log(widgets);
                res.json(widgets);
            }, function (err) {
                res.sendStatus(404);
            });

    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
    /*    for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                console.log("hit hua and upddate bhee hua")
                //widgets[w] = widget;

                console.log(widgets[w]);
                widgets[w]=widget;
                console.log("the new data");
                console.log(widget);
                res.send(widgets[w]);


            }*/

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(404);
            });




        }




    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
      /*  for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
            }
        }*/

      widgetModel
          .deleteWidget(widgetId)
          .then(
              function (response)
              {
                  res.sendStatus(200)
              }, function (error)
              {
                  console.log(error)
                  res.sendStatus(404)
              }
          )

    }

    function WidOrderUpdate(req, res)

    {
        var pageId = req.params.pageId;
        console.log("hello bhai")

        var start = parseInt(req.query.initial);
        var end = parseInt(req.query.final);
   /*     console.log(start);
        console.log(end);
        console.log(widgets)*/
        //widgets.splice(end, 0, widgets.splice(start, 1)[0]);
        /*console.log("result")
        console.log(widgets)*/
        widgetModel
            .reOrderWidget(pageId, start, end)
            .then (function (result)
            {
                res.sendStatus(result)
            }, function (err)
            {
                res.sendStatus(404)
            })


    }

    function uploadImage(req, res) {

        var pageId = null;
        console.log("widgetBody Print kar raha hu")
        console.log(req.body);
        console.log("End of printing");
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        pageId =req.body.pageId;
        var myFile = req.file;
        var destination = myFile.destination;
        var path = myFile.path;
        var size = myFile.size;
        var mimetype = myFile.mimetype;

      /*  for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                pageId = widgets[i].pageId;


            }
        }*/

      widgetModel
          .findWidgetById(widgetId)
          .then(function (widget)
          {
              widget.width = width;
              widget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
            widgetModel
                .updateWidget(widgetId, widget)
                .then(function (updated)
                {
                    console.log("successful change")
                    res.redirect("/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                    res.sendStatus(200);
                }, function (error)
                {
                    console.log(error)
                    res.sendStatus()
                })

                  }, function (error)
          {
              console.log(error)
              res.sendStatus(404)


          })

    }


}
