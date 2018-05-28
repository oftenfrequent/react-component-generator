import fs from 'fs';
import mkdirp from 'mkdirp';

export const checkIfSomethingExists = directoryOrFile => new Promise((res, rej) => {
  fs.exists(directoryOrFile, function (exists) {
    if(exists) res(true);
    res(false);
  });
});

export const createDirectory = directoryLocation => new Promise((res, rej) => {
  mkdirp(directoryLocation, function(err){
    if(err) {
      console.log(err)
      rej(err)
    } else res(true)
  });
});

