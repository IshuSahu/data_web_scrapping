const { chromium } = require('playwright');
const fs = require('fs');
const data = require('./data/data.json'); 

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // List of URLs to process
    const urls = data.amazon;

    if (!Array.isArray(urls) || urls.length === 0) {
        console.error("No URLs found in the 'amazon' key of data.json.");
        return;
    }

    const results = []; // To store the scraped data
    const outputPath = './crwalResult/amazon.json'; 

    try {
        for (const url of urls) {
            console.log(`Processing URL: ${url}`);

            // Navigate to the Amazon product page
            await page.goto(url);

            // Attempt to retrieve price
            const priceSelector = `//span[contains(@class, 'a-price') and contains(@class, 'priceToPay')]/span[@aria-hidden='true']/span[@class='a-price-whole']`;
            const priceElement = page.locator(priceSelector);
            const isPricePresent = await priceElement.count();
            const price = isPricePresent > 0 ? await priceElement.nth(0).innerText() : "Currently unavailable";

            // Attempt to retrieve seller name
            const sellerSelector = `a#sellerProfileTriggerId`;
            const sellerElement = page.locator(sellerSelector);
            const isSellerPresent = await sellerElement.count();
            const sellerName = isSellerPresent > 0 ? await sellerElement.nth(0).innerText() : "Currently unavailable";

            // Add the scraped data to results
            results.push({
                link: url,
                seller: sellerName,
                price: price
            });

            console.log('Price:', price);
            console.log('Seller Name:', sellerName);
            console.log('---'); // Separator for readability
        }
    } catch (error) {
        console.error('Error encountered:', error.message);
    } finally {
        // Save the results to amazon.json even if an exception occurs
        try {
            fs.writeFileSync(outputPath, JSON.stringify(results, null, 4)); // Pretty print JSON
            console.log(`Data successfully saved to ${outputPath}`);
        } catch (fileError) {
            console.error(`Failed to save data to ${outputPath}:`, fileError.message);
        }

        await browser.close();
    }
})();