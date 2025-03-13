const valid = (req, res, next) =>{

  const { name, password, role } = req.body
  console.log(req.body)
  console.log(name, password, role)

  if(req.path === "/register"){
    if(![name, password, role].every(Boolean)){
      return res.status(401).json("Missing Credentials")
    } 
  } else if (req.path === "/login"){
    if(![password].every(Boolean)){
      return res.status(401).json("Missing Credentials")
    } 
  }
  next()
}

export default valid