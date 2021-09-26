const fse = require('fs-extra');
const path = require('path');

const root = process.cwd();
const typesPath = path.join(root, 'dist', 'src');
const typesTargetPath = path.join(root, 'dist', 'types');

async function main() {
   await fse.move(typesPath, typesTargetPath);
}
main();
