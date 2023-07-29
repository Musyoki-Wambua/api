const PORT = process.env.PORT || 8000
const express = require("express")
const axios = require('axios')
const cheerio = require('cheerio')

const app = express(); //Create an instance of the app

const newspapers = [
    {
        name: 'cityam',
        address: 'https://www.cityam.com/topic/climate-change/',
        base: ''
    },
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: ''
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: '',
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',
        base: 'https://www.telegraph.co.uk',
    },
    {
        name: 'nyt',
        address: 'https://www.nytimes.com/international/section/climate',
        base: '',
    },
    {
        name: 'latimes',
        address: 'https://www.latimes.com/environment',
        base: '',
    },
    {
        name: 'smh',
        address: 'https://www.smh.com.au/environment/climate-change',
        base: 'https://www.smh.com.au', 
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.co.uk/news/science_and_environment',
        base: 'https://www.bbc.co.uk',
    },
    {
        name: 'es',
        address: 'https://www.standard.co.uk/topic/climate-change',
        base: 'https://www.standard.co.uk'
    },
    {
        name: 'sun',
        address: 'https://www.thesun.co.uk/topic/climate-change-environment/',
        base: ''
    },
    {
        name: 'dm',
        address: 'https://www.dailymail.co.uk/news/climate_change_global_warming/index.html',
        base: ''
    },
    {
        name: 'nyp',
        address: 'https://nypost.com/tag/climate-change/',
        base: ''
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

app.get('/news/:newspaperId',(req, res) => {
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
         .catch((errors) => {
            console.log(errors)
         })
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
