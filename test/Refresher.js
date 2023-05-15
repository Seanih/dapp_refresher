const {
	loadFixture,
	time,
} = require('@nomicfoundation/hardhat-network-helpers');
const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Refresher', function () {
	async function deploytContractFixture() {
		const [owner, user2, user3] = await ethers.getSigners();

		const Refresher = await ethers.getContractFactory('Refresher');
		const contract = await Refresher.deploy();
		await contract.deployed();

		return { owner, user2, user3, contract };
	}

	describe('Success', function () {
		it('Should deploy contract', async function () {
			const { owner, contract } = await loadFixture(deploytContractFixture);

			expect(await contract.owner()).to.equal(owner.address);
		});

		it("Should add people to 'allPeople' array", async function () {
			const { contract } = await loadFixture(deploytContractFixture);

			await contract.addPerson('Sean', 35, 'Software Engineer');
			await contract.addPerson('Bimboo', 36, 'Officer');
			const data1 = await contract.allPeople(0);
			const data2 = await contract.allPeople(1);

			expect(data1.name).to.equal('Sean');
			expect(data1.age).to.equal(35);
			expect(data1.occupation).to.equal('Software Engineer');

			expect(data2.name).to.equal('Bimboo');
			expect(data2.age).to.equal(36);
			expect(data2.occupation).to.equal('Officer');
		});

		it("Should emit 'PersonAdded' event", async function () {
			const { contract } = await loadFixture(deploytContractFixture);

			await expect(contract.addPerson('Sean', 35, 'Software Engineer'))
				.to.emit(contract, 'PersonAdded')
				.withArgs('Sean', 35, ((await time.latest()) + 1).toString());
		});
	});

	describe('Failure', function () {
		it('Rejects invalid submissions & gives user appropriate message', async function () {
			const { contract } = await loadFixture(deploytContractFixture);

			await expect(contract.addPerson('', 35, 'Programmer')).to.revertedWith(
				"name can't be blank"
			);

			await expect(
				contract.addPerson('Sean', 17, 'Programmer')
			).to.revertedWith('must be at least 18');

			await expect(contract.addPerson('Bimboo', 36, '')).to.revertedWith(
				"occupation can't be blank"
			);
		});
	});
});
