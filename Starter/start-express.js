const { exec } = require('child_process');
const https = require('https');

function startExpressServer() {
    return new Promise((resolve, reject) => {
        const serverProcess = exec('node server.js', { cwd: 'ExpressServer' }, (error, stdout, stderr) => {
            if (error) {
                reject(`Error starting Express server: ${error}`);
                return;
            }
            console.log(stdout);
            console.error(stderr);
        });

        // Check if the server is up and running
        const checkServer = () => {
            https.get('https://localhost:3000', (res) => {
                if (res.statusCode === 200) {
                    console.log('Express server is up and running');
                    resolve(serverProcess);
                } else {
                    setTimeout(checkServer, 500);
                }
            }).on('error', () => {
                setTimeout(checkServer, 500);
            });
        };

        checkServer();
    });
}
console.log('Hello from start-express.js');
startExpressServer()
    .then((serverProcess) => {
        console.log('Express server started successfully');
    })
    .catch((error) => {
        console.error(error);
    });
