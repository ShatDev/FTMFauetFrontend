import { bitcoinConstants } from '../constants';

const bitcoinPriceActions = {
  updateBitcoinPrice,
};

function updateBitcoinPrice(price) {
  return dispatch => {
    dispatch(_updateBitcoinPrice(price));
  };
}

const _updateBitcoinPrice = price => {
  return {
    type: bitcoinConstants.UPDATEBITCOINPRICE,
    price: price,
  };
};

export default bitcoinPriceActions;
