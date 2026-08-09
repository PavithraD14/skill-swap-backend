
const userModel = require("../models/user.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register
//emailCheck
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const emailCheck = await userModel.findOne({ email });

       if (emailCheck) {
            return res.status(400).json({ message: "User account already exists" });
        }

//password hashing
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({username,email,password: hashedPassword})

        res.status(201).json({message: "user account created"});

        } catch (err) {
        res.status(500).json(err.message);
    }
};

//login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if(!user){
            return res.status(404).json({ message: "User account not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

       if(!passwordMatch){
            return res.status(401).json({message: "Invalid Password"});
        }
      
        const token = jwt.sign(
            {userId: user._id, username: user.username, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.status(200).json({message: "Login Successful", token,
              user: {
    _id: user._id,
    username: user.username,
    email: user.email,
    about: user.about,
        bio: user.bio,
  },
});
     
          } catch (err) {
        res.status(500).json(err.message);
    }
}


module.exports = { registerUser, loginUser };
