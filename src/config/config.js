const config = {
	puppeteerOptions: {
		userAgent:
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
		headless: false,
		viewport: { width: 1024, height: 768 },
		startIndex: 0,
	},
	pdfOptions: {
		format: 'A4',
		outDir: './pdfs',
	},
};

export default config;
