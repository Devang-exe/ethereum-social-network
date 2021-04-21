// Contract containing posts on the social network

export const CONTRACT_ADDRESS = "0xf7cD57DDBf1770951aD783De8887876c94B06167";

export const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_postContent",
        "type": "string"
      }
    ],
    "name": "createPost",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_postId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_postContent",
        "type": "string"
      }
    ],
    "name": "modifyPost",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "postId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "content",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "author",
        "type": "address"
      }
    ],
    "name": "PostCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "postId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "oldContent",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newContent",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "author",
        "type": "address"
      }
    ],
    "name": "PostModified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "postId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "content",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "author",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "tipper",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tipAmount",
        "type": "uint256"
      }
    ],
    "name": "PostTipped",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_postId",
        "type": "uint256"
      }
    ],
    "name": "tipPost",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "postCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "posts",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "postId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "content",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "author",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tip",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];


// Contract containing profiles of different users

export const PROFILES_CONTRACT_ADDRESS = "";

export const PROFILES_CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_displayName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_day",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_month",
				"type": "uint8"
			},
			{
				"internalType": "uint16",
				"name": "_year",
				"type": "uint16"
			},
			{
				"internalType": "string",
				"name": "_gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_profession",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_about",
				"type": "string"
			}
		],
		"name": "setProfile",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "profiles",
		"outputs": [
			{
				"internalType": "string",
				"name": "displayName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "day",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "month",
						"type": "uint8"
					},
					{
						"internalType": "uint16",
						"name": "year",
						"type": "uint16"
					}
				],
				"internalType": "struct UsersProfileManager.Birthday",
				"name": "birthday",
				"type": "tuple"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "profession",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "about",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
