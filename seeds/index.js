const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error!"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '65da06c565203c3e0b7a18d9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit dolor quis quam mattis vulputate. Mauris nisi massa, ullamcorper a eros at, elementum feugiat nisi. Sed sed turpis vel magna imperdiet pretium sit amet ac arcu. Suspendisse potenti. Vivamus nec mattis libero, eu malesuada sapien. Suspendisse sed fringilla mi. Pellentesque at sapien ut sem feugiat condimentum. Aliquam varius erat ante, in auctor mauris mollis a. Aenean vel enim finibus, dignissim lacus a, lacinia ipsum. Duis arcu eros, semper ut vulputate vel, ultricies quis nulla. Duis quis velit sagittis, mattis metus id, consectetur elit. Praesent neque ipsum, venenatis ut erat et, bibendum bibendum justo. Nullam sit amet felis et turpis feugiat vulputate sed quis lectus.'
            ,
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/derbv2gt3/image/upload/v1708933669/YelpCamp/piufeatsl8exd0y1dlx9.jpg',
                    filename: 'YelpCamp/piufeatsl8exd0y1dlx9',

                },
                {
                    url: 'https://res.cloudinary.com/derbv2gt3/image/upload/v1708933670/YelpCamp/q3dpqoxflrvv3bw0btvm.jpg',
                    filename: 'YelpCamp/q3dpqoxflrvv3bw0btvm',

                }
            ]
        })
        await camp.save();
        // const c = new Campground({ title: 'purple field' })
        // await c.save();
    }
}

seedDB().then(() => { mongoose.connection.close(); })

