module.exports = function (app, userModel) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.delete("/api/user/:userId", deleteUser);


    var users = [];

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function(user){
                res.sendStatus(200);
            }, function(error){
                res.sendStatus(400).send(error);
            })


   /*     for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                users.splice(u,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);*/
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(function(user) {
                res.sendStatus(200);

            }, function (error) {
                console.log(error);
                res.sendStatus(400).send(error);


            });

     /*   console.log(newUser);
        for (var u in users) {
            if (users[u]._id == userId) {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                users[u].email = newUser.email;
                users[u].password = newUser.password;
                res.json(users[u]);
                return;
            }
        }*/
    }

    function createUser(req, res) {
        var newUser = req.body;
        //newUser._id = getRandomInt(100, 999).toString();


        userModel
            .createUser(newUser)
            .then(function(user) {
            console.log(user);
                res.json(user);
            }, function (error) {
                console.log(error);
                res.sendStatus(400).send(error);


            });
        //user._id = getRandomInt(100, 999).toString();
/*
        users.push(user);
        res.json(user);*/

    }


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }


    function findUserById(req, res) {
        var userId = req.params.userId;


        userModel
            .findUserById(userId)
            .then(function(user)
            {
                res.json(user)
            },function(err)
            {
                res.sendStatus(400).send(err);
            });

/*
        var user = users.find(function (u) {
            return u._id == userId;
        });
        res.json(user);*/
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {

        var username = req.query.username;
        userModel
            .findUserbyUsername(username)
            .then(function (users) {
                res.json(users[0]);

            },function (err) {
                res.sendStatus(400);
            });

       /* var user = users.find(function (u) {
            return u.username == req.query.username;
        });
        console.log(user);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }*/
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];


        userModel
            .findUserByCredentials(username, password)
            .then(function(user)
            {
                if(user.length!=0)
                {
                    res.json(user)
                }
                else
                {
                    res.sendStatus(400)
                }


            },function(err){
                console.log(err);
                res.sendStatus(400).send(err)
            });

      /*  var user = null;
        user = users.find(function (u) {
            return u.username == username && u.password == password;
        });
        if (user != null) {
            res.json(user);
        }
        else {
            res.json(null);

        }*/
    }
}