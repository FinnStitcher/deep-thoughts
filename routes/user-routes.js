const router = require('express').Router();
const {getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend} = require('../controllers/user-controllers');

// /api/users

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/:userId/friends').put(addFriend);

router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;