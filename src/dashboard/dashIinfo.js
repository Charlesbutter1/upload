import React from 'react';
import '../App.css';
import { matchedAmount } from '../vendor/vendorVerify';
import { Link } from 'react-router-dom';
import InfoWallet from './InfoWallet';
import StakingSYSLPSYS, { StakeBalance, StakeTwoShow } from '../Staking/PSYS';




const VendorAmount = matchedAmount;

//console.log(StakeOneShow)
//console.log(StakeTwoShow)

export default function Dashboard() {




    return (

        <div >
            <div className='vendor'>
                <h4>Simple Menus</h4>

                <div>
                    <Link className='link' to="/">
                        <button className='button'>
                            Home
                        </button>
                    </Link>
                    <Link className='link' to="/stake">
                        <button className='button'>
                            Stake
                        </button>
                    </Link>
                    <Link className='link' to="/NFT">
                        <button className='button'>
                            NFT
                        </button>
                    </Link>


                </div>
            </div>
            <hr />

            <br></br>
            <div className='vendor'>

                {VendorAmount !== undefined && VendorAmount !== null ? (
                    <div className='vendor1'>
                        <h3>Vendor Withdrawal Section</h3>
                        <h4>You have {VendorAmount} SYSL worth {"$"} Pending Store Claim</h4>
                        <Link className='link' to="/vendor">
                            <button className='button'>
                                Claim
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className='vendor1'>
                        <h2>Airdrop</h2>


                        <h4>You don't have any pending withdrawal</h4>
                    </div>
                )}


            </div>

<br></br>
            <div>

                <InfoWallet />
            </div>

        </div>

    )
}