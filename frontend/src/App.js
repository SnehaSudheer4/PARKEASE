import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import AdminRouter from './Routers/AdminRouter';
import CompanyRouter from './Routers/CompanyRouter';
import SecurityRouter from './Routers/SecurityRouter';
import UserRouter from './Routers/UserRouter';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/*' element={<UserRouter/>} />
        <Route path='/admin/*' element={<AdminRouter/>} />
        <Route path='/security/*' element={<SecurityRouter/>} />
        <Route path='/company/*' element={<CompanyRouter/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
