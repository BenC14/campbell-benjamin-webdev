var app = require('../../express');
var userProjectModel = require('../models/user/user.model.server');
var bcrypt = require("bcrypt-nodejs");
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
var passport         = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
    // profileFields: ['id','emails', 'first_name', 'last_name', 'displayName']
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

console.log('in user service')
app.get   ('/api/project/user', findUserByCredentials);
app.get   ('/api/project/user/all', isAdmin, findAllUsers);
app.get   ('/api/project/user/:userId', findUserById);
app.post  ('/api/project/user', createUser);
app.put   ('/api/project/user/:userId', updateUser);
app.delete('/api/project/user/:userId', deleteUser);

app.post  ('/api/project/login', passport.authenticate('local'), login);
app.get   ('/api/project/checkAdmin', checkAdmin);
app.get   ('/api/project/checkLoggedIn', checkLoggedIn);
app.post  ('/api/project/logout', logout);
app.post  ('/api/project/register', register);


app.get ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#!/profile',
        failureRedirect: '/project/#!/login'
    }));

function googleStrategy(token, refreshToken, profile, done) {
    userProjectModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userProjectModel.createUser(newGoogleUser);
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
    userProjectModel
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
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkAdmin(req, res) {
    console.log(req.user);
    console.log(req.isAuthenticated());
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}


function localStrategy(username, password, done) {
    console.log(username);
    console.log(password);
    userProjectModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user.password && bcrypt.compareSync(password, user.password)) {
                console.log('matched');
                done(null, user);
            } else {
                done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}

function login(req, res) {
    console.log('in login');
    console.log(req.user);
    res.json(req.user);
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    userProjectModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;

    userProjectModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        });

}

function createUser(req, res) {
    var user = req.body;
    userProjectModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    if (req.query['password'] != undefined) {
        var password = req.query['password'];
        userProjectModel
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
        userProjectModel
            .findUserByUsername(username)
            .then(function (response) {
                if (response != null) {
                    if (response.availble) {
                        return res.json(response);
                    } else {
                        return res.json(response);
                    }
                } else {
                    res.sendStatus(404);
                }

            }, function (err) {
                res.sendStatus(404);
            });
    }
}

function findUserById(req, res) {
    var userId = req.params['userId'];

    userProjectModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });

}

function findAllUsers(req, res) {

    userProjectModel
        .findAllUsers()
        .then(function(users) {
            res.json(users);
        })

}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userProjectModel
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

