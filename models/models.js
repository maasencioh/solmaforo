'use strict';

var kvstore = require('gcloud-kvstore');
var gcloud = require('gcloud')({
    projectId: 'angelic-digit-119719',
    keyFilename: 'keyfile.json'
});
var dataset = gcloud.datastore.dataset();
var store = kvstore(dataset);

exports.store = store;