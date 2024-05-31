const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file sorry:(');
      resolve(data);
    });
  });
};

const writeFilepro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file!');
      resolve('success');
    });
  });
};

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilepro('dog.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//asycn.await version

const getDocPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`breed: ${data}`);
    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body.message);
    await writeFilepro('dog.txt', res.body.message);
    console.log('Rondom dog image saved to file!');
  } catch (err) {
    //console.log(err);
    throw err;
  }
  return '2: READY';
};

(async () => {
  try {
    console.log('1:will get dog pics!');
    const x = await getDocPic();
    console.log(x);
    console.log('3:will get dog pics!');
  } catch (err) {
    console.log('Error :(');
  }
})();

// console.log('1: Will get dog pics!');
// getDocPic()
//   .then((x) => {
//     console.log('asiye', x);
//     console.log('3: Done getting dog pics!');
//   })
//   .catch((err) => {
//     console.log('Error');
//   });
