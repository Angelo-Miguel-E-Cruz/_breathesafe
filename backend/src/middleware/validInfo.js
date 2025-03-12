const valid = (req, res, next) =>{

  const { emp_name, emp_password, emp_role } = req.body
  console.log(req.body)

  if(req.path === "/register"){
    if(![emp_name, emp_password, emp_role].every(Boolean)){
      return res.status(401).json("Missing Credentials")
    } 
    if (emp_role === "User"){
      const { emp_id, device_id, emp_gender, emp_age } = req.body
      if(![ emp_id, device_id, emp_gender, emp_age].every(Boolean)){
        return res.status(401).json("Missing Employee Credentials")
      } 
    }
  } else if (req.path === "/login"){
    if(![password].every(Boolean)){
      return res.status(401).json("Missing Credentials")
    } 
  }
  next()
}

export default valid