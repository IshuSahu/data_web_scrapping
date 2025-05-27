# Product Crawler 📦

This Node.js project uses **Playwright** to scrape product information (such as price and seller name) from Amazon product pages. The URLs to scrape are listed in `data/data.json`, and the results are saved in `crwalResult/amazon.json`.

---

## 📂 Project Structure

```
productCrawler/
├── crwalResult/                # Contains scraped results
├── data/                       # Contains input data (URLs)
├── node_modules/               # Node.js dependencies
├── .gitignore                  # Git ignore rules
├── amazonCrawler.js            # Main scraping script
├── playwright.config.js        # Playwright configuration
└── package.json                # Project metadata and dependencies
```

---

## 🚀 How to Run the Scraper

### 1️⃣ Install dependencies
```bash
npm install
npm install playwright
```

### 2️⃣ Prepare input data
Add product URLs under the `amazon` key in `data/data.json`. Example:
```json
{
  "amazon": [
    "https://www.amazon.com/example-product-1",
    "https://www.amazon.com/example-product-2"
  ]
}
```

### 3️⃣ Run the scraper
```bash
node amazonCrawler.js
```

This will:
- Launch Playwright in headless mode.
- Scrape product price and seller name from the URLs.
- Save the results into `crwalResult/amazon.json`.

---

## 📝 Sample Output
```json
[
  {
    "link": "https://www.amazon.com/example-product-1",
    "seller": "Example Seller",
    "price": "99"
  },
  {
    "link": "https://www.amazon.com/example-product-2",
    "seller": "Currently unavailable",
    "price": "Currently unavailable"
  }
]
```

---

## 🛠 Requirements
- Node.js v14 or higher
- Playwright (`npm install playwright`)
- A stable internet connection for scraping

---

## 📬 Need a Custom Web Scraping Solution?
If you require a **custom web scraping implementation** for your business, feel free to reach out to me at:  
📧 **ishusahu593@gmail.com**

---

### 🔥 Happy Crawling!
