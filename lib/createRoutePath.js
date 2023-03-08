'use strict';
const path = require('path');
const { basePath, apiVersion} = require('../config.json');

function createRoute(str){
    if (typeof  str != 'string') {
        throw new Error('input must be a string');
    }
    return path.join(
        basePath.toLowerCase(),
        apiVersion.toLowerCase(),
        str.toLowerCase()
    );
}

module.exports = createRoute;
