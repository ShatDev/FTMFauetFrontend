import React, { useState, useEffect } from 'react';
import Link from 'react-dom';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import coinAddressValidator from 'coin-address-validator';
import './styles.css';

const HeaderPanel = props => {
  useEffect(() => {
    fetch('http://18.207.251.49:4006/status/ftm')
      .then(res => res.json())
      .then(result => {
        setAddress(result.address);
        setFtm(result.balance);
      });
  }, []);

  const [address, setAddress] = useState();
  const [ftm, setFtm] = useState();

  const [displayMsg, setDisplayMsg] = useState('');

  const [targetAddress, setTargetAddress] = useState('');

  const [tnxHash, setTnxHash] = useState('');
  const testnetExplorer = 'https://explorer.testnet.fantom.network/transactions/';

  const handleAddressChange = e => {
    setTargetAddress(e.target.value);
  };

  const validateAddress = () => {
    return coinAddressValidator.validate(targetAddress, 'eth', 'prod');
  };

  const handleGetFTM = () => {
    let isValidAddress = validateAddress();
    if (!isValidAddress) {
      setDisplayMsg('Invalid Opera Testnet Address!');
      return;
    }
    fetch('http://18.207.251.49:4006/request/ftm/' + targetAddress)
      .then(res => res.json())
      .then(result => {
        if (result.hasOwnProperty('error')) {
          setDisplayMsg('Your account ' + result.input + ' has already ' + result.balance + 'test FTMs!');
        } else {
          setDisplayMsg(
            '10 Testnet FTMs successfully sent to ' + targetAddress + '! You can see the transaction here  ',
          );
          setTnxHash(result.transactionHash);
          setFtm(result.remainingBalance);
        }
      });
  };
  return (
    <div className="headerContainer">
      <p>
        <font color="white" size="+5" className="fonts">
          Testnet Opera Faucet
        </font>
        <br></br>
        <font color="white" size="+2" className="fonts">
          Feel free to get test FTMs to your wallet
        </font>
      </p>
      <div className="faucetContainer">
        <FormControl className="ftmAddressInput" variant="filled">
          <FilledInput
            id="filled-adornment-weight"
            value={targetAddress}
            placeholder={'Input your testnet FTM Address'}
            onChange={handleAddressChange}
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            aria-describedby="filled-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <Button variant="contained" color="primary" className="button" onClick={handleGetFTM}>
            Request Testnet FTM
          </Button>
          <FormHelperText className="helper" id="filled-weight-helper-text">
            {displayMsg}
            <a href={testnetExplorer + tnxHash}>{tnxHash}</a>
          </FormHelperText>
          <FormHelperText className="helper" id="filled-weight-helper-text">
            Testnet Opera FTMs are served from <b>{address}</b> with <b>{ftm}</b> Testnet FTMs.You can request 10
            Testnet FTMs once per address every 5 minutes.
          </FormHelperText>
        </FormControl>
      </div>
    </div>
  );
};

export default HeaderPanel;
