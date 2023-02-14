const setBool = (event, handleInputChange) => {
  let bool;
  if(event.target.value === 'Taip'){
    bool = true;
  }
  else if(event.target.value === 'Ne'){
    bool = false;
  }
  else{
    bool = null;
  }
  handleInputChange({target: {name: event.target.name, value: bool}});
};
  
const handleParentChange = (event, name, setChildDisabled, endpoint, setChildValue, fetchChild, handleInputChange) => {
  handleInputChange(event);
  handleInputChange({target: {name: name, value: ''}});
  
  if(event.target.value == ''){
    setChildDisabled(true);
  }
  else{
    fetchChild(event.target.value, endpoint, setChildValue);
    setChildDisabled(false);
  }
};

export default { setBool, handleParentChange};