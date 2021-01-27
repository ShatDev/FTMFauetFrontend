import React from 'react'
import TelegramIcon from '@material-ui/icons/Telegram'
import HelpIcon from '@material-ui/icons/Help'

import './styles.css'

const BottomPanel = (props) => {
  return (
    <div className="footerContainer">
      <font color="dodgerblue">Powered By <b>Fantom</b> Foundation</font>
      <div className="icons">
        <span className="icon">
          <TelegramIcon
            fontSize="large"
            style={{ color: 'dodgerblue' }}
          ></TelegramIcon>
        </span>
        <span className="icon">
          <HelpIcon fontSize="large" style={{ color: 'dodgerblue' }}></HelpIcon>
        </span>
      </div>
    </div>
  )
}

export default BottomPanel
