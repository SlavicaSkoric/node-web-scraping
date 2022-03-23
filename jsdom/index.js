const got = require('got');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const vgmUrl = 'https://www.vgmusic.com/music/console/nintendo/nes';

const isMidi = (link) => {
  // Return false if there is no href attribute.
  if (typeof link.href === 'undefined') {
    return false;
  }

  return link.href.includes('.mid');
};

const noParens = (link) => {
  // Regular expression to determine if the text has parentheses.
  const parensRegex = /^((?!\().)*$/;
  return parensRegex.test(link.textContent);
};

(async () => {
  const response = await got(vgmUrl);
  const dom = new JSDOM(response.body);

  // Create an Array out of the HTML Elements for filtering using spread syntax.
  const nodeList = [...dom.window.document.querySelectorAll('a')];

  nodeList
    .filter(isMidi)
    .filter(noParens)
    .forEach((link) => {
      console.log(link.href);
    });
})();
