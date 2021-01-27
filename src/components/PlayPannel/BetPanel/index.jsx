import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import bitcoinPriceActions from '../../../actions/bitcoinprice.actions';
import BitcoinPricePanel from '../BitcoinPricePanel'
// import './styles.css'


const Betpanel = () => {
  const dispatch = useDispatch();
  let { oldPrice, newPrice } = useSelector(state => state.bitcoinPrice);

  const getBitcoinPrice = () => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => res.json())
      .then(data => {
        dispatch(bitcoinPriceActions.updateBitcoinPrice(data.bpi.USD.rate));
        console.log('current bitcoin price is', data.bpi.USD.rate);
      });
  };

  useEffect(() => {
    window.setTimeout(getBitcoinPrice(), 3000);
  }, []);

  

  return (
    <div class="fast-futures_game">
      <div class="fast-futures_price-board hidden" id="price-board">
        <div class="name h2">Bitcoin Price</div>
        <div class="price">
          <span>{newPrice}</span>
          <span>43</span>
        </div>
        <div class="percent h4 increase">+13.12%</div>
      </div>
      <div>
        {/* {new window.TradingView.widget({
          "autosize": true,
          "symbol": "COINBASE:BTCUSD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "Black",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "rgba(0, 0, 0, 1)",
          "hide_top_toolbar": true,
          "save_image": false,
          "hideideas": true
        })} */}
      </div>
      <div>
        <BitcoinPricePanel></BitcoinPricePanel>
      </div>

      <div class="fast-futures_indicator hidden" id="indicator">
        <div class="percent disabled">Price is going down</div>
        <div class="percent h1">01:38</div>
        <div class="percent price-up">Price is going up</div>
      </div>

      <div class="feature-game-slider hidden" id="slider">
        <div class="slick-item">
          <div class="fast-futures_bet-info">
            <div class="left-col">
              <div class="label">Bet size</div>
              <div class="bet-size">
                <input type="number" value="3000"></input>
                <span>FTM</span>
              </div>
              <div class="label">Use balance</div>
              <label class="switch">
                <input type="checkbox"></input>
                <span class="slider"></span>
              </label>
            </div>
            <div class="right-col">
              <div class="info-row">
                <div class="label">Current round:</div>
                <div class="value">
                  458,988.12 <span>FTM</span>
                </div>
              </div>
              <div class="info-row">
                <div class="label">Low/High ratio:</div>
                <div class="value price-down">1.25</div>
              </div>
              <div class="info-row">
                <div class="label">Current round:</div>
                <div class="value">0.33%</div>
              </div>
              <div class="info-row">
                <div class="label">My stake:</div>
                <div class="value">00:34</div>
              </div>
            </div>
          </div>
        </div>

        <div class="slick-item" hidden>
          <div class="fast-futures_ratio-table">
            <div class="head">
              <div class="main-label h3">Short/Long ratio</div>
              <a href="javascript:void(0)" class="close-btn close-ratio-table"></a>
            </div>
            <div class="fast-futures_ratio-item">
              <div class="head-row">
                <div class="label">Current game</div>
                <div class="value">256,781.42 FTM</div>
              </div>
              <div class="progress-row">
                <div class="value left darker">64%</div>
                <div class="progress left">
                  <div class="progress-bar" style={{ width: '64%' }}></div>
                </div>
                <div class="progress right">
                  <div class="progress-bar" style={{ width: '36%' }}></div>
                </div>
                <div class="value right">36%</div>
              </div>
            </div>
            <div class="fast-futures_ratio-item">
              <div class="head-row">
                <div class="label">Upcoming game</div>
                <div class="value">72,411.01 FTM</div>
              </div>
              <div class="progress-row">
                <div class="value left">9%</div>
                <div class="progress left">
                  <div class="progress-bar" style={{ width: '9%' }}></div>
                </div>
                <div class="progress right">
                  <div class="progress-bar" style={{ width: '91%' }}></div>
                </div>
                <div class="value right darker">91%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="fast-futures_balance-info hidden" id="balance-info">
        <div class="lighter">
          <div class="label">Start price</div>
          <div class="balance">
            10,612<span>.91</span>
          </div>
        </div>
        <div class="lighter">
          <div class="label">Current bet</div>
          <div class="balance">
            10,612<span>FTM</span>
          </div>
        </div>
        <div class="lighter">
          <div class="label">My balance</div>
          <div class="balance">
            100,322<span>.14 FTM</span>
          </div>
        </div>
      </div>

      <div class="fast-futures_buttons hidden" id="buttons">
        <a href="#" class="lower-price h3">
          Bet on lower price
        </a>
        <a href="#" class="higher-price h3">
          Bet on higher price
        </a>
      </div>

      {1 == 0 && (
        <div class="fast-futures_bottom-info hidden">
          <div class="price">
            Current price: <span> {newPrice}</span>
          </div>
          <div class="time">
            Time left: <span>4:07</span>
          </div>
        </div>
      )}

      {1 == 0 && (
        <div class="response hidden">
          <div class="response_popup">
            <div class="message">
              <p></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Betpanel;
