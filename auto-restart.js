const { exec } = require('child_process');

function restartService(serviceName) {
    if (!serviceName) {
        console.error('No service name provided');
        return;
    }
    exec(`sudo systemctl restart ${serviceName}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error restarting the service: ${error}`);
            return;
        }
        console.log(`Service restarted successfully: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

module.exports = restartService;
