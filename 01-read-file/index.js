const fs = require('fs');
const path = require('path');
const {stdout} =  process;

const readStream = fs.ReadStream(path.join(__dirname, 'text.txt'));
readStream.on('data', (chunk) => {
  stdout.write(chunk.toString());
});