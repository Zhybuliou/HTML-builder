const fs = require('fs');
const path = require('path');

fs.readdir(__dirname, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if(file === 'secret-folder'){
        fs.readdir(path.join(__dirname, 'secret-folder'),{ withFileTypes: true }, (err, files) => {
          if (err)
            console.log(err);
          else {
            console.log('\nDirectory filenames:');
            files.forEach(file => {
              if(file.isFile()){
                fs.stat(path.join(__dirname,'secret-folder',file.name), (err, stats) => {
                  if(err) throw err;
                  console.log(`${path.basename(file.name, path.extname(file.name))} - ${path.extname(file.name).slice(1)} - ${(stats.size) / 1024}Kb`);
                });
              }
            });
          }
        });
      }
    });
  }
});