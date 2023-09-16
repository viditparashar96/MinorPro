exports.extractExtension=(file)=>{
    const imgName=file.name.split(".")
    const ex=imgName[imgName.length-1]
    const extension=`.${ex}`
   return extension; 
}