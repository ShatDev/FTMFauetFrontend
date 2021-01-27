import {combineReducers} from 'redux'

import bitcoinPrice from './bitcoinprice.reducer';
import walletInfo from './wallet.reducer';


const rootReducer = combineReducers({
    bitcoinPrice,
    walletInfo
})

export default rootReducer