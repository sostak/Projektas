//todo: sugalvoti logiskesni sprendima slaptazodzio keitimui
// perdaryt fetchinima, kad butu naudojamos konstantos
// pagalvot gal iseitu graziau forma pasidaryt
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const PersonalInformation = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('https://localhost:7291/api/Users/GetMe', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${Cookies.get('token')}` }
        }
        );
        const responseData = await response.json();
        setUser(responseData);
        setLoading(false);
      }
      catch(error){
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const correctPassword = await fetch(`https://localhost:7291/api/Users/CheckPassword?password=${oldPassword}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${Cookies.get('token')}` }
    }
    );
    const response = await correctPassword.json();

    if(!passwordDisabled && (!response || repeatPassword != newPassword)){
      navigate('*');
    }

    const data = 
      {
        'name': name,
        'surname': surname,
        'email': email,
        'phoneNumber': phoneNumber,
        'password': newPassword
      };
    try{
      const response = fetch('https://localhost:7291/api/Users', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization' : `Bearer ${Cookies.get('token')}`},
        body: JSON.stringify(data)
      }
      );
      const responseData = await response.json();
      setUser(responseData);
    }
    catch (error){
      console.error(error);
    }
  };

  const handleClick = async() =>{
    //console.log(await Get(`Users/CheckPassword?password=${oldPassword}`));
  };

  if(loading){
    return <Loader/>;
  }

  return (
    <Form style={{'margin': '20px'}}>
      <Form.Group className="mb-3">
        <Form.Label>Vardas</Form.Label>
        <Form.Control type="text" placeholder="Vardas" defaultValue={user.name} onChange={(event) => setName(event.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pavardė</Form.Label>
        <Form.Control type="text" placeholder="Pavardė" defaultValue={user.surname} onChange={(event) => setSurname(event.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>El. paštas</Form.Label>
        <Form.Control type="email" placeholder="El. paštas" defaultValue={user.email} onChange={(event) => setEmail(event.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Telefono numeris</Form.Label>
        <Form.Control type="text" placeholder="Telefono numeris" defaultValue={user.phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Senas slaptažodis</Form.Label>
        <Form.Control disabled={passwordDisabled} type="password" placeholder="Senas slaptažodis" onChange={(event) => setOldPassword(event.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Naujas slaptažodis</Form.Label>
        <Form.Control disabled={passwordDisabled} type="password" placeholder="Naujas slaptažodis" onChange={(event) => setNewPassword(event.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pakartoti slaptažodį</Form.Label>
        <Form.Control disabled={passwordDisabled} type="password" placeholder="Pakartoti slaptažodį" onChange={(event) => setRepeatPassword(event.target.value)}/>
      </Form.Group>
      <Button className="mb-3" onClick={() => setPasswordDisabled(false)}>
        Keisti slaptažodį
      </Button>
      <br/>
      <Button className="mb-3" onClick={handleUpdate}>
        Atnaujinti
      </Button>
      <Button className="mb-3" onClick={handleClick}>
        Atnaujinti123
      </Button>
    </Form>
  );
};

export default PersonalInformation;