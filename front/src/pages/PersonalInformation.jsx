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
  
  //const navigate = useNavigate();

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
        label='Pavardė'
        defaultValue={userData.surname}
        name='surname'
        onChange={handleInputChange}
      />
      <FormInput
        label='El. pašto adresas'
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
        label='Senas slaptažodis'
        type='password'
        name='oldPassword'
        disabled={passwordDisabled}
        onChange={handleInputChange}
      />
      <FormInput
        label='Naujas slaptažodis'
        type='password'
        name='newPassword'
        disabled={passwordDisabled}
        onChange={handleInputChange}
      />
      <FormInput
        label='Pakartokite naują slaptažodį'
        type='password'
        name='repeatPassword'
        disabled={passwordDisabled}
        onChange={handleInputChange}
      />

      {passwordError && (
        <Alert variant='danger'>
          Klaida! Patikrinkite slaptažodžius
        </Alert>
      )}

      <SuccessModal 
        showModal={showModal} 
        handleClose={handleClose}
        title='Duomenys atnaujinti'
        body='Jūsų duomenys buvo sėkmingai atnaujinti'
      />

      <br/>
      {passwordDisabled ? 
        <Button className='mb-3' onClick={() => setPasswordDisabled(false)}>
          Keisti slaptažodį
        </Button> :
        <Button className='mb-3' onClick={handlePasswordChange}>
          Išsaugoti
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