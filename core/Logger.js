// LOGGER TRACE
const path = require('path');


module.exports = function () {

    this.tracelog = function(s) {
        const orig = Error.prepareStackTrace;
        Error.prepareStackTrace = (_, stack) => stack;
        const err = new Error();
        Error.captureStackTrace(err, arguments.callee);
        const callee = err.stack[0];
        Error.prepareStackTrace = orig;

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        process.stdout.write(`${dateTime} ${path.relative(process.cwd(), callee.getFileName())}:${callee.getLineNumber()}: ${s}\n`);
    }
}
