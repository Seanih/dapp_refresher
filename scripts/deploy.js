// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require('hardhat');

async function main() {
	const owner = await ethers.getSigner();
	const Refresher = await ethers.getContractFactory('Refresher');
	const contract = await Refresher.deploy();

	await contract.deployed();

	let tx = await contract.addPerson('Sean Anih', 35, 'Software Engineer');
	await tx.wait();

	console.log(
		`Contract was deployed to address: ${
			contract.address
		}\nAddress that deployed contract: ${
			owner.address
		}\nAddress listed as "owner" in contract: ${await contract.owner()}`
	);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
