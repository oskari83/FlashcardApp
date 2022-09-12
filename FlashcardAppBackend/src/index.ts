const application = require('./app');
const http = require('http');
const config2 = require('./utils/config');
const logger3 = require('./utils/logger');

const server = http.createServer(application);

server.listen(config2.PORT, () => {
	logger3.info(`Server running on port ${config2.PORT}`);
});