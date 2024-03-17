import { createWalletClient, custom, http, createPublicClient, writeContract } from 'viem';
import { syscoin } from 'viem/chains';
import { FactoryAbI } from '../ABI/factoryABI';
import React, { useState, useEffect } from 'react';
import Admin from './admin';

// Assuming these are already defined in your code
const publicClient = createPublicClient({
    chain: syscoin,
    transport: http()
});


const walletClient = createWalletClient({
    chain: syscoin,
    transport: custom(window.ethereum)
  });

  
const [addressa] = await walletClient.getAddresses();

const contractFactory = "0x89CaC08fF462C991bc2f05608Bc692C946Cc1041";

const CheckAdmin = () => {
    const [owner, setOwner] = useState(null);

    useEffect(() => {
        const checkOwner = async () => {
            try {
                // Read contract owner
                const ownerResult = await publicClient.readContract({
                    account: addressa,
                    address: contractFactory,
                    abi: FactoryAbI,
                    functionName: 'owner',
                });

                setOwner(ownerResult); // Set the owner value
            } catch (error) {
                console.error("Error fetching owner:", error);
                // Handle error, e.g., show error message to the user
            }
        };

        checkOwner(); // Call the function to check owner on component mount
    }, [addressa]); // Make sure to include addressa in the dependency array

    return (
        <div className='check-admin'>
            {owner === addressa && <Admin/>} {/* Render Admin component if owner matches addressa */}
        </div>
    );
};

export default CheckAdmin;


