chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var redirects = [
      {
        regex: new RegExp('https://learn.microsoft.com/\\w{2}-\\w{2}/(.*)', 'ig'),
        replace: 'https://learn.microsoft.com/en-us/$1'
      }
    ];
    for (var i=0; i < redirects.length; i++) {

      var regex = redirects[i].regex;
      var replace = redirects[i].replace;

      match = details.url.match(regex);
      if (match) {
        redirectUrl = details.url.replace(regex, replace);
        if (redirectUrl != details.url) {
          return {redirectUrl: redirectUrl};
        }
      }
    }
    return {};
  },
  {
    urls: [
      "*://learn.microsoft.com/*",
    ],
    types: ["main_frame"]
  },
  ["blocking"]
);
