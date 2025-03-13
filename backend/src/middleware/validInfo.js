const valid = (req, res, next) =>{

  const { emp_name, emp_password, emp_role } = req.body

  if(req.path === "/register"){
    if(![emp_name, emp_password, emp_role].every(Boolean)){
      return res.status(401).json("Missing Credentials")
    } 
  } else if (req.path === "/login"){
    if(![emp_password].every(Boolean)){
      return res.status(401).json("Missing Credentials")
    } 
  }
  next()
}

export default valid