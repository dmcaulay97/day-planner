const db = require('./connection');
const { User, Event } = require('../models')

db.once('open', async () => {
    await User.deleteMany()

    await User.insertMany([
        {
            username: "Dylan",
            email: "dylan@email.com",
            password: "1234",
            events: [
                {
                    date: 1,
                    description: "project meeting",
                    title: "Meeting"
                }
            ]
        },
        {
            username: "malmason66",
            email: "malmason66@gmail.com",
            password: "password123!",
            events: [
                {
                    date: 1,
                    description: "Meeting to discuss homework",
                    title: "Meeting"
                }
            ]
        }
    ]);
    console.log('data seeded')

    process.exit();
});