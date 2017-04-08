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
        "getModel":getModel

    };

    return api;


    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }


    function setModel(_model) {
        model = _model;
        UserSchema = require('./user.schema.server.js')(_model);
        UserModel = mongoose.model('UserModel', UserSchema);
    }
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


    function updateUser(userId, user)

    {

        return UserModel.update({_id:userId},{$set:user});

    }

    function deleteUser(userId)
    {
        return UserModel.findByIdAndRemove(userId, function (err,users) {
            users.remove();})
    }


};