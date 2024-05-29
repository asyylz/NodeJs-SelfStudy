const fs = require('fs');
const http = require('http');
const url = require('url');
/* ------------------------ FILES ----------------------- */

// // reading a text file, blocking synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// // writing text file
// const textOut = `This is what we know about the avacado:${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// //reading file async, non-blocking asynchronous way
// const textOutput2 = fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
//   console.log('second data async:', data);
// });
// console.log('Reading file...!');

// // reading file async, non-blocking asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('ERROR! 💥');
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('Your file is written 😅');
//       });
//     });
//   });
// });

/* ----------------------- SERVER ----------------------- */
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the overview');
  } else if (pathName === '/product') {
    res.end('This is the product');
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not found</h1>');
  }
});
server.listen(8000, '127.0.0.1', () =>
  console.log('Listening to requests on port 8000.')
);
