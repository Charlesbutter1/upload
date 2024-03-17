export const aabi =  [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_token",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_owner",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "_merkleRoot",
            "type": "bytes32"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Claim",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "bytes32[]",
            "name": "proof",
            "type": "bytes32[]"
          }
        ],
        "name": "claim",
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
        "name": "claimers",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "bytes32[]",
            "name": "proof",
            "type": "bytes32[]"
          }
        ],
        "name": "isValidLeaf",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "merkleRoot",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "protocolFallback",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "token",
        "outputs": [
          {
            "internalType": "contract IERC20",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_merkleRoot",
            "type": "bytes32"
          }
        ],
        "name": "updateRoot",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

 
     export const AirByte = "0x608060405234801561001057600080fd5b506040516106fd3803806106fd83398101604081905261002f91610082565b600080546001600160a01b039485166001600160a01b031991821617909155600191909155600280549290931691161790556100be565b80516001600160a01b038116811461007d57600080fd5b919050565b60008060006060848603121561009757600080fd5b6100a084610066565b92506100ae60208501610066565b9150604084015190509250925092565b610630806100cd6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806363c375d01161005b57806363c375d0146100f45780638da5cb5b14610107578063da62fba914610132578063fc0c546a1461015557600080fd5b806321ff99701461008d5780632eb4a7ab146100a25780633d13f874146100be578063564bec64146100d1575b600080fd5b6100a061009b3660046104c1565b610168565b005b6100ab60015481565b6040519081526020015b60405180910390f35b6100a06100cc3660046104f6565b610184565b6100e46100df3660046104f6565b61030a565b60405190151581526020016100b5565b6100a06101023660046104c1565b610398565b60025461011a906001600160a01b031681565b6040516001600160a01b0390911681526020016100b5565b6100e4610140366004610580565b60036020526000908152604090205460ff1681565b60005461011a906001600160a01b031681565b6002546001600160a01b0316331461017f57600080fd5b600155565b6001600160a01b03841660009081526003602052604090205460ff16156101e45760405162461bcd60e51b815260206004820152600f60248201526e185b1c9958591e4818db185a5b5959608a1b60448201526064015b60405180910390fd5b6101f08484848461030a565b61022e5760405162461bcd60e51b815260206004820152600f60248201526e1b9bdd081dda1a5d195b1a5cdd1959608a1b60448201526064016101db565b6001600160a01b03848116600081815260036020526040808220805460ff191660011790559054905163a9059cbb60e01b81526004810192909252602482018690529091169063a9059cbb906044016020604051808303816000875af115801561029c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102c0919061059b565b50836001600160a01b03167f47cee97cb7acd717b3c0aa1435d004cd5b3c8c57d70dbceb4e4458bbd60e39d4846040516102fc91815260200190565b60405180910390a250505050565b6040516bffffffffffffffffffffffff19606086901b16602082015260348101849052600090819060540160405160208183030381529060405280519060200120905061038e84848080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050600154915084905061042c565b9695505050505050565b6002546001600160a01b031633146103af57600080fd5b60005460025460405163a9059cbb60e01b81526001600160a01b0391821660048201526024810184905291169063a9059cbb906044016020604051808303816000875af1158015610404573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610428919061059b565b5050565b6000826104398584610442565b14949350505050565b600081815b84518110156104875761047382868381518110610466576104666105bd565b602002602001015161048f565b91508061047f816105d3565b915050610447565b509392505050565b60008183106104ab5760008281526020849052604090206104ba565b60008381526020839052604090205b9392505050565b6000602082840312156104d357600080fd5b5035919050565b80356001600160a01b03811681146104f157600080fd5b919050565b6000806000806060858703121561050c57600080fd5b610515856104da565b935060208501359250604085013567ffffffffffffffff8082111561053957600080fd5b818701915087601f83011261054d57600080fd5b81358181111561055c57600080fd5b8860208260051b850101111561057157600080fd5b95989497505060200194505050565b60006020828403121561059257600080fd5b6104ba826104da565b6000602082840312156105ad57600080fd5b815180151581146104ba57600080fd5b634e487b7160e01b600052603260045260246000fd5b6000600182016105f357634e487b7160e01b600052601160045260246000fd5b506001019056fea264697066735822122010e5c0cafa32e9c2451c5d3b812e2532c0e2af51d2590c34c1b091a2b48423c964736f6c63430008140033";