const fs = require('fs');

console.log(process.cwd());

console.log(fs.realpathSync(process.cwd()));

// D:\Personal Files\code\frontend-demos\Node\demo\fs\api