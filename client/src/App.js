
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import Cart from './pages/Cart'
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { useState } from 'react';

function App() {

const [searchParams, setSearchParams] = useState({ price: '', size: '', name: '' });

const handleSearchFunction = (params) => {
  
  setSearchParams(params);
};

return (
  <div>
    <Navbar onSearch={handleSearchFunction} />
    <Routes>
      {/* Pass searchParams as a prop to Home */}
      <Route path='/' element={<Home searchParams={searchParams} />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  </div>
);
}

export default App;




// function App() {
//   const [searchParams, setSearchParams] = useState({ price: '', size: '', brand: '' });

//   const handleSearchFunction = (params) => {
//     setSearchParams(params);
//   };

//   return (
//     <div>
//       <Navbar onSearch={handleSearchFunction} />
//       <Routes>
//         {/* Pass searchParams as a prop to Home */}
//         <Route path='/' element={<Home searchParams={searchParams} />} />
//         <Route path='/cart' element={<Cart />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/signup' element={<Signup />} />
//       </Routes>
//     </div>
//   );
// }
