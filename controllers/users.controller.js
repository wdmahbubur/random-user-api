const fs = require('fs');
const User = require('../models/users.model');
exports.getAllUsers = async (req, res) => {
    try {
        fs.readFile("./randomusers.json", (err, data) => {
            if (err) throw err;
            const users = JSON.parse(data).slice(0, req.query.limit);
            res.status(200).json(users);
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
};

exports.getRandomUser = async (req, res) => {
    try {
        fs.readFile("./randomusers.json", (err, data) => {
            if (err) throw err;
            const users = JSON.parse(data);
            const index = Math.floor(Math.random() * users.length);
            console.log(index)
            const user = users[index];
            res.status(200).json(user);
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
};

const generateObjectId = function () {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    const id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
    const data = fs.readFileSync("./randomusers.json");
    const exist = JSON.parse(data).some(user => user.id === id);
    if (exist) {
        return generateObjectId();
    } else {
        return id;
    }
};

exports.saveUser = async (req, res) => {
    try {
        const { name, gender, contact, address, photoUrl } = req.body;
        const user = new User();
        user.save({
            name,
            gender,
            contact,
            address,
            photoUrl
        })
        let users = JSON.parse(fs.readFileSync('./randomusers.json'));
        users.push(user);
        users = JSON.stringify(users, null, 2);
        fs.writeFile('./randomusers.json', users, (err, data) => {
            if (err) throw err;
            res.status(200).json({
                message: "New user created successful",
                user
            });
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        let users = JSON.parse(fs.readFileSync('./randomusers.json'));
        const exist = users.some(user => user.id === id);
        if (!exist) {
            return res.status(404).json({ message: "No user found!" });
        }
        const updateUser = new User();
        updateUser.update(id, {
            name: req.body?.name,
            gender: req.body?.gender,
            contact: req.body?.contact,
            address: req.body?.address,
            photoUrl: req.body?.photoUrl
        }
        );

        let updateUsers = users.map(user => user.id === id ? updateUser : user);
        updateUsers = JSON.stringify(updateUsers, null, 2);
        fs.writeFile('./randomusers.json', updateUsers, (err, data) => {
            if (err) throw err;
            res.status(200).json({
                message: "User update successful",
                user: updateUser
            });
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};


exports.updateUsers = async (req, res) => {
    try {
        const ids = req.body.ids;
        let wrongIds = [];
        let users = JSON.parse(fs.readFileSync('./randomusers.json'));
        ids.map(id => {
            const exist = users.some(user => user.id === id);
            if (!exist) {
                return wrongIds.push(id);
            }
            const updateUser = new User();
            updateUser.update(id, {
                name: req.body?.data?.name,
                gender: req.body?.data?.gender,
                contact: req.body?.data?.contact,
                address: req.body?.data?.address,
                photoUrl: req.body?.data?.photoUrl
            });
            users = users.map(user => user.id === id ? updateUser : user);
        })
        users = JSON.stringify(users, null, 2);
        fs.writeFile('./randomusers.json', users, (err, data) => {
            if (err) throw err;
            res.status(200).json({
                message: `${ids.length - wrongIds.length} users update successful. ${wrongIds.length ? wrongIds + " this ids is not found" : ""}`
            });
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        let users = JSON.parse(fs.readFileSync('./randomusers.json'));
        const exist = users.some(user => user.id === id);
        if (!exist) {
            return res.status(404).json({ message: "No user found!" });
        }
        let currentUsers = users.filter(user => user.id !== id);
        currentUsers = JSON.stringify(currentUsers, null, 2)
        fs.writeFile('./randomusers.json', currentUsers, (err, data) => {
            if (err) throw err;
            res.status(200).json({
                message: "User delete successful"
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}