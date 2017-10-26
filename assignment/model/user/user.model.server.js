/**
 * Created by chaitanyakaul on 16/03/17.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    var model = null;
    var UserSchema;
    var UserModel;

    var api = {
        "createUser": createUser,
        "findUserById":findUserById,
        "findUserByCredentials":findUserByCredentials,
        "deleteUser":deleteUser,
        "updateUser":updateUser,
        "findUserByFacebookId": findUserByFacebookId,
        "setModel":setModel,
        "getModel":getModel,
        "findUserByUsername": findUserByUsername
    };

    return api;

    //MongoDB call to create a new User
    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    //MongoDB call to find a user by facebook id
    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    //Set the current model using the current instance of the object.
    function setModel(_model) {
        model = _model;
        UserSchema = require('./user.schema.server.js')(_model);
        UserModel = mongoose.model('UserModel', UserSchema);
    }

    //get the model
    function getModel()
    {
        return UserModel;
    }



    function createUser(user) {
        return UserModel.create(user);
    }


    function findUserById(userId)
    {
        return UserModel.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return UserModel.find({username:username, password: password});
}


    //update the User with the new user object by first checking the user id
    function updateUser(userId, user)
    {
        return UserModel.update({_id:userId},{$set:user});

    }

    //delete the user according to the user id passed
    function deleteUser(userId)
    {
        return UserModel.findByIdAndRemove(userId, function (err,users) {
            users.remove();})
    }


};