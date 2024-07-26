const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const certPath = path.join(__dirname, 'cert.pem');
const keyPath = path.join(__dirname, 'key.pem');

if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
    execSync(`openssl req -x509 -newkey rsa:4096 -keyout ${keyPath} -out ${certPath} -days 365 -nodes -subj "/CN=localhost" > /dev/null 2>&1`);
}

process.env.SSL_CERT_PATH = certPath;
process.env.SSL_KEY_PATH = keyPath;

try {
    execSync('node --openssl-legacy-provider ./node_modules/.bin/webpack-dev-server --config webpack/webpack.dev.js', { stdio: 'inherit' });
} catch (error) {
    console.error(error);
    process.exit(1);
}