const application = require('./app');
const https = require('https');
const http = require('http');
const fs = require('fs');
const config2 = require('./utils/config');
const logger3 = require('./utils/logger');

const options = {
	key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
	cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
};

http.createServer(application).listen(80);
const newServer = https.createServer(options, application);

newServer.listen(config2.PORT, () => {
	logger3.info(`Server running on port ${config2.PORT}`);
});