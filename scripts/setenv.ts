const { writeFile } = require('fs');
const { argv } = require('yargs');

require('dotenv').config({
    path: '../.envrc',
});

const environment = argv.environment;
const isProduction = environment === 'prod';

const environmentFolderPath = './src/environments';
const targetPath = isProduction
    ? `${environmentFolderPath}/environment.prod.ts`
    : `${environmentFolderPath}/environment.ts`;

const environmentFileContent = `export const environment = {
    production: ${isProduction},
    BASE_URl: '${process.env.BASE_URL}',
};
`;

writeFile(targetPath, environmentFileContent, (err: any) => {
    if (err) {
        console.error(err);
    }

    console.log(`Exported variables to ${targetPath}`);
});
