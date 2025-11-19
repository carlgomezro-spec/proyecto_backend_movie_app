// Importamos la función scraper de la carpeta utils
const scraperUtils = require('../utils/scraper');

async function scrapeAll(browserInstance){
	let browser;
	try{
		browser = await browserInstance;
		await scraperUtils.scraper(browser);
		
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance) => scrapeAll(browserInstance)