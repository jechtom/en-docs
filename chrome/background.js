chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var redirects, pattern, from, to, redirecUrl;
    redirects = [
      { 
        from: 'https://docs.microsoft.com/\w{2}-\w{2}/(.*)',
        to:   'https://docs.microsoft.com/en-us/$1'
      }
    ];
    for (var i=0; i < redirects.length; i++) {
      try {
        pattern = new RegExp(redirects[i].from, 'ig');
      } catch(err) {
        //bad pattern
        continue;
      }
      match = details.url.match(pattern);
      if (match) {
        redirectUrl = details.url.replace(pattern, redirects[i].to);
        if (redirectUrl != details.url) {
          return {redirectUrl: redirectUrl};
        }
      }
    }
    return {};
  },
  {
    urls: [
      "<all_urls>",
    ],
    types: ["main_frame"]
  },
  ["blocking"]
);