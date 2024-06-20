const { exec } = require('child_process');
const http = require('http');

function startExpressServer() {
    return new Promise((resolve, reject) => {
        const serverProcess = exec('node start-express.js', (error, stdout, stderr) => {
            if (error) {
                reject(`Error starting Express server: ${error}`);
                return;
            }
            console.log(stdout);
            console.error(stderr);
        });

        // Check if the server is up and running
        const checkServer = () => {
            http.get('http://localhost:3000', (res) => {
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

function startAspNetCoreServer() {
    return new Promise((resolve, reject) => {
        const serverProcess = exec('node start-aspnetcore.js', (error, stdout, stderr) => {
            if (error) {
                reject(`Error starting ASP.NET Core server: ${error}`);
                return;
            }
            console.log(stdout);
            console.error(stderr);
        });

        // Check if the server is up and running
        const checkServer = () => {
            http.get('http://localhost:5000', (res) => {
                if (res.statusCode === 200) {
                    console.log('ASP.NET Core server is up and running');
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

function startVueClient() {
    return new Promise((resolve, reject) => {
        const clientProcess = exec('node start-vue.js', (error, stdout, stderr) => {
            if (error) {
                reject(`Error starting Vue client: ${error}`);
                return;
            }
            console.log(stdout);
            console.error(stderr);
        });

        resolve(clientProcess);
    });
}

startExpressServer()
    .then(() => {
        return startAspNetCoreServer();
    })
    .then(() => {
        return startVueClient();
    })
    .catch((error) => {
        console.error(error);
    });
