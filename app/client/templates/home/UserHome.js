Template.UserHome.helpers({

    hasUserPic: function () {
        var imgArray = Meteor.users.find({_id: Meteor.userId()}).map(function (object) {
            return object.profile['profileImage'];
        });

        return imgArray[0] !== undefined;
    },

    listFavorites: function(){

        var favoriteFM = Meteor.user().profile.favorites;
        var favMarket = [];
        _.each(favoriteFM, function(fm){

            favMarket.push(FarmersMarket.find({name: fm}).fetch()[0]);
        });
        console.log(favMarket);
        return favMarket;
    },

    listComments: function(){
        return Comments.find({commentCreator: Meteor.user().username}).fetch();
    }
});

Template.UserHome.events({
    'click .editProfile': function(e){
        e.preventDefault();
        Router.go('/EditProfile');
    },

    'click .goMarket': function(e){
        e.preventDefault();
        Router.go('/FarmersMarket/'+ this._id);
    },

    'click .viewMarket': function(e){
        e.preventDefault();
        Router.go('/FarmersMarket/'+ this.commentId);
    }
});
