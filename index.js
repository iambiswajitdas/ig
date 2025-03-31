const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

async function runAutomation() {
    // Launch Chrome browser
    const browser = await puppeteer.launch({
        headless: true, // Set to true if you don't want to see the browser
        args: ['--no-sandbox'],
        executablePath: '/usr/bin/chromium-browser' // Common path on Render
    });
    
    // Open new page
    const page = await browser.newPage();
    
    try {
        // 1. Go to initial URL
        await page.goto('https://canlitakipci.com/memberLogin', {
            waitUntil: 'networkidle0'
        });
        
        // 2. Login
        await page.type('input[name="username"]', 'arunabanik3'); // Replace with actual selector and username
        await page.type('input[name="password"]', 'Nokia@6300'); // Replace with actual selector and password
        await page.click('#login_insta'); // Replace with actual login button selector
        
        // Wait for navigation after login
        await page.waitForNavigation({
            waitUntil: 'networkidle0'
        });
        
        // 3. Navigate to specific page
        await page.goto('https://canlitakipci.com/tools/send-follower', {
            waitUntil: 'networkidle0'
        });
        
        // 4. Click buttons
        await page.type('input[name="username"]', 'heybiswajit');
        await page.click('.btn-success');

        await page.waitForNavigation({
            waitUntil: 'networkidle0'
        });

        await page.type('input[name="adet"]', '600');
        await page.click('#formTakipSubmitButton');

        console.log('Task completed successfully!');
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        //await browser.close();
    }
}

// Endpoint to trigger automation
app.get('/run', async (req, res) => {
    const result = await runAutomation();
    res.send(result);
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
