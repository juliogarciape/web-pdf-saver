# Web Pdf Saver

**This is a simple web application that allows users to save web pages as PDFs.**

## Support Us :sparkling_heart:

If you find this project useful, please consider:

- **Star the Repo**: [Give it a star](https://github.com/juliogarciape/web-pdf-saver) on GitHub to help increase its visibility.

## Installation :wrench:

1. Clone the repository

```bash
git clone git@github.com:juliogarciape/web-pdf-saver.git
```

2. Install the dependencies

```bash
npm install
```

3. Start the application

```bash
npm start
```

## Usage :hammer_and_wrench:

The application uses **Puppeteer** to generate PDFs from web pages.

### Authentication :key:

If the web page requires authentication, you can provide the credentials. The directory `src/storage` contains the files `cookies.json` and `localStorage.json`, which store the cookie information and local storage data, respectively.

```json
/* src/storage/cookies.json */

[
  {
	"name": "cookie_name",
	"value": "cookie_value",
	"domain": "example.com",
	"path": "/",
	"expires": 1634025600,
	"size": 50,
	"httpOnly": false,
	"secure": false,
	"session": false,
	"sameSite": "Lax"
  }
]

/* src/storage/localStorage.json */

{
  "userSettings": "{\"language\":\"en\",\"theme\":\"dark\"}",
  "lastPageVisited": "/home",
  "savedItems": "[{\"id\":\"item1\",\"name\":\"Item One\",\"quantity\":3},{\"id\":\"item2\",\"name\":\"Item Two\",\"quantity\":1}]",
  "sessionId": "xyz789"
}
```

### Single Page :page_facing_up:

To generate a PDF for a web page, you need to provide the URL of the page.

```javascript
/* src/index.js */

import { generatePDF } from './lib/scraper.js';
import config from './config/config.js';

const baseUrl = 'https://www.example.com'; // URL of the web page

/* Generate PDF for a single page */

await generatePDF({
  webPage: baseUrl,
  pdfOptions: config.pdfOptions,
  puppeteerOptions: config.puppeteerOptions,
});
```

### Multiple Pages :books:

To generate PDFs for multiple pages, you can use the `multiPage` option.

```javascript
/* src/index.js */

import { generatePDF } from './lib/scraper.js';
import config from './config/config.js';

const baseUrl = 'https://www.example.com'; // URL of the web page

/* Generate PDF for multiple pages */

await generatePDF({
  webPage: baseUrl,
  pdfOptions: config.pdfOptions,
  puppeteerOptions: config.puppeteerOptions,
  multiPage: {
    startIndex: config.puppeteerOptions.startIndex, // Index of the first page
    linkSelector: '#sidebar-collection-categories a', // Selector for finding links to multiple pages
  },
});
```

### Configuration :gear:

The default configuration can be found in the `config.js` file.

```javascript
/* src/config/config.js */

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
```

### Save PDFs :floppy_disk:

The generated PDFs will be saved in the `pdfs` directory.

```bash
web-pdf-saver
├── pdfs
│   ├── example-1.pdf
│   ├── example-2.pdf
│   ├── example-3.pdf
│   └── ...
```

## License :scroll:

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Contact :email:

For questions or support, please contact me at [dev.juliogarciape@gmail.com](mailto:dev.juliogarciape@gmail.com).
