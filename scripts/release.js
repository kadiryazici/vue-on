const fse = require('fs-extra');
const path = require('path');
const execa = require('execa');
const { prompt } = require('enquirer');
const { version: currentVersion } = require('../package.json');

const root = process.cwd();
const typesPath = path.join(root, 'dist', 'src');
const typesTargetPath = path.join(root, 'dist', 'types');

/**
 *
 * @param {string} bin
 * @param {string[]} args
 * @param {execa.Options} opts
 */
const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts });

async function main() {
   await fse.move(typesPath, typesTargetPath);

   /**@type {string} */
   const targetVersion = (
      await prompt({
         type: 'input',
         name: 'version',
         message: 'Input custom version',
         initial: currentVersion
      })
   ).version;

   await updatePackage(targetVersion);
   await run('npm', ['publish', '--access="public"']);
}

/**
 * @param {string} newVersion
 */
async function updatePackage(newVersion) {
   const pkgPath = path.join(root, 'package.json');
   const pkgString = await fse.readFile(pkgPath, 'utf8');
   /**@type {import('../package.json')} */
   const pkg = JSON.parse(pkgString);

   pkg.version = newVersion;

   await fse.writeFile(pkgPath, JSON.stringify(pkg, null, 3));
}

main();
