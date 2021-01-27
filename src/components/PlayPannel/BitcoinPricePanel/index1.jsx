import { Component, createRef, Fragment, PureComponent, useEffect, useState } from 'react';
import styled, { withTheme, ThemeProvider } from 'styled-components';
import { easeCubicOut, extent, line, scaleLinear, scaleTime, select } from 'd3';
import { interpolatePath } from 'd3-interpolate-path';
import {
  Svg,
  PeriodButton,
  OverviewItemButton,
  Value,
  Label,
  OverviewWrapper,
  Heading,
  PeriodText,
  theme,
  PeriodSwitcherWrapper,
} from './styles.js';

const API_BASE = 'https://www.coinbase.com/api/v2/prices/';
const API_HISTORY = 'historic?period=';
const API_SPOT = 'spot';
const COIN_OPTIONS = ['BTC', 'BCH', 'ETH', 'LTC'];
const PERIOD_OPTIONS = [
  {
    value: 'hour',
    label: '1H',
  },
  {
    value: 'day',
    label: '1D',
  },
  {
    value: 'week',
    label: '1W',
  },
  {
    value: 'month',
    label: '1M',
  },
  {
    value: 'year',
    label: '1Y',
  },
  {
    value: 'all',
    label: 'ALL',
  },
];

const formatValueHistory = prices =>
  prices
    .map(p => ({
      price: Number(p.price),
      time: new Date(p.time),
    }))
    .sort((a, b) => a.time - b.time);

const scalePrices = (data, height, width, paddingTop = 0, paddingBottom = 0, paddingLeft = 0, paddingRight = 0) => {
  const priceToY = scaleLinear()
    .range([height - paddingBottom, paddingTop])
    .domain(extent(data, d => d.price));

  const timeToX = scaleTime()
    .range([paddingLeft, width - paddingRight])
    .domain(extent(data, d => d.time));

  return data.map(({ price, time }) => ({
    price: priceToY(price),
    time: timeToX(time),
  }));
};

const lineFromPrices = line()
  .x(d => d.time)
  .y(d => d.price);

const NUMBER_REG = /\B(?=(\d{3})+(?!\d))/g;

const getSign = (price, hidePlus) => {
  if (!hidePlus && price > 0) {
    return '+';
  }

  if (price < 0) {
    return '-';
  }

  return '';
};

const formatNumberString = (price, symbol = '', hidePlus = false, symbolAfter = false) => {
  if (typeof price === 'number') {
    const sign = getSign(price, hidePlus);
    const string = Math.abs(price).toFixed(2);
    const parts = string.split('.');
    parts[0] = parts[0].replace(NUMBER_REG, ',');
    return `${sign}${symbolAfter ? '' : symbol}${parts.join('.')}${symbolAfter ? symbol : ''}`;
  }

  return null;
};

const deriveValueDelta = (currentValue, valueHistory) => {
  if (
    typeof currentValue === 'number' &&
    Array.isArray(valueHistory) &&
    valueHistory.length > 0 &&
    valueHistory[0].price
  ) {
    return currentValue - valueHistory[0].price;
  }

  return null;
};

const derivePercentDelta = (currentValue, valueHistory) => {
  if (Array.isArray(valueHistory) && valueHistory.length > 0 && valueHistory[0].price) {
    return ((currentValue - valueHistory[0].price) / Math.abs(valueHistory[0].price)) * 100 || 0;
  }

  return null;
};

const fetchValueHistory = async (coin, period) => {
  const d = await fetch(`${API_BASE}${coin}-USD/${API_HISTORY}${period}`).then(r => r.json());
  console.log(`${API_BASE}${coin}-USD/${API_HISTORY}${period}`);
  console.log(d);
  const prices = d && d.data && d.data.prices;

  if (Array.isArray(prices) && prices.length > 0) {
    return formatValueHistory(prices);
  }

  throw new Error('invalid price data returned');
};

const fetchCurrentValue = async coin => {
  const d = await fetch(`${API_BASE}${coin}-USD/${API_SPOT}`).then(r => r.json());
  const spot = d && d.data && d.data.amount;

  if (typeof spot === 'string') {
    return Number(spot);
  }

  throw new Error('invalid spot data returned');
};

const LINE_DUMMY = Array(2)
  .fill()
  .map((a, i) => ({ price: 0, time: new Date(2010 + i) }));
const PADDING = 24;
const TRANSITION_DURATION = 500;

const safePrices = prices => (Array.isArray(prices) && prices.length > 1 ? prices : LINE_DUMMY);

