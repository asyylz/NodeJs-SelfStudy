const fs = require('fs');

// reading a text file
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

// writing text file
const textOut = `This is what we know about the avacado:${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');
