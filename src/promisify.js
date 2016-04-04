var promisfy = function(fn, ctx) {
    return function() {
        var args = arguments;

        return new Promise(function(resolve, reject) {
            var cb = function() {
                var err = Array.prototype.shift.call(arguments);
                if (err) {
                    reject(err);
                } else {
                    resolve.apply(null, arguments);
                }
            };

            Array.prototype.push.call(args, cb);

            fn.apply(ctx || null, args);
        });
    };
};

module.exports = promisfy;
