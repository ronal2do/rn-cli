const fs = require('fs');
const path = require('path');

module.exports = {
  exists: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  }
};