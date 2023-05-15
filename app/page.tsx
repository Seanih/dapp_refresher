/* eslint-disable react/no-unescaped-entities */
'use client';

import { ethers } from 'ethers';
import { useState } from 'react';

export default function Home() {
	const [walletConnected, setWalletConnected] = useState(false);
	const [currentAccount, setCurrentAccount] = useState('');

	const connectWalletToApp = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				console.log('please install MetaMask');
			}

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			setCurrentAccount(accounts[0]);
			setWalletConnected(true);

			console.log(`connected with: ${accounts[0]}`);
		} catch (error) {
			console.log(error);
		}
	};

	const disconnectWallet = () => {
		setCurrentAccount('');
		setWalletConnected(false);
	};

	const formatWalletAddress = (address: string) => {
		return address.slice(0, 5) + '...' + address.slice(address.length - 5);
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
