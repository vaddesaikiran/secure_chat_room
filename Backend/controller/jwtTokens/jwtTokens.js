const jwt = require('jsonwebtoken');

const secretKey = 'MY_$ecret_key';


const generateToken = (userId) => {
    console.log(userId,"fuck u")
    const options = { expiresIn: '2d' }; 
    return jwt.sign({userId}, secretKey, options);
};

exports.genToken = async(req,res) => {
    const {userId} = req.body
    console.log(userId,'gennnnnnnnnn')
    const token =  generateToken(userId)
    console.log(token,"token")
    res.status(200).send(token);
   
}

exports.verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token, 'man token has arrived');
  
    if (!token) {
      return res.status(401).send('No token provided');
    }
  
    jwt.verify(token.split(' ')[1], secretKey, async (err, payload) => {
      if (err) {
        return res.status(403).send('Failed to authenticate token');
      }
      console.log(payload, "de"); 
      console.log(payload.userId, "decoded userId"); 
      req.userIdDecoded = payload.userId;
      console.log('TASK COMPLETED MAN WOW.........');
      next();
    });
  };
  