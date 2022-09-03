const router = require('express').Router();

const { getAllUsers, getRandomUser, saveUser, updateUser, updateUsers, deleteUser } = require('../controllers/users.controller');

router.get("/random", getRandomUser);
router.get("/all", getAllUsers);

router.post("/save", saveUser);

router.patch("/update/:id", updateUser);
router.patch("/bulk-update", updateUsers);

router.delete("/delete/:id", deleteUser);


module.exports = router