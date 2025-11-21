const puppeteer = require("puppeteer");
const fs = require('fs');
require('mongoose');
require('../config/db_mongo');
const Film = require("../models/films.model");

// Función para extraer información de cada rating
const extractRating = async (url, browser) => {
    try {
        // Almaceno información de cada producto
        const ratingData = {};
        
        // Abrimos nueva pestaña y accedemos al link de cada producto
        const page = await browser.newPage();
        await page.goto(url);

        ratingData['Title'] = await page.$eval(".titlebar-link", title => title.innerHTML.trim());
        ratingData['Type'] = await page.$eval(".rating-title", type => type.innerHTML);
        ratingData['Value'] = await page.$eval(".stareval-note", value => value.innerHTML);

        // Devuelve los datos
        return ratingData;
    }   
    catch(err){
            // Devolvemos el error 
        return {error:err}
    }
}

// Iniciar todo el scraping
const startBrowser = async (url) => {
    // Ratings
    try {
        // Creamos array vacío para almacenar la información obtenida del scraping
        const scrapedData = [];
        console.log("Abriendo browser...");
        // Inicializar una instancia del navegador (browser)
        const browser = await puppeteer.launch({
            headless: false
        });
        // Abre nueva pestaña en el navegador con newPage() con la url que le hemos específicado con page.goto()
        const page = await browser.newPage();
        await page.goto(url);
        console.log(`Navegando a ${url}`);

        // Lista de nodos -> convertirlo a una lista de href -> array de links
        const tmpurls = await page.$$eval("div > a", link => link.map(a => a.href))

        // Filtro para que sólo devuelva enlaces con /pelicula-
        const urls = await tmpurls.filter(link => link.includes('/pelicula-'))

        console.log("url capturadas", urls);
        // Me quedo con los 20 primeros ratings
        const urls2 = urls.slice(0, 5);

        console.log(`${urls2.length} links encontrados`);
        console.log(urls2);

        for(ratingLink in urls2) {
            const ratingMovie = await extractRating(urls2[ratingLink], browser);
            scrapedData.push(ratingMovie)
       }

        console.log(scrapedData, "Lo que devuelve mi función scraper", scrapedData.length);
       await browser.close();
       
        // Escribimos los datos en un archivo .json
        fs.writeFile('scrapedData.json', JSON.stringify(scrapedData,null, 2), (err) => {
            if (err) throw err;
            console.log('Datos guardados en scrapedData.json');
        });
        
        return scrapedData;
    }
    catch (err) {
    console.log("Error:", err);
    }
}
module.exports = {
    startBrowser,
}

startBrowser("https://www.sensacine.com/peliculas/").then(async data => {
    console.log(data);
    console.log("Insertando en MongoDB...")
    for (const rating of data) {
        await Film.findOneAndUpdate(
            { Title: rating.Title },
            { $push: { Ratings: {
                Type: rating.Type,
                Value: rating.Value
            }}},
            { new: true, upsert: true }
        );
    }
    console.log("Ratings guardados en la BBDD");
});