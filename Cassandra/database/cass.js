const cassandra = require('cassandra-driver');
const util = require('util');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'] });

client.execute = util.promisify(client.execute);

