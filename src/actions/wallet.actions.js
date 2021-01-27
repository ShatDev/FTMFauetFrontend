import { walletConstants } from '../constants'

const walletActions = {
  walletConnected,
  walletDisconnected,
}

function walletConnected() {
  return (dispatch) => {
    dispatch(_walletConnected())
  }
}

const _walletConnected = () => {
  return {
    type: walletConstants.WALLETCONNECTED,
  }
}

function walletDisconnected() {
  return (dispatch) => {
    dispatch(_walletConnected())
  }
}

const _walletDisconnected = () => {
  return {
    type: walletConstants.WALLETDISCONNECTED,
  }
}

export default walletActions