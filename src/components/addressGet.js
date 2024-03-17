import { createWalletClient, custom, http, createPublicClient } from 'viem';
import { syscoin } from 'viem/chains';


const publicClient = createPublicClient({
    chain: syscoin,
    transport: http()
});

const walletClient = createWalletClient({
    chain: syscoin,
    transport: custom(window.ethereum)
});

const addressaGet = await walletClient.getAddresses();


 async function getAddress() {
    try {
        const addressaGet = await walletClient.getAddresses();

        //   console.log(addressaGet);
    } catch (error) {
      //  console.error("Error getting addresses:", error);
     }
}

 getAddress();