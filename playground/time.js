//Jan 1st 1970 00:00:00 am Midnight stored in UTC--independent of time zone UNIX EPIC
var moment = require('moment');
var date = moment();

console.log(date.format('h:mm a'));