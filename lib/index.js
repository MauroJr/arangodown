'use strict';

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _abstractLeveldown = require('abstract-leveldown');

var _arangojs = require('arangojs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = ArangoDOWN;

function ArangoDOWN(arangoUri) {
  _abstractLeveldown.AbstractLevelDOWN.call(this, arangoUri);
}

_util2.default.inherits(ArangoDOWN, _abstractLeveldown.AbstractLevelDOWN);

ArangoDOWN.prototype._dbExists = function _dbExists({ createIfMissing, errorIfExists }, done) {
  const dbName = this.location;

  this._db.listDatabases((err, names) => {
    if (err) {
      return done(err);
    }

    const dbExists = names.includes(dbName);

    if (!createIfMissing && !dbExists) {
      return done(new Error(`Database ${dbName} does not exist`));
    }

    if (errorIfExists && dbExists) {
      return done(new Error(`Database ${dbName} already exists`));
    }

    done();
  });
};

ArangoDOWN.prototype._open = function _open(options, callback) {
  const self = this;

  self._db = new _arangojs.Database(self.location);

  self.dbExists(options, callback);
};

ArangoDOWN.prototype._close = function _open(callback) {
  process.nextTick(callback);
};