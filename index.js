'use strict';

const gravatar = require('gravatar');
const request = require('request');

function requestGravatar(email) {
    const result = new Promise(function(resolve, reject) {
        const url = gravatar.profile_url(email, {protocol: 'https'});
        const requestOptions = {
            url: url,
            headers: {
                'User-Agent': 'avatarize'
            }
        };

        request(requestOptions, (error, response, body) => {
            if(response.statusCode == 404) { return resolve('');}
            const result = JSON.parse(body);

            return resolve(result.entry[0].thumbnailUrl);
        });
    });

    return result;
}

function requestGoogleAvatar(email) {
    const result = new Promise(function(resolve, reject) {
        const requestOptions = {
            url: `http://www.avatarapi.com/js.aspx?email=${email}`,
            headers: {
                'User-Agent': 'avatarize'
            }
        };

        request(requestOptions, (error, response, body) => {
            if(response.statusCode == 404) { return resolve('');}

            const regex = /src\s*=\s*'([^']+)'/;
            const result = body.match(regex)[1];

            return resolve(result);
        });
    });

    return result;
}



requestGoogleAvatar('<email address here>').then((result) => {console.log(result);});
requestGravatar('<email address here>').then((url) => {console.log(url);});