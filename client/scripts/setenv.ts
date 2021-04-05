const { writeFile } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();

const environment = argv.environment;
const isProduction = environment === 'prod';

const environmentFolderPath = './src/environments';

// const targetPath = isProduction
//     ? `${environmentFolderPath}/environment.prod.ts`
//     : `${environmentFolderPath}/environment.ts`;

const targetPath = `${environmentFolderPath}/environment.ts`;

const environmentFileContent = `export const environment = {
    production: ${isProduction},
    USAEPAY_BASE_URL: '${process.env.USAEPAY_BASE_URL}',
    USAEPAY_API_KEY: '${process.env.USAEPAY_API_KEY}',
    USAEPAY_PUBLIC_API_KEY: '${process.env.USAEPAY_PUBLIC_API_KEY}',
    USAEPAY_API_PIN: '${process.env.USAEPAY_API_PIN}',
    SERVER_API_URL: '${process.env.SERVER_API_URL}',
    FAKE_STORE_API_URL: '${process.env.FAKE_STORE_API_URL}'
};
`;

writeFile(targetPath, environmentFileContent, (err: any) => {
    if (err) {
        console.error(err);
    }

    console.log(`Exported variables to ${targetPath}`);
});
