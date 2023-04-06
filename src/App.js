import Dashboard from './components/dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div className="app">
      <ToastContainer />
      
       <Routes > 
          
            <Route path = '/' element = {  <PrivateRoute> <Dashboard /> </PrivateRoute>}/>
            <Route path = '/contacts' element = {   <PrivateRoute><Dashboard /></PrivateRoute>}/>
          
            
       </Routes>
        
        
    </div>
  );
}

export default App;
