const router = require('express').Router();

const { getAllUsers, getRandomUser, saveUser, updateUser } = require('../controllers/users.controller');

router.get("/random", getRandomUser);
router.get("/all", getAllUsers);

router.post("/save", saveUser);

router.patch("/update/:id", updateUser);

module.exports = router