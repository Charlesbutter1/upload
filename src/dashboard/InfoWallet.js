import React from 'react';
import '../App.css';
import { createWalletClient, custom, http, createPublicClient } from 'viem';
import { syscoin } from 'viem/chains';
import { StakeERC20 } from '../ABI/stakingERC20';
import { useState, useEffect } from 'react';
import { FourteenDaysstakingContractAddress, SevenDaysstakingContractAddress, SixtyDaysstakingContractAddress, V2STakeContractAddress, thirthyDaysstakingContractAddress } from '../AUTH/addresses';
import { Link } from 'react-router-dom';
import { V2StakeERC20 } from '../ABI/V2STake';
 
const publicClient = createPublicClient({
    chain: syscoin,
    transport: http()
});


const walletClient = createWalletClient({
    chain: syscoin,
    transport: custom(window.ethereum)
});



//Get and store address
const [addressa] = await walletClient.getAddresses();

//Store address in local storage 
//localStorage.setItem('addressa', addressa);

//const contract = V2StakeContractAdd;
const contract = SevenDaysstakingContractAddress;
const contract14 = FourteenDaysstakingContractAddress;
const contract30 = thirthyDaysstakingContractAddress;
const contract60 = SixtyDaysstakingContractAddress;
const contractV2 = V2STakeContractAddress;



