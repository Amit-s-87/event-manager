// userController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendEmail = require('../modules/emailSender')

const fs = require('fs');
const { JWT_SECRET } = require("../configs/env.config");
const usersFilePath = './data/users.json';

let users = [];

function generateAccessToken(user) {
    return jwt.sign({email: user.email, role: user.role}, JWT_SECRET, { expiresIn: 86400 });
}


async function register(req, res) {
    try {
        const { username, email, password, role } = req.body;
        // Check validate INput
        if (!username) {
            return res.status(400).json({ message: 'Username is are required'});
        }
        if (!password) {
            return res.status(400).json({ message: 'password is required' });
        }
        if (!email) {
            return res.status(400).json({ message: 'email is required' });
        }
        if (!role) {
            return res.status(400).json({ message: 'role is required' });
        }
        const usersData = JSON.parse(fs.readFileSync(usersFilePath));       
        const user = usersData.find(user => ser.email === email);

        // Check if user already exists
        if (user) {
            return res.status(401).json({ message: 'User already exists' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Save user to memory
        usersData.push({ username, email, password: hashedPassword, role });
        fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));
        // Send email notification
        emailModule.sendEmail(email, 'Registration Successful', 'You have successfully registered.');
        res.status(201).json({ message: 'User registered successfully' });       
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'email is are required'});
        }
        if (!password) {
            return res.status(400).json({ message: 'password is required' });
        }
        // Find user by email
        const usersData = JSON.parse(fs.readFileSync(usersFilePath));
        const user = usersData.find(user => user.email === email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check password
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Generate JWT token
        const accessToken = generateAccessToken(user);        
        res.status(200).json({ message: "Login successful", accessToken });        

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Failed to login' });
    }
}



module.exports = { register, login };
