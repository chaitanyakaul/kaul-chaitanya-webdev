module.exports = function (app, userModel) {
    //this serves as the API related calls to different methods
    //according to : the call directed to specific methods
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

    //store facebook related user configs so as to implement their core APi
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

    //call passportJS core methods to serialize and deserialize the user
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
        //find the specific user by his profile ID using the userModel at the monGoDB schema
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
                        //call the createUser method using the MongoDB model
                        userModel
                            .createUser(newFacebookUser)
                            .then(function (user) {
                                return done(null, user);
                            });
                    }
                },
                function(err) {
                //report any error to the console end.
                    if (err) { return done(err); }
                });
    }

    function register (req, res) {
        var user = req.body;
        //encrypt the password with bcrypt and pass it to the user model
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
        //call seriailizeuser method.
        done(null, user);
    }
    function deserializeUser(user, done) {
        //call deserializeUser to decrypt the user and the password
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
                    //decrypt the user and compare the checksum of the password with the entered password
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


    }
}