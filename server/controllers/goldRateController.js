const puppeteer = require('puppeteer');
const fs = require('fs');

// const getGoldRate = async (req, res) => {
//   let browser;
//   let retryCount = 0;
//   const maxRetries = 3;
//   const baseUrl = 'https://www.livechennai.com/gold_silverrate.asp';

//   while (retryCount < maxRetries) {
//     try {
//       console.log(`Attempt ${retryCount + 1} of ${maxRetries}`);
      
//       // Configure browser with additional options
//       browser = await puppeteer.launch({
//         headless: true,
//         args: [
//           '--no-sandbox',
//           '--disable-setuid-sandbox',
//           '--disable-dev-shm-usage',
//           '--disable-accelerated-2d-canvas',
//           '--disable-gpu'
//         ],
//         timeout: 60000
//       });

//       const page = await browser.newPage();
      
//       // Set realistic browser headers
//       await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
//       await page.setExtraHTTPHeaders({
//         'Accept-Language': 'en-US,en;q=0.9',
//         'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
//       });

//       // Configure page behavior
//       await page.setViewport({ width: 1366, height: 768 });
//       await page.setDefaultNavigationTimeout(60000);
//       await page.setDefaultTimeout(30000);

//       console.log(`Navigating to ${baseUrl}...`);
//       await page.goto(baseUrl, {
//         waitUntil: 'networkidle2',
//         timeout: 60000
//       });

//       // Wait for specific elements that indicate page has loaded
//       await page.waitForSelector('body', { timeout: 30000 });
//       await page.waitForFunction(() => document.readyState === 'complete');

//       // Save page content for debugging
//       const html = await page.content();
//       fs.writeFileSync('debug-page.html', html);
//       console.log('✅ Saved debug-page.html');

//       // Enhanced gold rate extraction with multiple fallback methods
//       const goldRate = await page.evaluate(() => {
//         // Method 1: Check for specific elements
//         const goldElements = [
//           ...document.querySelectorAll('*'),
//         ].filter(el => 
//           el.textContent.includes('22') && 
//           (el.textContent.includes('Carat') || el.textContent.includes('Ct')) &&
//           el.textContent.includes('Gold')
//         );

//         for (const el of goldElements) {
//           const priceMatch = el.textContent.match(/(\d{2,},\d{2,})/);
//           if (priceMatch) return priceMatch[0].replace(/,/g, '');
//         }

//         // Method 2: Table search with improved logic
//         const tables = document.querySelectorAll('table');
//         for (const table of tables) {
//           const rows = Array.from(table.querySelectorAll('tr'));
//           for (const row of rows) {
//             const cells = Array.from(row.querySelectorAll('td, th'));
//             const rowText = row.textContent.toLowerCase();
            
//             if (rowText.includes('22') && 
//                 (rowText.includes('carat') || rowText.includes('ct')) && 
//                 rowText.includes('gold')) {
              
//               // Check neighboring cells for price
//               for (const cell of cells) {
//                 const content = cell.textContent.trim();
//                 if (content.match(/^\d{2,},\d{2,}$/)) {
//                   return content.replace(/,/g, '');
//                 }
//               }
//             }
//           }
//         }

//         // Method 3: Fallback to text search
//         const bodyText = document.body.textContent.replace(/\s+/g, ' ');
//         const textMatch = bodyText.match(/22\s*(Carat|Ct|K)\s*Gold.*?(\d{2,},\d{2,})/i);
//         if (textMatch) return textMatch[2].replace(/,/g, '');

//         return null;
//       });

//       if (!goldRate) {
//         throw new Error('Gold rate not found in page content');
//       }

//       return res.json({
//         success: true,
//         city: "Chennai",
//         goldRate: goldRate,
//         currency: "INR",
//         unit: "1 gram",
//         timestamp: new Date().toISOString(),
//         source: baseUrl
//       });

//     } catch (err) {
//       retryCount++;
//       console.error(`Attempt ${retryCount} failed:`, err.message);

//       if (retryCount >= maxRetries) {
//         return res.status(500).json({
//           error: "Failed to fetch gold rate after multiple attempts",
//           details: err.message,
//           troubleshooting: [
//             "1. Check debug-page.html for page content",
//             "2. Verify the website is accessible manually: " + baseUrl,
//             "3. The website structure might have changed - update selectors",
//             "4. Try updating puppeteer: npm install puppeteer@latest",
//             "5. Consider adding proxy if you're being blocked"
//           ],
//           debugFile: fs.existsSync('debug-page.html') ? 'debug-page.html' : null
//         });
//       }

//       // Wait before retrying
//       await new Promise(resolve => setTimeout(resolve, 5000));
//     } finally {
//       if (browser) await browser.close();
//     }
//   }
// };
const getGoldRate = async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://www.livechennai.com/gold_silverrate.asp', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for the gold rates table to load
    await page.waitForSelector('.gold-rates', { timeout: 5000 });

    // Extract both 22K and 24K rates from the first row (latest date)
    const goldData = await page.evaluate(() => {
      const row = document.querySelector('.gold-rates tbody tr');
      if (!row) return null;

      const cells = row.querySelectorAll('td');
      return {
        date: cells[0].textContent.trim(),
        '24K_1g': cells[1].textContent.trim().replace(/\s+/g, ' '),
        '24K_8g': cells[2].textContent.trim().replace(/\s+/g, ' '),
        '22K_1g': cells[3].textContent.trim().replace(/\s+/g, ' '),
        '22K_8g': cells[4].textContent.trim().replace(/\s+/g, ' ')
      };
    });

    if (!goldData) {
      throw new Error('Gold rate table not found');
    }

    // Also get the last update time
    const updateTime = await page.evaluate(() => {
      const elem = document.querySelector('.cgr-usection h5');
      return elem ? elem.textContent.replace('Last Update Time: ', '').trim() : 'Unknown';
    });

    res.json({
      success: true,
      city: "Chennai",
      date: goldData.date,
      lastUpdated: updateTime,
      rates: {
        "24K": {
          "1_gram": goldData['24K_1g'],
          "8_grams": goldData['24K_8g']
        },
        "22K": {
          "1_gram": goldData['22K_1g'],
          "8_grams": goldData['22K_8g']
        }
      },
      currency: "INR",
      source: "https://www.livechennai.com/gold_silverrate.asp",
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: "Failed to fetch gold rates"
    });
  } finally {
    if (browser) await browser.close();
  }
};
module.exports = { getGoldRate };