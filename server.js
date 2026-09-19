const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve all static assets from current directory
app.use(express.static(__dirname));

// Fallback to index.html for all requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
}

app.listen(PORT, '0.0.0.0', () => {
    const localIp = getLocalIp();
    console.log(`\n==================================================`);
    console.log(`Server running!`);
    console.log(`Local Access:   http://localhost:${PORT}`);
    console.log(`Wi-Fi Access:   http://${localIp}:${PORT}`);
    console.log(`==================================================\n`);
});

