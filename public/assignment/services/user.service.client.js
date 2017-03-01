/**
 * Created by chaitanyakaul on 06/02/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http) {


        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "findUserByUsername": findUserByUsername,
            "deleteUser": deleteUser,
            "updateUser": updateUser

        };
        return api;

        function findUserById(uid) {
            /*for(var u in users) {
             var user = users[u];
             if( user._id === uid ) {
             return user;
             }
             }
             return null;*/
            return $http.get("/api/user/" + uid);
        }

        function findUserByCredentials(username, password) {
            /* for(var u in users) {
             var user = users[u];
             if( user.username === username &&
             user.password === password) {
             return user;
             }
             }
             return null;*/
            return $http.get("/api/user?username=" + username + "&password=" + password);

        }


        function createUser(user) {
            /*  user._id=getRandomInt(100,999).toString();
             users.push(user);
             return user._id;*/
            return $http.post("/api/user", user);
        }


        /*function getRandomInt(min, max) {
         min = Math.ceil(min);
         max = Math.floor(max);
         return Math.floor(Math.random() * (max - min)) + min;
         }*/

        function findUserByUsername(username) {
            /*for(var u in users)
             {
             var user = users[u];
             if(user.username==username)
             {
             return user;
             }
             }*/

            return $http.get("/api/user?username=" + username);
        }


        function updateUser(userId, newUser) {
            /*for(var u in users) {
             var user = users[u];
             if( user._id === userId ) {
             users[u].firstName = newUser.firstName;
             users[u].lastName = newUser.lastName;

             return user;
             }
             }
             return null;*/
            return $http.put("/api/user/" + userId, newUser);
        }

        function deleteUser(userId) {
            /* for(var u in users)
             {
             var user = users[u];
             if(user._id==userId)
             {
             users.splice(u, 1);
             }
             }
             return null;*/
            return $http.delete('/api/user/' + userId);
        }


    }
})();