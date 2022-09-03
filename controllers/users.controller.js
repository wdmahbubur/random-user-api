const fs = require('fs');

exports.getAllUsers = async (req, res) => {
    try {
        fs.readFile("./randomusers.json", (err, data) => {
            if (err) throw err;
            const users = JSON.parse(data).slice(0, req.query.limit);
            res.status(200).send(users);
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message)
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
            res.status(200).send(user);
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message)
    }
};

// const generateObjectId = function () {
//     const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
//     const id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
//         return (Math.random() * 16 | 0).toString(16);
//     }).toLowerCase();
//     const data = fs.readFileSync("./randomusers.json")
//     const exist = JSON.parse(data).some(user => user.id === id);
//     if (exist) {
//         return generateObjectId();
//     } else {
//         return id;
//     }
// };

exports.saveUser = async (req, res) => {
    try {
        const { id, name, gender, contact, address, photoUrl } = req.body;
        if (!name || !gender || !contact || !address || !photoUrl) {
            return res.status(400).send("Missing body property");
        }
        const user = {
            id,
            name,
            gender,
            contact,
            address,
            photoUrl
        }
        let users = JSON.parse(fs.readFileSync('./randomusers.json'));
        users.push(user);
        users = JSON.stringify(users, null, 2);
        fs.writeFile('./randomusers.json', users, (err, data) => {
            if (err) throw err;
            res.status(200).send(data);
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        let users = JSON.parse(fs.readFileSync('./randomusers.json'));
        const exist = users.some(user => user.id === id);
        if (!exist) {
            return res.status(404).send("No user found!");
        }
        let updateUsers = users.map(user => user.id === id ? { ...user, ...body } : user);
        updateUsers = JSON.stringify(updateUsers, null, 2);
        fs.writeFile('./randomusers.json', updateUsers, (err, data) => {
            if (err) throw err;
            res.status(200).send(data);
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};


exports.updateUsers = async (req, res) => {
    try {
        const ids = req.body.ids;
        const body = req.body;
        let users = JSON.parse(fs.readFileSync('./randomusers.json'));
        const exist = users.some(user => user.id === id);
        if (!exist) {
            return res.status(404).send("No user found!");
        }
        let updateUsers = users.map(user => user.id === id ? { ...user, ...body } : user);
        updateUsers = JSON.stringify(updateUsers, null, 2);
        fs.writeFile('./randomusers.json', updateUsers, (err, data) => {
            if (err) throw err;
            res.status(200).send(data);
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};