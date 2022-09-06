const {User, Thought} = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '_id thoughtText createdAt reactions'
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    getUserById({params}, res) {
        User.findOne({
            _id: params.userId
        })
        .populate({
            path: 'thoughts',
            select: '_id thoughtText createdAt reactions'
        })
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No user with that ID.'});
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    createUser({body}, res) {
        User.create(body)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
    },

    updateUser({params, body}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            body,
            {new: true, runValidators: true}
        )
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No user with that ID.'});
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    deleteUser({params}, res) {
        User.findOneAndDelete(
            {_id: params.userId}
        )
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No user with that ID.'});
            } else {
                // $in means "anything that's in this array"
                return Thought.deleteMany(
                    { _id: {$in: data.thoughts}}
                );
            }
        })
        .then(deleted => {
            res.json(deleted);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    addFriend({params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: {friends: body.friendId} },
            { new: true, runValidators: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No user with that ID.'});
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
    },

    removeFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: {friends: params.friendId} },
            { new: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No user with that ID.'});
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
    }
};

module.exports = userController;