export const abi = [
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'string',
				name: '_name',
				type: 'string',
			},
			{
				indexed: true,
				internalType: 'uint8',
				name: '_age',
				type: 'uint8',
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: '_timeAdded',
				type: 'uint256',
			},
		],
		name: 'PersonAdded',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_name',
				type: 'string',
			},
			{
				internalType: 'uint8',
				name: '_age',
				type: 'uint8',
			},
			{
				internalType: 'string',
				name: '_occupation',
				type: 'string',
			},
		],
		name: 'addPerson',
		outputs: [
			{
				internalType: 'bool',
				name: 'success',
				type: 'bool',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'allPeople',
		outputs: [
			{
				internalType: 'string',
				name: 'name',
				type: 'string',
			},
			{
				internalType: 'uint8',
				name: 'age',
				type: 'uint8',
			},
			{
				internalType: 'string',
				name: 'occupation',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
];
