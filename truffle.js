module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '5777',
    },
    rinkeby: {
      host: '127.0.0.1', // Connect to geth on the specified
      port: 8545,
      from: '0xb02ad07fa7363245eb628a6e73f2c7ed9ea43b01', // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388, // Gas limit used for deploys
    },
  },
};