//change into functional component
const LineBase = props => {
  let pathRef = createRef();
  let svgRef = createRef();

  const [path, setPath] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [d, setD] = useState();

  useEffect(() => {
    if (pathRef && pathRef.current && svgRef && svgRef.current) {
      const { _height, _width } = svgRef.current.getBoundingClientRect();
      const { prices } = props;
      setPath(pathRef.current);

      setWidth(_width);
      setHeight(_height);

      const _d = lineFromPrices(scalePrices(safePrices(prices), _height, _width, PADDING, PADDING));
      path.attr('d', _d);
      setD(_d);

      window.addEventListener('resize', handleResize);
    }
  }, []);

  //   componentWillUnmount() {
  //     window.removeEventListener('resize', this.handleResize);
  //   }

  const handleResize = () => {
    if (svgRef && svgRef.current) {
      const { _height, _width } = svgRef.current.getBoundingClientRect();
      setHeight(_height);
      setWidth(_width);
      updatePath();
    }
  };

  const updatePath = () => {
    const { prices } = props;

    const _d = lineFromPrices(scalePrices(safePrices(prices), height, width, PADDING, PADDING));

    path
      .transition()
      .duration(TRANSITION_DURATION)
      .ease(easeCubicOut)
      .attrTween('d', interpolatePath.bind(null, d, _d));
    setD(_d);
  };

  return (
    <Svg innerRef={svgRef}>
      <path fill="none" ref={pathRef} stroke={props.theme.color.text} strokeWidth="1.5" />
    </Svg>
  );
};

const Line = withTheme(LineBase);

//change into functional component

const PeriodItem = props => {
  const { onClick, value } = props;
  const handleClick = e => {
    if (typeof onClick === 'function') {
      onClick(e, value);
    }
  };
  const { active, children } = props;
  return (
    <PeriodButton active={active} onClick={handleClick}>
      <PeriodText active={active}>{children}</PeriodText>
    </PeriodButton>
  );
};

//change into functional component
const PeriodSwitcher = props => {
  const { onChange, options, value } = props;

  return (
    <PeriodSwitcherWrapper>
      {Array.isArray(options) &&
        options.map(o => (
          <PeriodItem active={value === o.value} key={o.value} onClick={onChange} value={o.value}>
            {o.label}
          </PeriodItem>
        ))}
    </PeriodSwitcherWrapper>
  );
};

const OverviewItem = ({ children, label, onClick }) => (
  <OverviewItemButton onClick={onClick}>
    <Value>{children || <Fragment>&nbsp;</Fragment>}</Value>
    <Label>{label}</Label>
  </OverviewItemButton>
);

OverviewItem.defaultProps = {
  children: null,
  label: '',
  onClick: null,
};

//change into functional component

const Overview = props => {
  const [calcPercentage, setCalcPercentage] = useState(false);

  const togglePercentage = () => {
    setCalcPercentage(!calcPercentage);
  };

  const { _coin, _currentValue, _cycleCoinIndex, _valueHistory } = props;
  const delta = calcPercentage
    ? formatNumberString(derivePercentDelta(_currentValue, _valueHistory), '%', false, true)
    : formatNumberString(deriveValueDelta(_currentValue, _valueHistory), '$');

  return (
    <OverviewWrapper>
      <OverviewItem onClick={props.cycleCoinIndex} label={`${_coin} Price`}>
        {formatNumberString(_currentValue, '$', true)}
      </OverviewItem>
      <OverviewItem onClick={togglePercentage} label={`${calcPercentage ? 'Percent' : 'Price'} Change`}>
        {delta}
      </OverviewItem>
    </OverviewWrapper>
  );
};

//change into functional component
const CryptoChart = () => {
  const [coinIndex, setCoinIndex] = useState(0);
  const [currentValue, setCurrentValue] = useState(null);
  const [period, setPeriod] = useState(PERIOD_OPTIONS[0].value);
  const [valueHistory, setValueHistory] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const cycleCoinIndex = () => {
    setCoinIndex((coinIndex + 1) % COIN_OPTIONS.length);
    fetchData();
  };

  //     this.setState(
  //       prevState => ({
  //         coinIndex: (prevState.coinIndex + 1) % COIN_OPTIONS.length,
  //       }),
  //       this.fetchData,
  //     );
  //   };

  const _setPeriod = (e, period) => {
    // this.setState({ period }, this.fetchData);
    setPeriod(period);
    fetchData();
  };

  //   componentWillUnmount() {
  //     clearTimeout(this.fetchTimeout);
  //   }

  const fetchData = async () => {
    const fetchTimeout = setTimeout(fetchData, 30000);
    clearTimeout(fetchTimeout);

    try {
      const _currentValue = await fetchCurrentValue(COIN_OPTIONS[coinIndex]);
      setCurrentValue(_currentValue);
      const _valueHistory = await fetchValueHistory(COIN_OPTIONS[coinIndex], period);
      setValueHistory(_valueHistory);
    } catch (e) {
      console.warn(e);
    }

    // const fetchTimeout = setTimeout(fetchData, 30000);
  };

  return (
    <Fragment>
      <Heading>Khajiit Has Warez, If You Have Coin</Heading>
      <Overview
        coin={COIN_OPTIONS[coinIndex]}
        cycleCoinIndex={cycleCoinIndex}
        currentValue={currentValue}
        valueHistory={valueHistory}
      />
      <PeriodSwitcher onChange={_setPeriod} options={PERIOD_OPTIONS} value={period} />
      <Line prices={valueHistory} />
    </Fragment>
  );
};

const BitcoinPricePanel = () => (
  <ThemeProvider theme={theme}>
    <CryptoChart />
  </ThemeProvider>
);

export default BitcoinPricePanel;
