// const puppeteer = require('puppeteer');

// let browser;
// const app = 'http://localhost:3000/#/';
// describe('Functional UI testing', () => {
//   test('Validate login', async () => {
//     browser = await puppeteer.launch({
//       headless: false,
//       slowMo: 35,
//     });
//     const page = await browser.newPage();
//     await page.goto(app);

//     try {
//       await page.click('button.navbar-toggler');
//       await page.click('a.login-btn');
//       await page.click('button.navbar-toggler');
//       await page.click('input#formBasicEmail');
//       await page.type('input#formBasicEmail', 'vasilijevic032@gmail.co');
//       await page.click('input#formBasicPassword');
//       await page.type('input#formBasicPassword', 'Stefa');
//       await page.click(
//         '#root > div.login > div > form > div:nth-child(4) > button'
//       );
//       await page.click('button.navbar-toggler');
//     } catch (err) {}

//   }, 30000);
// });
