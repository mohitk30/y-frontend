
 import Login from "./components/auth/Login";


const PrivateRoute = ({ children, ...rest }) => {

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
   }

  const checkLogin=()=>{
    const token = localStorage.getItem("6f0bb1e57b8223a94ededf83ad6e1e40")

    if(token!==null){
      // console.log("Local")
      const decodedJwt = parseJwt(token);
      if (((decodedJwt.exp+12*60*60) * 1000)  <= Date.now()) {
        return true;
      }else{
        return true;
      }

       
    }else{
      return false;
    }
 
  }
  const loggedIn = checkLogin();
  // console.log(loggedIn)
  // <Navigate to="/" />
  return (
    
        loggedIn ? children : <Login />
    
  );
};

export default PrivateRoute;
