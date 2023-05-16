/* eslint-disable react/no-unescaped-entities */
'use client';

import { ethers } from 'ethers';
import { FormEvent, useState } from 'react';
import { abi } from '../abi/abi.js';

export default function Home() {
	const [walletConnected, setWalletConnected] = useState(false);
	const [currentAccount, setCurrentAccount] = useState('');
	const [userName, setUserName] = useState('');
	const [userAge, setUserAge] = useState(18);
	const [userOccupation, setUserOccupation] = useState('');

	const contractAddress = '0x5D9e633e9b0135eBe926BB8D3e6eDAb0e9bD8DcF';

	const connectWalletToApp = async () => {
		try {
			// MetaMask requires requesting permission to connect users accounts
			const provider = new ethers.providers.Web3Provider(window.ethereum);

			await provider.send('eth_requestAccounts', []);

			// The MetaMask plugin also allows signing transactions to
			// send ether and pay to change state within the blockchain.
			// For this, you need the account signer...
			const signer = provider.getSigner();
			const address = await signer.getAddress();

			setCurrentAccount(address);
			setWalletConnected(true);

			console.log(`connected with: ${address}`);
		} catch (error) {
			console.log(error);
		}
	};

	async function handleAddPerson(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			if (window.ethereum) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(contractAddress, abi, signer);

				console.log('adding person...');

				let tx = await contract.addPerson(userName, userAge, userOccupation);

				await tx.wait();

				setUserName('');
				setUserAge(18);
				setUserOccupation('');
				console.log('Person added!');
				console.log(await contract.allPeople(0));
			}
		} catch (error) {
			console.log(error);
		}
	}

	const disconnectWallet = () => {
		setCurrentAccount('');
		setWalletConnected(false);
	};

	const formatWalletAddress = (address: string) => {
		return address.slice(0, 5) + '...' + address.slice(address.length - 4);
	};

	return (
		<main className='flex flex-col items-center justify-between p-24'>
			<h1>DApp Refresher</h1>

			{walletConnected ? (
				<>
					<p className='mt-12 text-sky-400 text-lg font-bold'>
						connected with wallet: {formatWalletAddress(currentAccount)}
					</p>
					<button
						className='bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700'
						type='button'
						onClick={disconnectWallet}
					>
						disconnect MetaMask
					</button>
					<form className='flex flex-col mt-8' onSubmit={handleAddPerson}>
						<label htmlFor='user_name'>name:</label>
						<input
							type='text'
							name='user_name'
							value={userName}
							onChange={e => setUserName(e.target.value)}
							required
						/>
						<label htmlFor='user_age'>age:</label>
						<input
							type='number'
							name='user_name'
							value={userAge}
							min={18}
							max={99}
							onChange={e => setUserAge(Number(e.target.value))}
						/>
						<label htmlFor='user_occupation'>ocupation:</label>
						<input
							type='text'
							name='user_occupation'
							value={userOccupation}
							onChange={e => setUserOccupation(e.target.value)}
							required
						/>
						<button
							className='mt-4 py-4 bg-sky-700 hover:bg-sky-800 hover:rounded-xl ease-in duration-100'
							type='submit'
						>
							add person
						</button>
					</form>
				</>
			) : (
				<>
					<p className='mt-12 text-red-400 text-lg font-bold'>
						no wallets are connected
					</p>
					<button
						className='bg-green-700 px-4 py-2 rounded-xl hover:bg-green-600'
						type='button'
						onClick={connectWalletToApp}
					>
						connect MetaMask
					</button>
				</>
			)}
		</main>
	);
}
