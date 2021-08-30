const db = require('./connection');
const { User } = require('../models')
const bcrypt = require('bcrypt');

db.once('open', async () => {


    await User.deleteMany()

    const password = await bcrypt.hash("1234", 10);

    await User.insertMany([
        {
            username: "Dylan",
            email: "dylan@email.com",
            password: password,
            events: [
                {
                    date: "2021-08-29",
                    description: "project meeting",
                    title: "Meeting"
                }
            ],
            tasks: [
                {
                    title: "submit homework"
                },
                {
                    title: "shopping"
                },
                {
                    title: "go to the gym",
                    completed: true
                }
            ]
        },
        {
            username: "malmason66",
            email: "malmason66@gmail.com",
            password: password,
            events: [
                {
                    date: "2021-08-29",
                    description: "Meeting to discuss homework",
                    title: "Meeting",
                    category: "Meetings"
                },
                {
                    date: "2021-08-11",
                    description: "Birthday celebration",
                    title: "My Birthday",
                    category: "Birthdays"
                },
                {
                    date: "2021-08-25",
                    description: "Vacation Day",
                    title: "Vacation",
                    category: "Personal"
                }
            ],
            tasks: [
                {
                    title: "Complete homework"
                },
                {
                    title: "Wash the car"
                },
                {
                    title: "Go grocery shopping",
                    completed: true
                }
            ]
        }
    ]);
    console.log('data seeded')

    process.exit();
});