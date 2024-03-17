import './App.css';

import CheckAdmin from './Admin/AdminVerify';
import CheckVendor from './vendor/vendorVerify';
import Dashboard from './dashboard/dashIinfo';
import StakingSection from './Staking/stakesection';
import React from 'react';
//import { createWalletClient, custom } from 'viem';
//import { syscoin } from 'viem/chains';
 import {   BrowserRouter as Router } from 'react-router-dom';

import {
   Route, Routes
} from "react-router-dom";
import Footer from './components/footer';
import NftStaking from './NFT Staking/NFTStakin';
import COnnect from './components/connectWallet';


//const walletClient = createWalletClient({
//  chain: syscoin,
//  transport: custom(window.ethereum)
//});

//const [addressa] = await walletClient.getAddresses();


//   <CheckAdmin />
//   <br></br>
//   <CheckVendor />
//
//   <br></br>

 


function App() {


  return (
    <div className="App">
      <div className='header'>

        <div > {'logo'}</div>
         <h4> <COnnect /> </h4>


      </div>

       <br></br>

      <div>

           <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />
            <Route
              path="/stake"
              element={<StakingSection />}
            />
            <Route
              path="/NFT"
              element={<NftStaking />}
            />
            <Route
              path="/vendor"
              element={<CheckVendor />}
            />
            <Route
              path="/admin"
              element={<CheckAdmin />}
            />

          </Routes>
 

      </div>

      <Footer />
    </div>

  );
}

export default App;
