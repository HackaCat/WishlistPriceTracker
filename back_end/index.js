/** @format */

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
	origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to the party pal.' });
});

const db = require('./models');
db.sequelize.sync();

require('./routes/wishlist.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

//I have a list of URLS I want to grab information from
//We'll program a proper way of fetching URLS from the db but for now...
// Bah, domains will have different classes/IDs on their prices too
// TODO: Pull URLS in from DB
// TODO: List classes/IDS/ for each domain? Find a way to keep tabs on these - esp. when adding new URLS

//This should be an array of object ideally to keep track of Names...
//We'll also be pulling this data in later from a DB
var urls = [
	'https://www.uniqlo.com/eu/en/product/women-100pct-cashmere-crew-neck-jumper-439162.html?dwvar_439162_size=SMA006&dwvar_439162_color=COL06&cgid=IDw-jumpers-cardigans&hassubcat=false',
	'https://www.uniqlo.com/eu/en/product/women-cotton-modal-lace-sleeveless-top-440118.html',
	'https://www.uniqlo.com/eu/en_NL/product/women-dry-ex-ultra-stretch-active-ankle-length-trousers-422813.html?dwvar_422813_size=SMA006&dwvar_422813_color=COL69&cgid=IDw-trousers-leggings&hassubcat=false',
];

//Axios will read in that information

for (let i = 0; i < urls.length; i++) {
		axios({ method: 'get', url: urls[i] })
               .then((res) => {
                    //We parse it with Cheerio
				const html = res.data;
				const $ = cheerio.load(html);
				const scrapedPrice = $('.price-sales').text();
                    console.log("the data I'm seeing is " + scrapedPrice);
                    //And push this to a DB
			})
               .catch((error) => {
                    //aaand catch the inevitable failures here.
				console.log(error);
			})
}

//Push it to firebase/mySQL/a local file

//pass the responses on
// Promise.all(promises).then();
