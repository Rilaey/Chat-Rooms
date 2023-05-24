import io from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import ChatRoom from './Pages/ChatRoom';

const socket = io.connect("http://localhost:8080/");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='chat' element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
