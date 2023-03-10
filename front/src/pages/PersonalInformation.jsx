import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import serverService from '../services/server';
import FormInput from '../components/FormGroup/InputFormGroup';
import { AuthContext } from '../App';
import SuccessModal from '../components/SuccessModal';

const PersonalInformation = () => {
  const [loading, setLoading] = useState(true);
  const [passwordDisabled, setPasswordDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {token} = useContext(AuthContext);

  const handleClose = () => {
    setShowModal(false);
    window.location.reload();
  };
  
  const [userData, setUserData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
    name: '',
    surname: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const checkToken = setTimeout(() => {
      if (!token) {
        navigate('/');
      }
    }, 500);

    return () => clearTimeout(checkToken);
  }, [token, navigate]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await serverService.fetchUser(token);
      setUserData({ ...response});
      setLoading(false);
    };
    fetchData();
  }, [token]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    await serverService.updateUser(token, userData);
    setShowModal(true);
  };

  const handlePasswordChange = async () => {
    await serverService.updatePassword(token, userData, setPasswordError);
    setUserData({
      ...userData,
      oldPassword: '',
      newPassword: '',
      repeatPassword: ''
    });
    setPasswordDisabled(true);
    !passwordError && setShowModal(true);
  };

  const handleInputChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    setPasswordError(false);
  };

  if(loading){
    return <Loader/>;
  }

  return (
    <Form className='filterBox'>
      <FormInput
        label='Vardas'
        defaultValue={userData.name}
        name='name'
        onChange={handleInputChange}
      />
      <FormInput
        label='Pavard??'
        defaultValue={userData.surname}
        name='surname'
        onChange={handleInputChange}
      />
      <FormInput
        label='El. pa??to adresas'
        type='email'
        defaultValue={userData.email}
        name='email'
        onChange={handleInputChange}
      />
      <FormInput
        label='Telefono numeris'
        defaultValue={userData.phoneNumber}
        name='phoneNumber'
        onChange={handleInputChange}
      />
      <FormInput
        label='Senas slapta??odis'
        type='password'
        name='oldPassword'
        disabled={passwordDisabled}
        onChange={handleInputChange}
      />
      <FormInput
        label='Naujas slapta??odis'
        type='password'
        name='newPassword'
        disabled={passwordDisabled}
        onChange={handleInputChange}
      />
      <FormInput
        label='Pakartokite nauj?? slapta??od??'
        type='password'
        name='repeatPassword'
        disabled={passwordDisabled}
        onChange={handleInputChange}
      />

      {passwordError && (
        <Alert variant='danger'>
          Klaida! Patikrinkite slapta??od??ius
        </Alert>
      )}

      <SuccessModal 
        showModal={showModal} 
        handleClose={handleClose}
        title='Duomenys atnaujinti'
        body='J??s?? duomenys buvo s??kmingai atnaujinti'
      />

      <br/>
      {passwordDisabled ? 
        <Button className='mb-3' onClick={() => setPasswordDisabled(false)}>
          Keisti slapta??od??
        </Button> :
        <Button className='mb-3' onClick={handlePasswordChange}>
          I??saugoti
        </Button>
      }
      
      <br/>
      <Button className='mb-3' onClick={handleUpdate}>
        Atnaujinti duomenis
      </Button>
    </Form>
  );
};

export default PersonalInformation;