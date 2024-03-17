 import { createWalletClient, custom, http, createPublicClient  } from 'viem';
import { syscoin } from 'viem/chains';
import { useState } from 'react'
import { aabi } from "../ABI/conAbi1";
import { FactoryContract, VendoWithdrawalContract } from "../AUTH/addresses";

import { data } from "../vendor/VendorList";

import { keccak256, solidityPacked } from 'ethers';
import { MerkleTree } from 'merkletreejs';
import { useEffect } from 'react';
import {  BrowserRouter as  Link } from 'react-router-dom';



function generateMerkleRoot(data) {
    // Construct leaves for the Merkle tree
    const leaves = data.map((item) => keccak256(solidityPacked(['address', 'uint256'], [item.address, item.amount])));

    // Create a Merkle tree
    const tree = new MerkleTree(leaves, keccak256, { sort: true });

    // Get the Merkle root
    const root = tree.getRoot().toString('hex');

    return root;
}


const merkleRoot = generateMerkleRoot(data);


//console.log(`0x${merkleRoot}`)



const publicClient = createPublicClient({
    chain: syscoin,
    transport: http()
});


const walletClient = createWalletClient({
    chain: syscoin,
    transport: custom(window.ethereum)
});

 
//Factory Contract address
const contractFactory = FactoryContract;

//Airdrop Contract 
const contractCheck = VendoWithdrawalContract;


//CHECK ADDRESS THAT HAS WITHDRAWN

async function mapClaimersResults(claimers) {
    
    const resultArray = await Promise.all(claimers.map(async (claimer) => {
        const result = await publicClient.readContract({
            address: contractCheck,
            abi: aabi,
            functionName: 'claimers',
            args: [claimer.address]
        });
        return { address: claimer.address, result };
    }));

    // Filter the result array to return only addresses with true result
    const addressesWithTrueResult = resultArray.filter(item => item.result === true);

    return addressesWithTrueResult;
}

// Usage
const claimers11 = await mapClaimersResults(data);

export default function Admin() {

    const [merkerootInput, setMerkerootInput] = useState('');
    const [createAirdrop, setCreateAirdrop] = useState('');


    const [data1, setData1] = useState(null); // Initialize data state to null


 
    async function getAddressOf() {
      const [addressa] = await walletClient.getAddresses();
      setData1(addressa); // Set addressa in state
    }
  
  //  console.log(data1);
  
    // Call getAddressOf when the component mounts
    useEffect(() => {
      getAddressOf();
    }, []);


    const handleDeploy = async () => {
        try {
            /////DEPLOY AIRDROP CONTRACT


            const createAirdrop = await walletClient.writeContract({
                account: data1,
                address: contractFactory,
                abi: aabi,
                functionName: 'updateRoot',
                args: [merkerootInput]

            });

            setCreateAirdrop(createAirdrop); // Set the createAirdrop value

            console.log("COntract deployed successfully:", createAirdrop);
            // Optionally, perform further actions after claiming the reward
        } catch (error) {
            console.error("Error claiming reward:", error);
            // Handle error, e.g., show error message to the user
        }


    };

    const [updateContractRoot, setupdateContractRoot] = useState('');


    const updateRoot = async () => {
        try {
            /////UPDATE CONTRACT ROOT


            const updateRoot = await walletClient.writeContract({
                account: data1,
                address: updateContractRoot,
                abi: aabi,
                functionName: 'updateRoot',
                args: [merkerootInput]

            });


            console.log("COntract Root updated successfully:", updateRoot);
            // Optionally, perform further actions after claiming the reward
        } catch (error) {
            console.error("Error claiming reward:", error);
            // Handle error, e.g., show error message to the user
        }


    };



    const handleInputChange = (event) => {
        setMerkerootInput(event.target.value);
    };


    const handleInputChangeContract = (event) => {
        setupdateContractRoot(event.target.value);
    };

    return (


        <div className='vendor' >

           

            <br></br>


            <div className="vendor1">
                <h4>List of Current addresses for withdrawal</h4>

                <h4>THis is the Merkle root for the list of Addresses below {`0x${merkleRoot}`}</h4>
                <div>
                    <ul>
                        {data.map((claimers, index) => (
                            <li key={index}>
                                <p>  {claimers.address}  </p>
                            </li>
                        ))}
                    </ul>

                </div>

                <h4>Contract for current claim <br></br> {VendoWithdrawalContract}</h4>
            </div>

            <br></br>
            <div className="vendor1">
                <h4>List of addresses that has claimed</h4>

                <div>
                    <ul>
                        {claimers11.map((claimers, index) => (
                            <li key={index}>
                                <p>  {claimers.address} {claimers.result}</p>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>


            <h4>Deploy new Claim Contract</h4>

            <input type="text" min="0" className='Input' placeholder='Enter merkle Root' onChange={handleInputChange} />

            <button className='button' onClick={handleDeploy}   >
                Deploy Claim Contract Copy
            </button>

            <br></br>

            <h5>Check transaction below after deployment</h5>
            {createAirdrop && (
                <a href={`https://explorer.syscoin.org/tx/${createAirdrop}`} target="_blank" rel="noopener noreferrer">
                    {createAirdrop}
                </a>
            )}

            <div className="vendor1">

                <h3>Update MerkleRoot for specific contract</h3>

                <input type="text" min="0" className='Input' placeholder='Enter contract to update' onChange={handleInputChangeContract} />


                <br></br>
                <br></br>
                <input type="text" min="0" className='Input' placeholder='Enter merkle Root for contract' onChange={handleInputChange} />

                <button className='button' onClick={updateRoot}   >
                    Update Contract MerkleRoot
                </button>
            </div>

        </div>
    )
}