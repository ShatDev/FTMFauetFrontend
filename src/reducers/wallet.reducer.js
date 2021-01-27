import { walletConstants } from '../constants'

function walletInfo(state = {}, action) {
  switch (action.type) {
    case walletConstants.WALLETCONNECTED: {
      return { ...state, isWalletConnected: true }
    }
    case walletConstants.WALLETDISCONNECTED: {
      return { isWalletConnected: false }
    }
    default:
      return state
  }
}

export default walletInfo