const {stdout, stdin} = process;
const fs = require('fs');
const path = require('path');


stdout.write('Please typing your text... \n');
fs.writeFile(
  path.join(__dirname, 'text.txt'),'' ,error => {
    if(error) throw error;
  }
);
stdin.on('data', data => {
  const myData = data.toString();
  if(myData.trim() === 'exit'){
    console.log('Goodby and Have a nice day!');
    process.exit(1);
  }
  fs.appendFile(
    path.join(__dirname,'text.txt'),
    myData,
    err => {
      if(err) throw err;
    }
  );
});
process.on('SIGINT', () => {
  console.log('Goodby and Have a nice day!');
  process.exit(1);
});