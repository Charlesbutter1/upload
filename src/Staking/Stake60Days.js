import React from 'react';
import '../App.css';
import { createWalletClient, custom, http, createPublicClient } from 'viem';
import { syscoin } from 'viem/chains';
import { StakeERC20 } from '../ABI/stakingERC20';
import { useState, useEffect } from 'react'
import { hexToBigInt } from 'viem';
import { SixtyDaysstakingContractAddress } from '../AUTH/addresses';


const publicClient = createPublicClient({
  chain: syscoin,
  transport: http()
});


const walletClient = createWalletClient({
  chain: syscoin,
  transport: custom(window.ethereum)
});


//const contract = V2StakeContractAdd;
const contract = SixtyDaysstakingContractAddress;



function Stake60Dyas() {


  const [claimingSTake, setclaimingSTake] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const handleStake = async () => {
    setclaimingSTake(true);
    try {



      //Get and store address
      const [addressa] = await walletClient.getAddresses();

      const stake = await walletClient.writeContract({
        account: addressa,
        address: contract,
        abi: StakeERC20,
        functionName: 'stake',
        args: [hexToBigInt(inputValue + "000000000000000000")]
      });

      console.log("Reward claimed successfully:", stake);
      //show err
    } catch (error) {
      console.error("Error claiming reward:", error);
//show err
    }

    setclaimingSTake(false);

  };

  const [claimingUnSTake, setclaimingUnSTake] = useState(false);

  const handleUnStake = async () => {
    setclaimingUnSTake(true);
    try {



      //Get and store address
      const [addressa] = await walletClient.getAddresses();

      const UnsStake = await walletClient.writeContract({
        account: addressa,
        address: contract,
        abi: StakeERC20,
        functionName: 'unstake',
        args: [hexToBigInt(inputValue + "000000000000000000")]
      });

      console.log("Reward claimed successfully:", UnsStake);
      //show err
    } catch (error) {
      console.error("Error claiming reward:", error);
//show err
    }

    setclaimingUnSTake(false);

  };


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [data, setData] = useState(null); // Initialize data state to null


  const [claiming, setClaiming] = useState(false);

  //Check if stake has ended to display on frontend


  const handleClaimReward = async () => {
    setClaiming(true);
    try {



      //Get and store address
      const [addressa] = await walletClient.getAddresses();

      const claimRewardResult = await walletClient.writeContract({
        account: addressa,
        address: contract,
        abi: StakeERC20,
        functionName: 'claimReward',
      });

      console.log("Reward claimed successfully:", claimRewardResult);
      //show err
    } catch (error) {
      console.error("Error claiming reward:", error);
//show err
    }

    setClaiming(false);

  };

  useEffect(() => {
    async function fetchData() {
      try {



        //Get and store address
        const [addressa] = await walletClient.getAddresses();

 
        const earlyUnstakeFee = await publicClient.readContract({
          account: addressa,
          address: contract,
          abi: StakeERC20,
          functionName: 'getEarlyUnstakeFeePercentage',
        });

        // Fetch other required data...

        const getMinimumStakingAmount = await publicClient.readContract({
          account: addressa,
          address: contract,
          abi: StakeERC20,
          functionName: 'getMinimumStakingAmount',
        });

        // Convert BigInt to a regular number
        const feeValue = Number(earlyUnstakeFee);

        // Multiply the value by 100
        const multipliedValue = feeValue / 100;



        //GET TOTAL STAKED TOKENS
        const getTotalStakedTokens = await publicClient.readContract({
          account: addressa,
          address: contract,
          abi: StakeERC20,
          functionName: 'getTotalStakedTokens',

        });

        //export const getTotalStakedFront = getTotalStakedTokens;

        //GET TOTAL STAKER
        const getTotalUsers = await publicClient.readContract({
          account: addressa,
          address: contract,
          abi: StakeERC20,
          functionName: 'getTotalUsers',

        });



        //GET MINIMUM STAKING AMOUNT
        const getMaxStakingTokenLimit = await publicClient.readContract({
          account: addressa,
          address: contract,
          abi: StakeERC20,
          functionName: 'getMaxStakingTokenLimit',

        });
        const getUser = await publicClient.readContract({
          account: addressa,
          address: contract,
          abi: StakeERC20,
          functionName: 'getUser',
          args: [addressa],
        });

        // Fetch other required data...

        const getStakeDays = await publicClient.readContract({
          account: addressa,
          address: contract,
          abi: StakeERC20,
          functionName: 'getStakeDays',

        });

//show err
        // Convert the value to a regular number 
        const daysInSeconds = Number(getStakeDays);

        // Convert seconds to days (1 day = 24 * 60 * 60 seconds)
        const days = daysInSeconds / (24 * 60 * 60);


        // Fetch other required data...

        const getUserEstimatedRewards = await publicClient.readContract({
          account: addressa,
          address: contract,
          abi: StakeERC20,
          functionName: 'getUserEstimatedRewards',
        });

        // Convert the BigInt value to a regular number
        const rewards = Number(getUserEstimatedRewards);

        // Fetch other required data...

        const stakeEndDate_ = await publicClient.readContract({
          account: addressa,
          address: contract,
          abi: StakeERC20,
          functionName: 'getStakeEndDate',
        });

        // Convert the stake end date value to a regular number (assuming it's a BigInt)
        const endDateValue = Number(stakeEndDate_);

        // Get the current time in milliseconds
        const currentTime = Date.now();

        const stakeStatusMessage = endDateValue < currentTime ? "Stake has ended" : "Stake is still active";

        // Store the fetched data in the state
        setData({
          earlyUnstakeFee,
           getUser,
          rewards,
          getMaxStakingTokenLimit,
          getMinimumStakingAmount,
          getTotalStakedTokens,
          multipliedValue,
          currentTime,
          endDateValue,
          days,
          getTotalUsers, stakeStatusMessage
          // Include other data in the object...
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []); // Run the effect only once on component mount

  if (data === null) {
    // Render a loading state while data is being fetched
    return <div>Loading V1 30 Days Stake Info...</div>;
  }

  // Render the component with the fetched data
  return (
    <div className='vendor'>


      <h3>  V1 STAKING SECTION {data.days.toString()} Days</h3>

      <h4>Stake SYSL to get {data.multipliedValue.toString()}% Reward in  {data.days.toString()} Days</h4>

      <div className='stakeInfo'>

        <h5> Lock period: {data.days.toString()} Days  </h5>
        <h5> Early unstake fee:  {data.multipliedValue.toString()}% </h5>
        <h5> Minimum Staking Amount: {data.getMinimumStakingAmount.toLocaleString().slice(0, -24)}  </h5>
        <h5> Maximum Staking Amount: {data.getMaxStakingTokenLimit.toLocaleString().slice(0, -24)}   </h5>
        <h5> Status: {data.stakeStatusMessage} </h5>
        <h5> Total No. of Stakers: {data.getTotalUsers.toString()}  </h5>


        <h5> Your current Estimated reward Amount: {data.rewards} SYSL  </h5>
        <h5> Total staked tokens: {data.getTotalStakedTokens.toString().slice(0, -18)} SYSL  </h5>
        <h5> Your total staked tokens: {data.getUser.stakeAmount.toLocaleString().slice(0, -24)} SYSL  </h5>
        <h5> Your current Estimated reward Amount: {data.rewards} SYSL  </h5>


      </div>

      <div className='stakeInfo'>

        <input type="number" min="0" className='Input' placeholder='Enter Amount' value={inputValue} onChange={handleInputChange} />

        <br></br>

        <button className='button' onClick={handleStake} disabled={data.stakeStatusMessage === "Stake has ended" || claimingSTake}> {claimingSTake ? 'Staking...' : 'Stake'}</button>
        <button className='button' onClick={handleUnStake}>  {claimingUnSTake ? 'Unstaking...' : 'Unstake'}</button>
        <button className='button' onClick={handleClaimReward}>  {claiming ? 'Claiming...' : 'Claim Reward'}</button>
        <br></br>
        <br></br>

        <span>Once staked, you will earn SYSL for the period you choose.
          You can unstack Token before epoch end date but there will be a fee of up to {data.multipliedValue.toString()}%.
          <br></br>
          <br></br>
          *APY is dynamic.</span>
      </div>

    </div>
  );
}

export default Stake60Dyas;