function InfoWallet() {


    const [sevenData, setSevenData] = useState(null); // Initialize data state to null
    const [fourteenData, setFourteenData] = useState(null); // Initialize data state to null
    const [thirtyData, setThirtyData] = useState(null); // Initialize data state to null
    const [sixtyData, setSixtyData] = useState(null); // Initialize data state to null
    const [V2Data, setV2Data] = useState(null); // Initialize data state to null




    function formatNumber(value) {
        const stringValue = value.toString();
        const integerPart = stringValue.slice(0, -18) || '0'; // Get the integer part, default to '0' if empty
        const decimalPart = stringValue.slice(-18); // Get the decimal part

        // Insert commas for thousands separator in the integer part
        const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        // Concatenate the formatted integer part and the decimal part
        return formattedIntegerPart + '.' + decimalPart;
    }

    //Fetch Data for Seven Days
    useEffect(() => {
        async function fetchData() {
            try {

                //GET TOTAL STAKED TOKENS for 7 Days
                const getTotalStakedTokens = await publicClient.readContract({
                    account: addressa,
                    address: contract,
                    abi: StakeERC20,
                    functionName: 'getTotalStakedTokens',

                });

                const getUser = await publicClient.readContract({
                    account: addressa,
                    address: contract,
                    abi: StakeERC20,
                    functionName: 'getUser',
                    args: [addressa],
                });

                const getUserEstimatedRewards = await publicClient.readContract({
                    account: addressa,
                    address: contract,
                    abi: StakeERC20,
                    functionName: 'getUserEstimatedRewards',
                });

                // Convert the BigInt value to a regular number
                const rewards = Number(getUserEstimatedRewards);


                // Store the fetched data in the state value
                setSevenData({
                    getUser,
                    rewards,
                    getTotalStakedTokens,

                });

                //Fourteen Days Data
                const getTotalStakedTokens14 = await publicClient.readContract({
                    account: addressa,
                    address: contract14,
                    abi: StakeERC20,
                    functionName: 'getTotalStakedTokens',

                });

                const getUser14 = await publicClient.readContract({
                    account: addressa,
                    address: contract14,
                    abi: StakeERC20,
                    functionName: 'getUser',
                    args: [addressa],
                });


                const getUserEstimatedRewards14 = await publicClient.readContract({
                    account: addressa,
                    address: contract14,
                    abi: StakeERC20,
                    functionName: 'getUserEstimatedRewards',
                });

                // Convert the BigInt value to a regular number
                const rewards14 = Number(getUserEstimatedRewards);


                setFourteenData({
                    getUser14,
                    rewards14,
                    getTotalStakedTokens14,

                });

                //Thirty Days Data
                const getTotalStakedTokens30 = await publicClient.readContract({
                    account: addressa,
                    address: contract30,
                    abi: StakeERC20,
                    functionName: 'getTotalStakedTokens',

                });

                const getUser30 = await publicClient.readContract({
                    account: addressa,
                    address: contract30,
                    abi: StakeERC20,
                    functionName: 'getUser',
                    args: [addressa],
                });


                const getUserEstimatedRewards30 = await publicClient.readContract({
                    account: addressa,
                    address: contract30,
                    abi: StakeERC20,
                    functionName: 'getUserEstimatedRewards',
                });

                // Convert the BigInt value to a regular number
                const rewards30 = Number(getUserEstimatedRewards);


                setThirtyData({
                    getUser30,
                    rewards30,
                    getTotalStakedTokens30,

                });

                //Sixty Days Data
                const getTotalStakedTokens60 = await publicClient.readContract({
                    account: addressa,
                    address: contract60,
                    abi: StakeERC20,
                    functionName: 'getTotalStakedTokens',

                });

                const getUser60 = await publicClient.readContract({
                    account: addressa,
                    address: contract60,
                    abi: StakeERC20,
                    functionName: 'getUser',
                    args: [addressa],
                });


                const getUserEstimatedRewards60 = await publicClient.readContract({
                    account: addressa,
                    address: contract60,
                    abi: StakeERC20,
                    functionName: 'getUserEstimatedRewards',
                });

                // Convert the BigInt value to a regular number
                const rewards60 = Number(getUserEstimatedRewards);


                setSixtyData({
                    getUser60,
                    rewards60,
                    getTotalStakedTokens60,

                });

                //V2 Stake contract section 
                /////CHECK STAKE INFO
                const stakingTokenBalance = await publicClient.readContract({
                    account: addressa,
                    address: contractV2,
                    abi: V2StakeERC20,
                    functionName: 'stakingTokenBalance',

                });

                /////CHECK STAKE INFO
                const getRewardRatio = await publicClient.readContract({
                    account: addressa,
                    address: contractV2,
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
                    address: contractV2,
                    abi: V2StakeERC20,
                    functionName: 'getStakeInfo',
                    args: [addressa]

                });


                //_tokensStaked
                const StakeOne = formatNumber(getStakeInfo[0]);

                //_rewards
                const StakeTwo = formatNumber(getStakeInfo[1]);


                setV2Data({
                    StakeOne,
                    StakeTwo,
                    stakingTokenBalance,

                });

                console.log(getStakeInfo)


            } catch (error) {
                console.error(error);
            }
        }


        fetchData();
    }, []); // Run the effect only once on component mount

    if (sevenData, fourteenData, thirtyData, sixtyData, V2Data === null) {
        // Render a loading state while data is being fetched
        <br></br>
        return <div>Loading Stake Info...</div>;
    }

    //console.log(sixtyData)

    // Render the component with the fetched data
    return (
        <div className='vendor'>


            <div>
                <h3>Your current stake positions on DSYL--*--PSYS Pool</h3>

                <div>V2 Pool</div>

                <div className='psys'>
                    <h4>Total Staked Tokens: {V2Data.stakingTokenBalance.toLocaleString().slice(0, -24)} SYSL</h4>

                    <h4>Your staked Tokens: {V2Data.StakeOne.slice(0, -17)} SYSL</h4>
                    <h4>Available Reward: {V2Data.StakeTwo.toString().slice(0, -15)} PSYS </h4>


                </div>
                <div className='psys'>
                    <Link className='link' to="/stake">
                        <button className='button'>
                            Manage
                        </button>
                    </Link>
                </div>

            </div>


            <hr></hr>
            <div>
                <h3>Your current stake positions on SYS--*--SYSL Pool</h3>

                <div>Seven days</div>

                <div className='psys'>
                    <span> Total {sevenData.getTotalStakedTokens.toString().slice(0, -18)} SYSL Staked</span>
                    <span> Your total SYSL Staked = {sevenData.getUser.stakeAmount.toString()} SYSL</span>
                    <span> You have total {sevenData.rewardAmount} SYSL Reward</span>


                </div>
                <div className='psys'>

                    <Link className='link' to="/stake">
                        <button className='button'>
                            Manage
                        </button>
                    </Link>

                </div>

            </div>

            <hr></hr>

            <div>

                <div>Fourteen days</div>

                <div className='psys'>
                    <span> Total {fourteenData.getTotalStakedTokens14.toString().slice(0, -18)} SYSL Staked</span>
                    <span> Your total SYSL Staked = {fourteenData.getUser14.stakeAmount.toString()} SYSL</span>
                    <span> You have total {fourteenData.rewardAmount} SYSL Reward</span>


                </div>
                <div className='psys'>

                    <Link className='link' to="/stake">
                        <button className='button'>
                            Manage
                        </button>
                    </Link>

                </div>

            </div>

            <hr></hr>

            <div>

                <div>Thirty days</div>

                <div className='psys'>
                    <span> Total {thirtyData.getTotalStakedTokens30.toString().slice(0, -18)} SYSL Staked</span>
                    <span> Your total SYSL Staked = {thirtyData.getUser30.stakeAmount.toString()} SYSL</span>
                    <span> You have total {thirtyData.rewardAmount} SYSL Reward</span>


                </div>
                <div className='psys'>

                    <Link className='link' to="/stake">
                        <button className='button'>
                            Manage
                        </button>
                    </Link>

                </div>

            </div>

            <hr></hr>
            <div>

                <div>Sixty days</div>

                <div className='psys'>
                    <span> Total {sixtyData.getTotalStakedTokens60.toString().slice(0, -18)} SYSL Staked</span>
                    <span> Your total SYSL Staked = {sixtyData.getUser60.stakeAmount.toString().slice(0, -18)} SYSL</span>
                    <span> You have total {sixtyData.rewardAmount} SYSL Reward</span>


                </div>
                <div className='psys'>

                    <Link className='link' to="/stake">
                        <button className='button'>
                            Manage
                        </button>
                    </Link>

                </div>

            </div>

            <hr></hr>

        </div>
    );


}
export default InfoWallet;