const chromeLauncher = require('chrome-launcher');
const axios = require('axios');
const puppeteer = require('puppeteer');

(async () => {
  // Initializing a Chrome instance manually
  const chrome = await chromeLauncher.launch();
    const response = await axios.get(`http://localhost:${chrome.port}/json/version`);
    const { webSocketDebuggerUrl } = response.data;
    console.log(response)
    // Connecting the instance using `browserWSEndpoint`
    try{
  const browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl });
//   console.info(browser);
}catch(err){
    console.log(err)
}
// try{
//     await chrome.kill();
// }catch(err){
//     console.log('dipshit')
// }
// try{
//     await browser.close();
// }catch(err){
    // console.log('fatty')
// }
})();