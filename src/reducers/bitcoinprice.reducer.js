import { bitcoinConstants } from '../constants';

const initialState = { oldPrice: 0, newPrice: 0 };
function bitcoinPrice(state = initialState, action) {
  switch (action.type) {
    case bitcoinConstants.UPDATEBITCOINPRICE: {
      return {
        oldPrice: state.currentPrice,
        newPrice: action.price,
      };
    }
    default:
      return state;
  }
}

export default bitcoinPrice;
