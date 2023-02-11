const setPlugIn = (event, handleInputChange) => {
  let plugIn;
  if(event.target.value === 'Taip'){
    plugIn = true;
  }
  else if(event.target.value === 'Ne'){
    plugIn = false;
  }
  else{
    plugIn = null;
  }
  handleInputChange({target: {name: 'plugIn', value: plugIn}});
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

export default { setPlugIn, handleParentChange};