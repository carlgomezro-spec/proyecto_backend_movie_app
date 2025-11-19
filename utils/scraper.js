const puppeteer = require("puppeteer");

// Función para extraer información de cada rating
const extractRating = async (url, browser) => {
    try {
        // Almaceno información de cada producto
        const ratingData = {};
        // Abrimos nueva pestaña y accedemos al link de cada producto
        const page = await browser.newPage();
        await page.goto(url);

        ratingData['movie-rat-avg'] = await page.$eval("div", movie => movie.innerHTML)

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

        // Cerramos el browser (navegador) con el método browser.close
        await browser.close()
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