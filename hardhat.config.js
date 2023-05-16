require('@nomicfoundation/hardhat-toolbox');
// provides access to .env variables in the config files
require('dotenv').config({ path: __dirname + '/.env.local' });

const ALCHEMY_SEPOLIA_NODE = process.env.ALCHEMY_SEPOLIA_NODE;
const METAMASK_PK = process.env.METAMASK_PK;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.18',
	networks: {
		sepolia: {
			url: ALCHEMY_SEPOLIA_NODE,
			accounts: [METAMASK_PK],
		},
	},
};
