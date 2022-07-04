// * 3RD Approach - Using promises on fs/File System
const { readFile, writeFile } = require("fs").promises;

const doText = async () => {
  const first = await readFile("./content/first.txt", "utf8");
  const second = await readFile("./content/second.txt", "utf8");
  await writeFile(
    "./content/result-mind-grenade.txt",
    `DAMN THAT WAS... okay?`
  );
  console.log(first, second);
};

doText();

// * 2ND Approach - Using util.promisify and async await
// const { readFile, writeFile } = require("fs");
// const util = require("util");
// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);

// const doText = async () => {
//   const first = await readFilePromise("./content/first.txt", "utf8");
//   const second = await readFilePromise("./content/second.txt", "utf8");
//   await writeFilePromise(
//     "./content/result-mind-grenade.txt",
//     `THIS IS AWESOME INDEED: ${first} - ${second}`,
//     { flag: "a" }
//   );
//   console.log(first, second);
// };

// doText();

// * 1ST Approach - Using Promise.then()
// const { readFile } = require("fs");

// const getText = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, "utf8", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// getText("./content/first.txt")
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));
