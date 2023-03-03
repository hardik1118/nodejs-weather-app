const request = require('request');

const weather = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ca87fc8546a805f035daff6bf84579d2&query=' + encodeURIComponent(address);

    request({ url: url, json: true }, (error, res) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined);
        } else if (res.body.error) {
            callback('Unable to find location! Try another search', undefined);
        } else {
            callback(undefined, res.body);
        }
    })
}

module.exports = weather;