const fs = require('fs');
const path = require('path');

fs.writeFile(
  path.join(__dirname,'project-dist','bundle.css'),'' ,error => {
    if(error) throw error;
  }
);
fs.readdir(__dirname, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      if(file === 'styles'){
        fs.readdir(path.join(__dirname, 'styles'),{ withFileTypes: true }, (err, files) => {
          if (err)
            console.log(err);
          else {
            files.forEach(file => {
              if(file.isFile() && path.extname(file.name).slice(1) === 'css'){ 
                if(err) throw err;
                const readStream = fs.createReadStream(path.join(__dirname,'styles' ,`${file.name}`));
                readStream.on('data', (chunk) => {
                  const myData = chunk.toString();
                  fs.appendFile(
                    path.join(__dirname,'project-dist','bundle.css'),
                    myData,
                    err => {
                      if(err) throw err;
                    }
                  );
                });
              }
            });
          }
        });
      }
    });
  }
});