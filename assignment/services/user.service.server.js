module.exports = function (app, userModel) {

    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);

    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);

    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.delete("/api/user/:userId", deleteUser);


    app.post('/api/logout', logout);
    app.post ('/api/register', register);

    app.get ('/api/loggedin', loggedin);

    var bcrypt = require("bcrypt-nodejs");

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL:process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id','displayName', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
    };

    var passport = require('passport');

    var FacebookStrategy = require('passport-facebook').Strategy;
    var LocalStrategy = require('passport-local').Strategy;


    app.post("/api/login", passport.authenticate('local'), login);



    app.get('/auth/facebook',passport.authenticate('facebook',{ scope : 'email'}));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


    passport.use(new LocalStrategy(localStrategy));
    // app.post  ('/api/login', passport.authenticate('wam'), login);
    app.get('/auth/facebook',passport.authenticate('facebook',{ scope : 'email'}));
    app.get('/auth/facebook/callback',passport.authenticate('facebook', {
        failureRedirect: '/assignment/#/login'
    }), function(req, res){



        var url = '/assignment/#!/user/' + req.user._id.toString()+'/website';
        console.log(url)

        res.redirect(url);
    });



    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(function(user) {
                    if(user) {
                        // If User exists
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            firstName:  names[0],
                            lastName:  names[1],
                            facebook: {
                                id:    profile.id,
                                token: token
                            },
                            email: profile.emails[0].value
                        };
                        userModel
                            .createUser(newFacebookUser)
                            .then(function (user) {
                                return done(null, user);
                            });
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                });
    }

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                console.log(user)
                                res.status(400).send(err);
                            } else {

                                console.log("in the other part")
                                console.log(user);
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }


    function serializeUser(user, done) {
        done(null, user);
    }
    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (user) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400).send(error);
            })

    }





    function login(req, res) {
        var user = req.user;
        console.log("00")
        console.log(user);
        console.log("ll")
        res.json(user);
    }
    function logout(req, res) {
        console.log("logging out")
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


//localStrategy implementation
    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        console.log("hit hit hit");
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }






    /*     for(var u in users) {
             var user = users[u];
             if( user._id === userId ) {
                 users.splice(u,1);
                 res.sendStatus(200);
                 return;
             }
         }
         res.sendStatus(404);*/


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