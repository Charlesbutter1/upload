import '../App.css';
import { createWalletClient, custom, http, createPublicClient, writeContract, hexToBigInt } from 'viem';
import { syscoin } from 'viem/chains';
import { V2StakeERC20 } from '../ABI/V2STake';
import { V2STakeContractAddress } from '../AUTH/addresses';
import { useState, useEffect } from 'react'
import { SYSLERC20 } from '../ABI/SYSLERC20';
import { SYSLERC20Token } from '../AUTH/addresses';
import React from 'react';


const publicClient = createPublicClient({
  chain: syscoin,
  transport: http()
});


const walletClient = createWalletClient({
  chain: syscoin,
  transport: custom(window.ethereum)
});

//const contract = V2StakeContractAdd;
const contract = V2STakeContractAddress;




export default function StakingSYSLPSYS() {

  const [inputValue, setInputValue] = useState('');

  const [claimingSTake, setclaimingSTake] = useState(false);

  const [claimingUnSTake, setclaimingUnSTake] = useState(false);

  const [claimingReward, setclaimingReward] = useState(false);

  const [hashStake, setHashStake] = useState('')

  const [hashUnStake, setHashUnStake] = useState('')

  const [hashClaimReward, sethashClaimReward] = useState('')

  const [data, setData] = useState(null); // Initialize data state to null

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
 

  function formatNumber(value) {
    const stringValue = value.toString();
    const integerPart = stringValue.slice(0, -18) || '0';  
    const decimalPart = stringValue.slice(-18);  

    // Insert commas for thousands separator in the integer part
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');


    return formattedIntegerPart + '.' + decimalPart;
  }


  useEffect(() => {
    async function fetchData() {
      try {

        const [addressa] = await walletClient.getAddresses();


        /////CHECK STAKE INFO
        const stakingTokenBalance = await publicClient.readContract({
          account: addressa,
          address: contract,
          abi: V2StakeERC20,
          functionName: 'stakingTokenBalance',

        });

        /////CHECK STAKE INFO
        const getRewardRatio = await publicClient.readContract({
          account: addressa,
          address: contract,
          abi: V2StakeERC20,
          functionName: 'getRewardRatio',

        });

        const Numerator = parseFloat(getRewardRatio[0].toString());

        const Denominator = parseFloat(getRewardRatio[1].toString());

        // Calculate the ratio
        const ratio = (Numerator / Denominator) * 100; // Convert to BigInt




        /////CHECK STAKE INFO
        const getStakeInfo = await publicClient.readContract({
          account: addressa,
          address: contract,
          abi: V2StakeERC20,
          functionName: 'getStakeInfo',
          args: [addressa]

        });


        //_tokensStaked
        const StakeOne = formatNumber(getStakeInfo[0]);

        //_rewards
        const StakeTwo = formatNumber(getStakeInfo[1]);

 
        // Store the fetched data in the state
        setData({
          stakingTokenBalance,
          getStakeInfo,
          ratio,
          StakeOne, StakeTwo

         });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  // console.log(data)

  if (data === null) {
    // Render a loading state while data is being fetched
    return <div>Loading V2 Stake Info...</div>;
  }






  const handleStake = async () => {



    setclaimingSTake(true);

    try {


      ////Approve Tokens
      const approve = await walletClient.writeContract({
        account: data1,
        address: SYSLERC20Token,
        abi: SYSLERC20,
        functionName: 'approve',
        args: [contract, hexToBigInt(inputValue + "000000000000000000")],
      });

      let intervalId = setInterval(async () => {
        const count = await publicClient.getTransactionConfirmations({
          hash: approve
        });

        console.log(count);

        if (count > 0n) {
          clearInterval(intervalId);
          handleStake1();
        }
      }, 70000); // Check interval


    } catch (error) {
      // Show error message
      console.error("Error Staking:", error);
    }

    setclaimingSTake(false);
  };

  const handleStake1 = async () => {
    try {

      const addressa = await walletClient.getAddresses();

      ////Stake Tokens on successful approve
      const stake = await walletClient.writeContract({
        account: data1,
        address: contract,
        abi: V2StakeERC20,
        functionName: 'stake',
        args: [hexToBigInt(inputValue + "000000000000000000")],
      });

      setHashStake(stake);


    } catch (error) {
      console.error("Error claiming reward:", error);

    }
  };

  const handleUnStake = async () => {
    setclaimingUnSTake(true);

    try {

      const addressa = await walletClient.getAddresses();


      const withdraw = await walletClient.writeContract({
        account: data1,
        address: contract,
        abi: V2StakeERC20,
        functionName: 'withdraw',
        args: [hexToBigInt(inputValue + "000000000000000000")],
      });

      setHashUnStake(withdraw);


    } catch (error) {
      console.error("Error claiming reward:", error);

    }

    setclaimingUnSTake(false);

  };

  const ClaimReward = async () => {
    setclaimingReward(true);

    try {

      const addressa = await walletClient.getAddresses();

      ////Stake Tokens on successful approve
      const claimRewards = await walletClient.writeContract({
        account: data1,
        address: contract,
        abi: V2StakeERC20,
        functionName: 'claimRewards',
      });

      sethashClaimReward(claimRewards);


    } catch (error) {
      console.error("Error claiming reward:", error);

    }

    setclaimingReward(false);

  };



  const handleInputChange = (event) => {

    setInputValue(event.target.value);
  };



  return (
    <div className="vendor">

      <h3>  V2 STAKING SECTION</h3>

      <h4>Stake $SYSL, get $PSYS</h4>

      <div className='stakeInfo'>

        <h4>Total staked Tokens: {data.stakingTokenBalance.toLocaleString().slice(0, -24)} SYSL</h4>
        <h4>Stake APR: {data.ratio.toFixed() + "0"}%</h4>

        <h4>Your Total staked Tokens: {data.StakeOne.slice(0, -14)} SYSL</h4>
        <h4>Your Reward Amount: {data.StakeTwo.toString().slice(0, -14)} PSYS</h4>

      </div>

      <div className='stakeInfo'>


        <input type="number" min="0" className='Input' placeholder='Enter Amount' value={inputValue} onChange={handleInputChange} />

        <br></br>
        <button className='button' onClick={handleStake} > {claimingSTake ? 'Staking...' : 'Stake'}</button>
        <button className='button' onClick={handleUnStake}> {claimingUnSTake ? 'UnStaking...' : 'UnStake'}</button>
        <button className='button' onClick={ClaimReward}> {claimingReward ? 'Claiming Reward...' : 'Claim Reward'}</button>


      </div>
      <div>

        <br></br>

        {hashStake && (
          <a href={`https://explorer.syscoin.org/tx/${hashStake}`} target="_blank" rel="noopener noreferrer">
            https://explorer.syscoin.org/tx/{hashStake}
          </a>
        )}
      </div>
      <br></br>

      <div>
        {hashUnStake && (
          <a href={`https://explorer.syscoin.org/tx/${hashUnStake}`} target="_blank" rel="noopener noreferrer">
            https://explorer.syscoin.org/tx/{hashUnStake}
          </a>
        )}
        <br></br>
        {hashClaimReward && (
          <a href={`https://explorer.syscoin.org/tx/${hashClaimReward}`} target="_blank" rel="noopener noreferrer">
            https://explorer.syscoin.org/tx/{hashClaimReward}
          </a>
        )}
      </div>
    </div>

  )
};

