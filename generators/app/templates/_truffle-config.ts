import { toGwei } from './utils';

const defaults = {
  gas: 3000000,
  gasPrice: toGwei(10),
  host: 'localhost',
  port: 8545
};

export = {
  networks: {
    dev: {
      ...defaults,
      network_id: '*',
      port: 9545
    },
    rinkeby: {
      ...defaults,
      network_id: '4'
    }
  },
  test_file_extension_regexp: '\\/test\\/(?!jquery|require).*\\.js$'
};
