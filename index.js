const PORT = 8000
const express = require("express")
const axios = require('axios')
const cheerio = require('cheerio')

const app = express(); //Create an instance of the app

const newspapers = [
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: ""
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis/all',
        base: ''
    }, 
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',
        base: "https://www.telegraph.co.uk"
    }
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("climate")').each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            articles.push({ title, url: newspaper.base + url , source: newspaper.name })
        })


    })
})


app.get('/', (req, res) => {
    res.json("Welcome to my climate change News API")
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get('/news/:newspaperId', async (req, res) => {
    console.log(req.params.newspaperId)
    const  newspaperId = (req.params.newspaperId)

    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base

    console.log(newspaperAddress)

    axios.get(newspaperAddress)
         .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const specificArticles =[]

            $('a:contains("climate")').each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title, 
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)
         })
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
