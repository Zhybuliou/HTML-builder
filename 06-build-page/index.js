const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'),{ recursive: true, force: true }, err => {
  if(err) {console.log(err);}
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'),{ recursive: true, force: true }, err => {
  if(err) {console.log(err);}
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'),{ recursive: true, force: true }, err => {
  if(err) {console.log(err);}
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'),{ recursive: true, force: true }, err => {
  if(err) {console.log(err);}
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'),{ recursive: true, force: true }, err => {
  if(err) {console.log(err);}
});

let footer = '';
let header = '';
let articles = '';
let bundleHtml = '';
let bundleCss = '';
let someTag = {};

fs.readdir(__dirname, async (err, files) => {
  if(err){console.log(err);}
  await files.forEach( file => {
    if(file === 'template.html'){
      fs.readdir(path.join(__dirname,  'components'), (err, files) => {
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
          else{
            const readStream = fs.createReadStream(path.join(__dirname,'components', file));
            readStream.on('data', (chunk) => {
              someTag[file.split('.')[0]] =  chunk.toString();
            });
          }
        });
        const readStream = fs.createReadStream(path.join(__dirname, file));
        readStream.on('data', (chunk) => {
          let data = chunk.toString();
          data = data.replace('{{header}}',header);
          data = data.replace('{{articles}}', articles);
          data = data.replace('{{footer}}', footer);
          for(let key in someTag){
            data = data.replace(`{{${key}}}`, someTag[key]);
          }
          bundleHtml = data;
          fs.unlink(path.join(__dirname,'project-dist', 'index.html'), (err) => {
            if (err) {
              err;
            }
            fs.appendFile(
              path.join(__dirname,'project-dist', 'index.html'),
              bundleHtml,
              err => {
                if(err) throw err;
              }
            );
          });
          fs.unlink(path.join(__dirname,'project-dist', 'style.css'), (err) => {
            if (err) {
              err;
            }
            fs.appendFile(
              path.join(__dirname,'project-dist', 'style.css'),
              bundleCss,
              err => {
                if(err) throw err;
              }
            );
          });
        });
      });  
    }
    else if(file === 'assets'){
      fs.readdir(path.join(__dirname, file), (err, files) => {
        if(err){console.log(err);}
        files.forEach(nameFile => {
          fs.readdir(path.join(__dirname,file, nameFile), (err, files) => {
            if(err){console.log(err);}
            files.forEach(file => {
              if(path.extname(file) === '.woff2'){
                fs.copyFile(path.join(__dirname,'assets','fonts',`${file}`), 
                  path.join(__dirname,'project-dist','assets','fonts',`${file}`), (err) =>{
                    if(err){console.log(err);}
                  });
              }
              else if(path.extname(file) === '.svg'){
                fs.copyFile(path.join(__dirname,'assets','svg',`${file}`), 
                  path.join(__dirname,'project-dist','assets','svg',`${file}`), (err) =>{
                    if(err){console.log(err);}
                  });
              }
              else if(path.extname(file) === '.jpg'){
                fs.copyFile(path.join(__dirname,'assets','img',`${file}`), 
                  path.join(__dirname,'project-dist','assets','img',`${file}`), (err) =>{
                    if(err){console.log(err);}
                  });
              }
            });
          });
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
});