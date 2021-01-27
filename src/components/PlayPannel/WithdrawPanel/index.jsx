import React from 'react';

const WithdrawPanel = () => {
  return (
    <div class="fast-futures_withdraw hidden">
      <div class="head">
        <div class="main-label">Withdraw</div>
        <a href="javascript:void(0)" class="close-btn close-withdraw"></a>
      </div>
      <div class="body">
        <div class="label">How much would you like to withdraw?</div>
        <div class="value">
          <input type="number" placeholder="0"></input>
          <button>Max</button>
        </div>
        <div class="balance">Available to withdraw: 322,412.02 FTM</div>
        <button class="btn withdraw-btn" data-menu-name="withdraw-info">
          Withdraw to wallet
        </button>
      </div>
    </div>
  );
};
