var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var bcrypt = require("bcrypt-nodejs");
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
var passport         = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id','emails', 'first_name', 'last_name', 'displayName']
};
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get   ('/api/assignment/user', findUserByCredentials);
app.get   ('/api/assignment/user/:userId', findUserById);
app.post  ('/api/assignment/user', createUser);
app.put   ('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', deleteUser);

app.post  ('/api/assignment/login', passport.authenticate('local'), login);
app.get   ('/api/assignment/checkLoggedIn', checkLoggedIn);
app.post  ('/api/assignment/logout', logout);
app.post  ('/api/assignment/register', register);


app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));

function facebookStrategy(token, refreshToken, profile, done) {
    console.log('in strategy');
    console.log(profile);
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newFacebookUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}


function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUser(userObj)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function checkLoggedIn(req, res) {
    console.log(req.user);
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}


function localStrategy(username, password, done) {
    console.log('in local strat');
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            console.log('ran');
            console.log(user);
            if(user.password && bcrypt.compareSync(password, user.password)) {
                console.log('in found');
                done(null, user);
            } else {
                console.log('in else');
                done(null, false);
            }
        // }, function (error) {
        //     console.log('in error');
        //     done(error, false);
        });
}

function login(req, res) {
    res.json(req.user);
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        });

}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    console.log(username);
    console.log(req.query['password']);
    if (req.query['password'] != undefined) {
        var password = req.query['password'];
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user != null) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    } else {
        userModel
            .findUserByUsername(username)
            .then(function (response) {
                console.log('response');
                console.log(response);
                if (response != null) {
                    if (response.availble) {
                        console.log('it was available');
                        return res.json(response);
                    } else {
                        return res.json(response);
                    }
                } else {
                    res.sendStatus(404);
                }

            // }, function (err) {
            //     res.sendStatus(404);
            });
    }
}

function findUserById(req, res) {
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });

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

