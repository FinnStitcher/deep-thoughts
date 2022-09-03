const {User} = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    getUserById({params}, res) {
        User.findOne({
            _id: params.id
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
        User.findOneOrUpdate(
            {_id: params.id},
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
        User.findOneAndDelete({_id: params.id})
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
    }
};

module.exports = userController;