var crayon = require('@ccheever/crayon');

function resolved(opts) {
  return function (result) {
    opts = opts || {};
    if (result != null) {
      console.log(result);
    }
    if (opts.forceExit) {
      process.exit(0);
    }
    return result;
  }
}

function rejected(opts) {
  return function (err) {
    opts = opts || {};
    crayon.red.error(err);
    console.error(err.stack);
    if (opts.forceExit) {
      process.exit(err.code || -1);
    }
    return err;
  }
}

module.exports = function promisePrint(p, opts) {
  return p.then(resolved(opts), rejected(opts));
}

module.exports.resolved = resolved;
module.exports.rejected = rejected;
