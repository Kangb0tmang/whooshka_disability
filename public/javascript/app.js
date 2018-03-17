var getData = function(url) {
  var xhReq = new XMLHttpRequest();
  xhReq.open("GET", url, false);
  xhReq.send(null);
  return JSON.parse(xhReq.responseText);
};

var carSpots = getData("https://data.melbourne.vic.gov.au/resource/dtpv-d4pf.json?$limit=3500&$$app_token=jpiQfPu1dbPRt0ZUEjKyWxLmX");
var filteredSpots = getData("https://data.melbourne.vic.gov.au/resource/rzb8-bz3y.json?$q=DIS&$limit=4500");