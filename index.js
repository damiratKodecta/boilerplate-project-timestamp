// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({ 
    unix: now.getTime(), 
    utc: now.toUTCString() })
});

app.get("/api/:date", (req, res) => {
  const paramsDate = req.params.date;
  const invalidDate = "Invalid Date";
  const date = parseInt(paramsDate) < 10000
      ? new Date(paramsDate)
      : new Date(parseInt(paramsDate))

  date.toString() === invalidDate
      ? res.json({ error: invalidDate })
      : res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Validate YYYY-[M]M-[D]D format
function isValidDateFormat(dateString) {
  const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
  const valid = dateString.match(regex) !== null;
  console.log('valid date format:' + valid);
  return valid;
}

//Validate timestamp
function isValidTimestamp(stampString) {
  const valid = (new Date(stampString*1000)).getTime() > 0;
  console.log('valid timestamp:' + valid);
return valid;

}
