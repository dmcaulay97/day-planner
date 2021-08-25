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
        }
    ]);
    console.log('data seeded')

    process.exit();
});