import puppeteer from 'puppeteer';
import cookies from '../storage/cookies.json' assert { type: 'json' };
import localStorage from '../storage/localStorage.json' assert { type: 'json' };
import fs from 'node:fs';

export const generatePDF = async ({
	webPage,
	pdfOptions,
	puppeteerOptions,
	multiPage = false,
}) => {
	let browser;

	try {
		browser = await puppeteer.launch({
			headless: puppeteerOptions.headless,
			defaultViewport: puppeteerOptions.viewport,
		});

		const page = await browser.newPage();
		await page.setUserAgent(puppeteerOptions.userAgent);
		await page.goto(webPage);

		await page.setCookie(
			...cookies.map((cookie) => ({
				...cookie,
			}))
		);

		await page.goto(webPage, { waitUntil: 'networkidle2' });

		await page.evaluate((data) => {
			Object.keys(data).forEach((key) => {
				localStorage.setItem(key, data[key]);
			});
		}, localStorage);

		let pageTitle = await page.title();
		pageTitle = pageTitle.replace(/[\\\/:*?"<>|\s]+/g, '-');

		if (!fs.existsSync('./pdfs')) {
			fs.mkdirSync('./pdfs');
		}

		if (multiPage) {
			let sectionUrls = [];
			sectionUrls = await page.$$eval(multiPage.linkSelector, (links) =>
				links.map((link) => link.href)
			);
			console.log(`\x1b[35mFound ${sectionUrls.length} pages\x1b[0m`);
			for (let i = multiPage.startIndex; i < sectionUrls.length; i++) {
				const url = sectionUrls[i];
				await page.goto(url, { waitUntil: 'networkidle2' });
				const pdfPath = `${pdfOptions.outDir}/page-${i + 1}.pdf`;
				await page.pdf({ path: pdfPath, format: pdfOptions.format });
				console.log(
					`\x1b[35mPDF generated successfully for the page ${
						i + 1
					} at ${pdfPath}\x1b[0m`
				);
			}

			return true;
		}

		const pdfPath = `${pdfOptions.outDir}/${pageTitle}.pdf`;
		await page.pdf({ path: pdfPath, format: pdfOptions.format });
		console.log(`\x1b[35mPDF generated successfully at ${pdfPath}\x1b[0m`);
	} catch (error) {
		throw new Error(error.message);
	} finally {
		if (browser) {
			await browser.close();
		}
	}
};
