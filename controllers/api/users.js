const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6

module.exports = {
    signup,
    login
}

async function signup(req, res){
    console.log('signup function reached')
    try {
        const hashedPass = await bcrypt.hash(req.body.password, SALT_ROUNDS)
        const user = await User.create({
            name: req.body.name, 
            email:req.body.email, 
            password:req.body.password,
            admin: true
        });
    
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
        res.status(200).json(token);
      } catch (err) {
        res.status(400).json(err);
      }
}

async function login(req, res){
    try {
        const user = await User.findOne({ email: req.body.email });
        if (await bcrypt.compare(user.password, req.body.password)) throw new Error();
    
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
        res.status(200).json(token)
      } catch {
        res.status(400).json('Invalid User Information');
    }
}