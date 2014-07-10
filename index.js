'use strict';

var _ = require('lodash');
var nex = require('nex-api');
var rimraf = require('rimraf');
var fs = require('fs');
var log = require('npmlog');

var handler = module.exports = new nex.Handler('symlinks');

/**
 * @override
 */
handler.do = function (pkg) {
  _.each(pkg.symlinks, function (linkName, target) {
    rimraf.sync(linkName);
    fs.symlinkSync(target, linkName);
  });
};

/**
 * @override
 */
handler.undo = function (pkg) {
  _.each(pkg.symlinks, rimraf.sync);
};
