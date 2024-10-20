import jwt from 'jsonwebtoken'

const generateToken = (payload, secretKey, expiredDate) => {
  return jwt.sign(payload, secretKey, { expiresIn: expiredDate })
}

export default generateToken