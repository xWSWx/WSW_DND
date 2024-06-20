const { exec } = require('child_process');
const https = require('https');

function startAspNetCoreServer() {
    return new Promise((resolve, reject) => {
        const serverProcess = exec('dotnet run --project AspNetCoreWebApi', (error, stdout, stderr) => {
            if (error) {
                reject(`Error starting ASP.NET Core server: ${error}`);
                return;
            }
            console.log(stdout);
            console.error(stderr);
        });

        // Check if the server is up and running
        const checkServer = () => {
            https.get('https://localhost:5000', (res) => {
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

startAspNetCoreServer()
    .then((serverProcess) => {
        console.log('ASP.NET Core server started successfully');
    })
    .catch((error) => {
        console.error(error);
    });
