import { generatePDF } from './lib/scraper.js';
import config from './config/config.js';

const baseUrl = 'https://www.example.com';

console.log('Please, uncomment the code in src/index.js to generate PDFs.');

// Generate PDF for a single page

/* await generatePDF({
	webPage: baseUrl,
	pdfOptions: config.pdfOptions,
	puppeteerOptions: config.puppeteerOptions,
}); */

// Generate PDF for multiple pages

/* await generatePDF({
	webPage: baseUrl,
	pdfOptions: config.pdfOptions,
	puppeteerOptions: config.puppeteerOptions,
	multiPage: {
		startIndex: config.puppeteerOptions.startIndex,
		linkSelector: '#sidebar-collection-categories a',
	},
}); */
