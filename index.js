const express = require('express')
const puppeteer = require('puppeteer')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

// server links
let server1 = {
    loginURL: `https://canlitakipci.com/memberLogin`,
    usernameInput: `input[name="username"]`,
    passwordInput: `input[name="password"]`,
    loginBtn: `#login_insta`,
    followPage: `https://canlitakipci.com/tools/send-follower`,
    instaIdInput: `input[name="username"]`,
    idClick: `.btn-success`,
    valueInput: `input[name="adet"]`,
    submitBtn: `#formTakipSubmitButton`
}

let server2 = {
    loginURL: `https://takipcikrali.com/login`,
    usernameInput: `input[name="username"]`,
    passwordInput: `input[name="password"]`,
    loginBtn: `#login_insta`,
    followPage: `https://takipcikrali.com/tools/send-follower`,
    instaIdInput: `input[name="username"]`,
    idClick: `.btn-success`,
    valueInput: `input[name="adet"]`,
    submitBtn: `#formTakipSubmitButton`
}

let server3 = {
    loginURL: `https://takipcimx.net/login`,
    usernameInput: `input[name="username"]`,
    passwordInput: `input[name="password"]`,
    loginBtn: `#login_insta`,
    followPage: `https://takipcimx.net/tools/send-follower`,
    instaIdInput: `input[name="username"]`,
    idClick: `.btn-success`,
    valueInput: `input[name="adet"]`,
    submitBtn: `#formTakipSubmitButton`
}

let server4 = {
    loginURL: `https://platintakipci.com/member`,
    usernameInput: `input[name="username"]`,
    passwordInput: `input[name="password"]`,
    loginBtn: `#login_insta`,
    followPage: `https://takipcimx.net/tools/send-follower`,
    instaIdInput: `input[name="username"]`,
    idClick: `.btn-success`,
    valueInput: `input[name="adet"]`,
    submitBtn: `#formTakipSubmitButton`
}

app.use(express.static(path.join(__dirname, 'public')));

async function follow(s, username, password, instaID) {
    let server = {}

    if(s == 1) {
        server = server1
    } else if(s == 2) {
        server = server2
    } else if(s == 3) {
        server = server3
    } else {
        return 'Server not found'
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    })
    
    const page = await browser.newPage()
    
    try {
        await page.goto(server.loginURL, {waitUntil: 'networkidle0'})
        await page.type(server.usernameInput, username)
        await page.type(server.passwordInput, password)
        await page.click(server.loginBtn)
        await page.waitForNavigation({waitUntil: 'networkidle0'})
        await page.goto(server.followPage, {waitUntil: 'networkidle0'})
        await page.type(server.instaIdInput, instaID)
        await page.click(server.idClick)
        await page.waitForNavigation({waitUntil: 'networkidle0'})
        await page.type(server.valueInput, '1000')
        await page.click(server.submitBtn)
    } catch (error) {
        console.error('Error:', error)
        return 'Server error... Please try again.'
    } finally {
        await new Promise(r => setTimeout(r, 3000))
        await browser.close();
        return 'Task complete...'
    }
}

app.get('/follow', async (req, res) => {
    const server = req.query.server
    const username = req.query.username
    const password = req.query.password
    const instaID = req.query.instaID

    const result = await follow(server, username, password, instaID)
    res.send(result)
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
