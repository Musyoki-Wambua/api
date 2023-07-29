# APP DESCRIPTION

Climate Change News API is a web application that allows users to retrieve the latest news articles related to climate change from various sources. The application uses web scraping techniques to fetch news articles from multiple newspapers' websites and provides the users with a JSON API to access the data.

## USER STORY

As a user, one can access the latest news articles about climate change from various newspapers in one place. The Climate Change News API allows one to request news articles from specific newspapers or get all the articles from different sources.

## DEVELOPMENT REQUIREMENTS

To run the Climate Change News API, you will need the following:

- Node.js (>=12.0.0) and NPM (Node Package Manager) installed on your machine.
- Express.js
- Axios
- Cheerio and other required Node.js modules (specified in package.json).

## INSTALLATION

To use this repository on your machine do the following simple steps:

- Open a terminal / command line interface on your computer.

- Clone the repo by using the following to create a copy on your local machine:

         git@github.com:Musyoki-Wambua/api.git

- Change the working directory to the project folder:

        cd api

- (Optional) Open it in Visual Studio Code:

        code . 

## RUNNING APP

To run the Climate Change News API, execute the following command in the terminal:

- Run npm install to install the necessary dependencies.

        npm install 

- To launch the server

        npm start

The API will start running on the specified PORT, and you can access it using the base URL.

## ENDPOINTS

- GET /news:

 Retrieves all the latest news articles related to climate change from various newspapers.

- GET /news/:newspaperId:

- You can also [click here](https://climateapi-a4e18d42a4a2.herokuapp.com/news) to launch the live link

## AUTHOR

The Climate Change News API was developed by [Joseph Wambua](https://github.com/Musyoki-Wambua).
