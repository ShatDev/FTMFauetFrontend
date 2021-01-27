import './App.css';
import WavePanel from './components/WavePanel';
import BottomPanel from './components/BottomPanel';
import HeaderPanel from './components/HeaderPanel';
import ConnectMetamaskPanel from './components/ConnectMetamaskPanel';
import Betpanel from './components/PlayPannel/BetPanel';

function App() {
  return (
    <div className="App" style={{ background: 'dodgerblue' }}>
      <HeaderPanel></HeaderPanel>
      <WavePanel></WavePanel>
      <BottomPanel></BottomPanel>
    </div>
  );
}

export default App;
