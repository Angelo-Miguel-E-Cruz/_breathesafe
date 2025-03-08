import * as regServices from '../services/regServices.js'
import jwtGenerator  from '../services/jwtGenerator.js'
import bcrypt from 'bcryptjs'

// Register user
export const regUser = async (req, res) => {
  try {
    const { name, password, role } = req.body

    // Check if user exists
    const doesExist = await regServices.checkExists(name)

    // Notify if user exists
    if (doesExist != 0){
      return res.status(401).json({message: "User Already Exists"})
    }
    
    // Encrypt password
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const bcryptPassword = await bcrypt.hash(password, salt)

    // Register new user
    const register = await regServices.registerUser(name, bcryptPassword, role)

    // Create user token
    const token = jwtGenerator(register[0].user_id)

    return res.status(201).json({message: "User Added", token: token})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

// Login
export const logIn = async (req, res) => {
  try {
    const { name, password } = req.body
    // Check if user exists
    const doesExist = await regServices.checkExists(name)

    // Notify if user does not exist
    if (doesExist == 0){
      return res.status(401).json({message: "User does not Exist"})
    }

    // Check if password is the same
    const validPassword = await bcrypt.compare(password, doesExist[0].user_password)
    
    if(!validPassword){
      return res.status(401).json({message: "Password or Name is incorrect"})
    }

    // Create user token
    const token = jwtGenerator(doesExist[0].user_id)
    
    return res.status(201).json({message: "Login Succesful", token: token, role: doesExist[0].user_role})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

// Authorize user
export const isVerify = async (req, res) => {
  try {
    return res.json(true)
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}