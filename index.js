const PORT = 8000
const express = require("express")
const axios = require('axios')
const cheerio = require('cheerio')

const app = express(); //Create an instance of the app

const articles = []

const { resolve } = require('url'); // Import the 'resolve' function from the 'url' module


app.get('/', (req, res) => {
    res.json("Welcome to my climate change News API")
})

app.get('/news', (req, res) => {
    axios.get('https://www.theguardian.com/environment/climate-crisis/all')
    .then((response) => {
        const html = response.data
        const baseUrl = 'https://www.theguardian.com'; // Base URL of the web page
        const $ = cheerio.load(html)

        $('a[href*=climate]').each(function () {
            // const h3Element = $(this).find('h3'); //Find the <h3> element within the current anchor tag
            const title = $(this).text(); // Extract the text content of the <h3> element
            const href = $(this).attr('href')

             // Convert the relative URL to an absolute URL
             const url = resolve(baseUrl, href);
            //  if(title.toLowerCase().includes("climate")){
            //     articles.push({ title, url })
            //  }

            articles.push({ title, url })
        })
        res.json(articles)
    })
    .catch((err) => {
        console.log(err);
    })
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
