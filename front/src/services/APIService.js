import constants from '../configuration/Constants.json';

const Get = async (route) => {
  try{
    const data = await (await fetch(`${constants.API_KEY}${route}`)).json();
    return data;
  }
  catch{
    return null;
  }
};

export default Get;
