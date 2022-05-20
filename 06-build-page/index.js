const fs = require('fs');
const path = require('path');
//create folder
fs.rm(path.join(__dirname, 'project-dist'),{ recursive: true, force: true }, err => {
  if(err) {console.log(err);}
});
setTimeout(() => {
  fs.mkdir(path.join(__dirname, 'project-dist'),{ recursive: true, force: true }, err => {
    if(err) {console.log(err);}
  });
},500);
// end create folder.
// read 
fs.readdir(__dirname, (err, files) => {
  let footer = '';
  let header = '';
  let articles = '';
  let bundleHtml = '';
  let bundleCss = '';
  if(err){console.log(err);}
  files.forEach( file => {
    if(file === 'template.html'){
      setTimeout(() => {
        const readStream = fs.createReadStream(path.join(__dirname, file));
        readStream.on('data', (chunk) => {
          let data = chunk.toString();
          data = data.replace('{{header}}',header);
          data = data.replace('{{articles}}', articles);
          data = data.replace('{{footer}}', footer);
          bundleHtml = data;
        });
      },400);
    }
    else if(file === 'assets'){
      console.log(true);
    }
    else if(file === 'components'){
      fs.readdir(path.join(__dirname, file), (err, files) => {
        if(err){console.log(err);}
        files.forEach(file =>{
          if(file === 'articles.html'){
            const readStream = fs.createReadStream(path.join(__dirname,'components', file));
            readStream.on('data', (chunk) => {
              let data = chunk.toString();
              articles = data;
            });
          }else if(file === 'footer.html'){
            const readStream = fs.createReadStream(path.join(__dirname,'components', file));
            readStream.on('data', (chunk) => {
              let data = chunk.toString();
              footer = data;
            });
          }else if(file === 'header.html'){
            const readStream = fs.createReadStream(path.join(__dirname,'components', file));
            readStream.on('data', (chunk) => {
              header = chunk.toString();
            });
          }
        });
      });
    }
    else if(file === 'styles'){
      fs.readdir(path.join(__dirname, file), (err, files) => {
        if(err){console.log(err);}
        files.forEach(file =>{
          const readStream = fs.createReadStream(path.join(__dirname,'styles', file));
          readStream.on('data', (chunk) => {
            let data = chunk.toString();
            bundleCss += data;
          });
        });
      });
    }
  });
  // bundle section 
  setTimeout(()=>{
    fs.appendFile(
      path.join(__dirname,'project-dist', 'index.html'),
      bundleHtml,
      err => {
        if(err) throw err;
      }
    );
    fs.appendFile(
      path.join(__dirname,'project-dist', 'style.css'),
      bundleCss,
      err => {
        if(err) throw err;
      }
    );
  },600);
  // end bundle section
});
//end read
