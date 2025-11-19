const puppeteer = require("puppeteer");

// Función para extraer información de cada rating
const extractRating = async () => {
    try {
        // Almaceno información de cada producto
        const ratingData = {};

    }   
    catch(err){
            // Devolvemos el error 
        return {error:err}
    }
}

// Iniciar 
const startBrowser = async (url) => {
    let browser;
    try {
        console.log("Abriendo browser...");
        // Inicializar una instancia del navegador (browser)
        browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto(url);
    } 
    catch (err) {
        console.log("Error:", err);
    }
    return browser
}
module.exports = {
    startBrowser,
}

startBrowser("https://www.filmaffinity.com/es/cat_new_th_es.html").then(data => {
    console.log(data);
})