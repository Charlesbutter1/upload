import { Link } from "react-router-dom"

export default function NftStaking() {


    return (
        <div >

            <div className="vendor">
                <h4>Simple Menus</h4>


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

            <br></br>
            <div className="vendor">

                <h2>SYSLink NFT Staking</h2>

                <h3>Coming Soon </h3>

            </div>


        </div>


    )
}