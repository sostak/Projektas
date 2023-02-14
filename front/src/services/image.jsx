const convertImages = async (event, setImageFiles) => {
  const files = Array.from(event.target.files);
  const imagePromises = files.map(async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        const base64Image = reader.result;
        const pureBase64 = base64Image.split(',')[1];
        resolve(pureBase64);
      };
    });
  });
  Promise.all(imagePromises).then((pureBase64Images) => {
    setImageFiles(pureBase64Images);
  });
};

export default convertImages;
