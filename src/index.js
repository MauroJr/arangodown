import util from 'util';
import { AbstractLevelDOWN } from 'abstract-leveldown';
import { Database } from 'arangojs';


exports.default = ArangoDOWN;


function ArangoDOWN(arangoUri) {
  AbstractLevelDOWN.call(this, arangoUri);
}

util.inherits(ArangoDOWN, AbstractLevelDOWN);


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

  self._db = new Database(self.location);

  self.dbExists(options, callback);
};

ArangoDOWN.prototype._close = function _open(callback) {
  process.nextTick(callback);
};
