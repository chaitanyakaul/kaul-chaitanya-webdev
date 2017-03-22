/**
 * Created by chaitanyakaul on 26/02/17.
 */
module.exports = function (app, pageModel) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [];

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page_info = req.body
        //console.log(websiteId);

        var page = {
            name: page_info.name,
            websiteId: websiteId,
            description: page_info.description
        };

        pageModel
            .createPage(websiteId, page)
            .then(function (page)
            {
                res.json(page);
                res.sendStatus(200);

            }, function (error)
            {
                console.log(error)
                res.sendStatus(404);
            })
   /*     pages.push(page);*/

    }


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;

    }

    function findPageByWebsiteId(req, res) {
        // console.log("hit hua")
        var websiteId = req.params.websiteId;
        //console.log(websiteId);

/*        var pagesg = [];

        for (var p in pages) {

            if (pages[p].websiteId === websiteId) {

                pagesg.push(pages[p]);
            }
        }
        // console.log(pagesg);
        res.json(pagesg);*/
pageModel
    .findAllPagesForWebsite(websiteId)
    .then(function (page){

        res.json(page)
    }, function (err)
    {
        console.log(err);
        res.sendStatus(404)
    })




    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;


        pageModel
            .findPageById(pageId)
            .then(function (page){
                res.json(page)
                res.sendStatus(200);
            }, function (err)
            {
                res.sendStatus(404)
            })

    }


    function updatePage(req, res) {
        var pageId = req.params.pageId
        var page = req.body;


        pageModel
            .updatePage(pageId, page)
            .then(function (response)
            {
                console.log(response.state)
                res.sendStatus(200)
            }, function (error)
            {
                res.sendStatus(404)
            })

      /*  for (var p in pages) {
            if (pages[p]._id == pageId) {
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.sendStatus(200);

            }
        }*/

    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
      /*  for (var p in pages) {
            if (pages[p]._id === pageId) {
                pages.splice(p, 1);
                res.sendStatus(200);

            }
        }*/

      pageModel
          .deletePage(pageId)
          .then(function(response)
          {
              res.sendStatus(200)
          }, function (error)
          {
              console.log(error)
              res.sendStatus(404);


          })
    }


}