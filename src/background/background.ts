chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension is listening");
    
    chrome.webNavigation.onCompleted.addListener((details) => {
      if (details.url && details.url.includes("linkedin.com")) {
        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          files: ['contentScript.js'],
        });
      }
    }, { url: [{ urlMatches: 'https://*.linkedin.com/*' }] });
  });
  