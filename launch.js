require = require('esm')(module);
require('./launch.ejs').default(process.argv.slice(2));