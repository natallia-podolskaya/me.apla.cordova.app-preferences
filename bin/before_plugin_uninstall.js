'use strict';

module.exports = function (context) {
  var Q = require('q'),
    path = require('path'),
    fs = require("./lib/filesystem")(Q, require('fs'), path),
    settings = require("./lib/settings")(fs, path),

    android = require("./lib/android")(context),
    ios = require("./lib/ios")(Q, fs, path, require('plist'), require('xcode'));

  return settings.get()
    .then(function (config) {
      return Q.all([
        android.clean(config),
        ios.clean(config)
      ]);
    })
    .then(settings.remove)
    .catch(function (err) {
      if (err.code === 'NEXIST' || err.code === 'ENOENT') {
        console.log("app-settings.json not found or already removed: skipping clean");
        return;
      }

      console.log('unhandled exception', err);

      throw new Error('Cleanup failed: ' + err.message || err.toString());
    });
};
