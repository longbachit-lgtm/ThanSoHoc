const mongoose = require('mongoose');
const User = require('./src/app/models/User');

const checkUser = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/thansohoc', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB");

        const username = 'longbt';
        const user = await User.findOne({ username });

        if (user) {
            console.log("User found:", user.username);
            console.log("Current Role:", user.role);

            if (user.role !== 'admin') {
                console.log("Updating role to admin...");
                user.role = 'admin';
                await user.save();
                console.log("Role updated to ADMIN.");
            } else {
                console.log("User is already ADMIN.");
            }
        } else {
            console.log("User not found!");
        }

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
};

checkUser();
