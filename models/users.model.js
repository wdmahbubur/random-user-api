const fs = require('fs');
const generateObjectId = function () {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    const id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
    const data = fs.readFileSync("./randomusers.json")
    const exist = JSON.parse(data).some(user => user.id === id);
    if (exist) {
        return generateObjectId();
    } else {
        return id;
    }
};

class User {
    constructor() {
        this.id = null;
        this.name = null;
        this.gender = null;
        this.contact = null;
        this.address = null;
        this.photoUrl = null;
    }

    save(data) {
        try {
            this.id = generateObjectId();
            this.name = checkValue("Name", data.name);
            this.gender = checkValue("Gender", data.gender);
            this.contact = checkValue("Contact", data.contact);
            this.address = checkValue("Address", data.address);
            this.photoUrl = checkValue("photoUrl", data.photoUrl);
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    update(id, { name, gender, contact, address, photoUrl }) {
        const data = fs.readFileSync("./randomusers.json")
        const user = JSON.parse(data).find(user => user.id === id);
        this.id = id;
        this.name = name || user.name;
        this.gender = gender || user.gender;
        this.contact = contact || user.contact;
        this.address = address || user.address;
        this.photoUrl = photoUrl || user.photoUrl;
    }
}

const checkValue = (key, value) => {
    if (!value) {
        throw new Error(key + " is required!");
    }
    return value;
}

module.exports = User;