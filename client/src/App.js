import io from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import ChatRoom from './Pages/ChatRoom';

const socket = io();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home socket={socket} />} />
        <Route path='/chat/:room' element={<ChatRoom  socket={socket}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
