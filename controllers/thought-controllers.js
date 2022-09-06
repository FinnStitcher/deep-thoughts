const {Thought, User} = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getThoughtById({params}, res) {
        Thought.findOne({
            _id: params.thoughtId
        })
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No thought with that ID.'});
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            console.log(err);
        });
    },

    createThought({body}, res) {
        Thought.create(body)
        .then(({_id, username}) => {
            // locating the relevant user and putting the id of this thought into their document
            return User.findOneAndUpdate(
                { username: username },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'This user could not be found.'});
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: {reactions: body} },
            { new: true, runValidators: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No thought with this ID.'});
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            body,
            {new: true}
        )
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No thought with that ID.'});
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    deleteThought({params}, res) {
        Thought.findOneAndDelete(
            {_id: params.thoughtId}
        )
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No thought with that ID.'});
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId} } },
            { new: true }
        )
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'No thought with that ID.'});
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

module.exports = thoughtController;