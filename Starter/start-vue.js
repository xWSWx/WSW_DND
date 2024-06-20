const { exec } = require('child_process');

function startVueClient() {
    return new Promise((resolve, reject) => {
        const clientProcess = exec('npm run serve', { cwd: 'path-to-your-vue-client' }, (error, stdout, stderr) => {
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

startVueClient()
    .then((clientProcess) => {
        console.log('Vue client started successfully');
    })
    .catch((error) => {
        console.error(error);
    });
