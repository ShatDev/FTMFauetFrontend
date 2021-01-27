import React from 'react'
import './styles.css'

import { useWallet, UseWalletProvider } from 'use-wallet'

const ConnectMetamaskPanel = (props) => {
  const wallet = useWallet()
  const blockNumber = wallet.getBlockNumber()

  const connectWallet = () => {
    wallet.connect()
    if (wallet.status == 'connected'){
      //when connect metamask succeeds, do logic
    }
    else{
      //when connect metamask fails, do nothing
    }
  }
  
  return (
    <div className="card" onClick={connectWallet}>
      <img src={props.img} />
      <div className="card-body">
        <h2>{props.title}</h2>
      </div>
    </div>
  )
}

export default ConnectMetamaskPanel
