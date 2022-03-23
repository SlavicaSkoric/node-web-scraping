const puppeteer = require('puppeteer');

const vgmUrl = 'https://www.vgmusic.com/music/console/nintendo/nes';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(vgmUrl);

  const links = await page.$$eval('a', (elements) =>
    elements
      .filter((element) => {
        const parensRegex = /^((?!\().)*$/;
        return (
          element.href.includes('.mid') && parensRegex.test(element.textContent)
        );
      })
      .map((element) => element.href)
  );

  links.forEach((link) => console.log(link));

  await browser.close();
})();
