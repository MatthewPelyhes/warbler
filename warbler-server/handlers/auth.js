const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = () => {

}

exports.signup = async (req, res, next) => {
  try{
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    let token = jwt.sign({
      id,
      username,
      profileImageUrl
    },
    process.env.SECRET_KEY
    );
    return res.status(200).jsom({
      id,
      username,
      profileImageUrl,
      token
    })
  } catch(err){
    //if a validation fails
    if(err.code === 11000){
      err.message = 'Sorry, that username and/or email is taken'
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};