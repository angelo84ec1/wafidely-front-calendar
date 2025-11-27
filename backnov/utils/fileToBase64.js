const fs = require('fs').promises;
module.exports = {
    async toBase64(file) {
        return await fs.readFile(file.path, {encoding: 'base64'});
    }
}