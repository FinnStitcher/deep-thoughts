const {DateTime} = require('luxon');

function dateFormat(date) {
    const luxonDate = DateTime.fromJSDate(date);
    return luxonDate.toLocaleString(DateTime.DATETIME_MED);
};

module.exports = dateFormat;