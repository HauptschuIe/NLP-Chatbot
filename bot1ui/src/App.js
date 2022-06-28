import './App.css';
import Launcher from './pages/launcher/launcher.component';
import arrow from './assets/arrow1.webp'


function App() {

  return (
    <div className='wrapper'>
      <div className='teaser'>Start Chatting here <span>→</span></div>
      <Launcher />
    </div>


  );
}

export default App;
