import { createWalletClient, custom } from 'viem';
import { syscoin } from 'viem/chains';
import React, { useState, useEffect } from 'react';
import Vendor from './vendor';
import { data } from './VendorList';


// Assuming these are already defined in your code
//const publicClient = createPublicClient({
//    chain: syscoin,
//    transport: http()
//});
//

const walletClient = createWalletClient({
    chain: syscoin,
    transport: custom(window.ethereum)
});


const [addressa] = await walletClient.getAddresses();



const dataM = data

const matchingAddress = dataM.find(item => item.address === addressa);

//Check matching Address data
export const matchedAddress = matchingAddress ? matchingAddress.address : null;
export const matchedAmount = matchingAddress ? matchingAddress.amount : null;


const CheckVendor = () => {
    const [addressa, setAddressa] = useState('');
    const [matchFound, setMatchFound] = useState(false);

    useEffect(() => {
        const fetchAddress = async () => {



            try {
                const [address] = await walletClient.getAddresses();
                setAddressa(address);
            } catch (error) {
                console.error("Error fetching address:", error);
                // Handle error, e.g., show error message to the user
            }
        };

        fetchAddress();
    }, []);

    useEffect(() => {
        // Check if addressa matches any address in data
        const isMatch = data.some(item => item.address === addressa);
        setMatchFound(isMatch);
    }, [addressa]);


    return (
        <div className='vendor2'>
            {matchFound ? <Vendor /> :
                <p>            <span>Vendor CLaim Section</span>
                    You dont have any pending withdrawals <span> Start out by creating a vendor account at the  --

                        <a href={`https://store.syslinkdao.com`} target="_blank" rel="noopener noreferrer">
                            SYSLink Marketplace
                        </a>
                    </span></p>}



        </div>
    );
};

export default CheckVendor;