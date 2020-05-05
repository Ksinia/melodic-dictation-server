const { exec } = require("child_process");

module.exports = async function (filepath) {
  return new Promise((resolve) => {
    exec(`midi2abc ${filepath}`, (_, stdout) => {
      resolve(stdout);
    });
  });
};
