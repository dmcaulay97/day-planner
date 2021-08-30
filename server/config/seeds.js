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
                    start: "2021-08-29",
                    end: "2021-08-29",
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
                    start: "2021-08-29",
                    end: "2021-08-29",
                    title: "Meeting",
                    category: "Meetings"
                },
                {
                    start: "2021-08-11",
                    end: "2021-08-11",
                    title: "My Birthday",
                    category: "Birthdays"
                },
                {
                    start: "2021-08-25",
                    end: "2021-08-25",
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