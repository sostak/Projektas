import Cookies from 'js-cookie';

const login = async (email, password, setError) => {
  const data = 
      {
        'email': email,
        'password': password,
      };
  try{
    const response = await fetch('https://localhost:7291/api/Users/Login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }
    );
    const responseData = await response.json();
      
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    Cookies.set('token', responseData.accessToken, { expires: expiration });
  }
  catch (error){
    setError(true);
  }
};

export default login;