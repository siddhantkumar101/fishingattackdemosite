import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Username from './pages/Username';
import Password from './pages/Password';
import Welcome from './pages/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/password" element={<Password />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
