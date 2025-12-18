import bcrypt from "bcrypt"

export async function hashPassword (password) {
return await bcrypt.hash(password,10)
}


export async function verifyPassword(password,hashPassword) {
  return await bcrypt.compare(password,hashPassword)
}

export async function adminAuth(req, res, next) {
  try {
      
      console.log(req.session);
      
      if (req.session.admin) {

          next();
      }
      else {
          res.status(403).json({
              message: 'denied'
          })
      }
  } catch (error) {
      console.log(error);

  }
}