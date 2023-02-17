const cropNameImg = (nameImg)=>{
  const newNameImg = nameImg.split('.');
  newNameImg.pop();
  return newNameImg.join('.');
}

module.exports = cropNameImg