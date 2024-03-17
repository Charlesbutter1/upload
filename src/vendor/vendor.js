
import '../App.css';
import { createWalletClient, custom, http, createPublicClient, writeContract } from 'viem';
import { aabi } from '../ABI/conAbi1';
import { syscoin } from 'viem/chains';
import { useState } from 'react'
import { VendoWithdrawalContract } from '../AUTH/addresses';
import { matchedAddress, matchedAmount } from './vendorVerify';
import { keccak256, solidityPacked } from 'ethers';
import { MerkleTree } from 'merkletreejs';
//import { toBuffer } from 'ethereumjs-util';
import { data } from './VendorList';


//  //Use the exported value from the Vendor verify section to generate leaf
//  //Then we store the leaf in Local Storage at first
//
//function generateMerkleProof(data, address, amount) {
//  // Construct leaves for the Merkle tree
//  const leaves = data.map((item) => {
//    const leaf = keccak256(solidityPacked(['address', 'uint256'], [item.address, item.amount]));
//    return toBuffer(leaf);
//  });
//
//  // Convert the target leaf to a buffer
//  const targetLeaf = keccak256(solidityPacked(['address', 'uint256'], [address, amount]));
//  const targetLeafBuffer = toBuffer(targetLeaf);
//
//  // Create a Merkle tree
//  const tree = new MerkleTree(leaves, keccak256, { sort: true });
//
//  // Generate the Merkle proof
//  const proof = tree.getHexProof(targetLeafBuffer);
//
//  return proof;
//}
//
//
////// Example usage:
//const addressToProve = matchedAddress;
//const amountToProve = matchedAmount;
////
//const proofss = generateMerkleProof(data, addressToProve, amountToProve);
////console.log('Merkle Proof:', proofss);



//const rpc = "wss://rpc.syscoin.org/wss";


//const account = privateKeyToAccount('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e')


const publicClient = createPublicClient({
  chain: syscoin,
  transport: http()
});


const client = createWalletClient({
  chain: syscoin,
  transport: custom(window.ethereum)
});

//Get and store address

 
const contract = VendoWithdrawalContract;

////CHECK CONTRACT OWNER
//const owner = await publicClient.readContract({
//  account: addressa,
//  address: contract,
//  abi: aabi,
//  functionName: 'owner'
//
//});
//


const proof = ["0x8e8ff444fc25ecda16f7216cfaeee5fd0c04772286b1b5fa8f887da3d34dd747", "0x2a2ff37b0f6b81ad94d473848536282d9cfc53cbb9d80ef25e455044dbb6988d", "0x798149a7af800cc1182fe533d86e466c0166c24c9f8544e9142f4bed5880e85b"]
const proof1 = ["0xdfaef60ff83deb44f2e370d2159aff5cc0baf8f29eb06ab6d2e2f2a266b549cc", "0x8537e05587c79be9b202fcfe087f3a07b84af1634d09d549f7176a6ccdde568e"]
const storedProof = ["0xdfaef60ff83deb44f2e370d2159aff5cc0baf8f29eb06ab6d2e2f2a266b549cc", "0x8537e05587c79be9b202fcfe087f3a07b84af1634d09d549f7176a6ccdde568e"]




export  function Vendor() {

  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState(null);
  const [hash, setHash] = useState('')


  //CHECK IF ADDRESS IS ELIGIBLE

  const [canClaim, setCanClaim] = useState(Boolean);
  const [errorCanClaim, setErrorCanClaim] = useState(Boolean);

  const stakeStatusMessage = canClaim ? "Eligible to claim" : "Your are not Eligible to claim";


  
const handleCheckClaim = async () => {
  try {

    const [addressa] = await client.getAddresses();


    const eligible = await publicClient.readContract({
      address: contract,
      abi: aabi,
      functionName: 'isValidLeaf',
      args: [addressa, 300n, proof1]
    });

    setCanClaim(eligible); // Reset claim state

    console.log(`Can Claim?: ${eligible}`)

    // Handle result if needed
  } catch (error) {
    setErrorCanClaim(error.message || 'An unknown error occurred');
  }
};
//console.log(`This is the contract deployer address ${owner}`)




  const handleClaim = async () => {
    setClaiming(true);
    setError(null); // Reset error state

    try {

      const [addressa] = await client.getAddresses();


      const result = await client.writeContract({
        account: addressa,
        address: contract,
        abi: aabi,
        functionName: 'claim',
        args: [addressa, 300n, proof1]
      });

      setHash(result)

      console.log(`This is the transaction hash: ${result}`)
      // Handle result if needed
    } catch (error) {

      setError(error.message || 'An unknown error occurred');
    }

    setClaiming(false);
  };


  return (
    <div className='vendor' >

      <div>
        <h4>Vendor Section</h4>


        <h5>Eligible to claim?  {stakeStatusMessage}</h5>

      </div>

      <h4> Claim your {matchedAmount} SYSL valued at {'$20'}</h4>

      <button className='button' onClick={handleClaim}  >
        {claiming ? 'Claiming...' : 'Claim'} 💰
      </button>

      <br></br>
      <h5>Check transaction below after Claiming ⤵️⤵️</h5>
      {hash && (
        <a href={`https://explorer.syscoin.org/tx/${hash}`} target="_blank" rel="noopener noreferrer">
          {hash}
        </a>
      )}    </div>
  );
}

export default Vendor;
