'use strict';
const path = require('path');
const { basePath, apiVersion} = require('../config.json');

function createRoute(str){
    return path.join(
        basePath.toLowerCase(),
        apiVersion.toLowerCase(),
        str.toLowerCase()
    );
}

module.exports = createRoute;
