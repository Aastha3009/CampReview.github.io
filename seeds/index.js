const mongoose = require("mongoose");
const { places, descriptors } = require("./seedHelpers");
const cities = require("./cities");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 120; i++) {
		const random150 = Math.floor(Math.random() * 150);
		const price = Math.floor(Math.random() * 100) * 10;
		const camp = new Campground({
			author: "64eb1d333296586dca20f4d9",
			location: `${cities[random150].city},${cities[random150].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				"Enjoy your holidays with nature and differnt wheather. Start your camping with us and find a way to see your life with new expectations and enjoyment",
			price,
			geometry: {
				type: "Point",
				coordinates: [cities[random150].longitude, cities[random150].latitude],
			},
			images: [
				{
					url: "https://res.cloudinary.com/duhunj5yt/image/upload/v1693234070/YelpCamp/acpwawushf8wcfs2tyxh.jpg",
					filename: "YelpCamp/acpwawushf8wcfs2tyxh",
				},
				{
					url: "https://res.cloudinary.com/duhunj5yt/image/upload/v1693234071/YelpCamp/uwyfvamn9xkcd8ddtbt2.jpg",
					filename: "YelpCamp/uwyfvamn9xkcd8ddtbt2",
				},
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
