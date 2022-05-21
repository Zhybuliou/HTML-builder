const fs = require('fs');
const path = require('path');

function copyDir(){
  fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, () => {
    fs.mkdir(path.join(__dirname, 'files-copy'),{ recursive: true }, err => {
      if(err) {console.log(err);}
      fs.readdir(__dirname, (err, files) => {
        if (err)
          console.log(err);
        else {
          files.forEach(file => {
            if(file === 'files'){
              fs.readdir(path.join(__dirname, 'files'),{ withFileTypes: true }, (err, files) => {
                if (err)
                  console.log(err);
                else {
                  files.forEach(file => {
                    if(file.isFile()){
                      fs.copyFile(path.join(__dirname,'files',`${file.name}`), path.join(__dirname,'files-copy',`${file.name}`), (err) =>{
                        if(err){console.log(err);}
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  });
}
copyDir();