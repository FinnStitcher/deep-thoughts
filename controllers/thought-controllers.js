const {Thought} = require('../models');

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
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
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
    }
};

module.exports = thoughtController;