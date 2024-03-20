const express = require('express')
const router = express.Router()
require('../db/conn')
const User = require('../model/userSchema')
const path = require('path');
const bcrypt = require('bcrypt')
const authenticate = require('../middleware/authenticate')
const Product = require('../model/productSchema')
const multer = require('multer');



const storage = multer.diskStorage({
    // if you store images in client side public folder
    // destination: '../client/public/images/',
    // if you store images in server side public folder
    destination: './public/images/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


router.post('/addProduct', upload.single('productImage'), async (req, res) => {
    try {
        // Extract product data from the request body
        const { pCategory, pName, pTitle, pPrice } = req.body;
        const productImage = req.file ? req.file.filename : null;

        // Create a new Product instance
        const product = new Product({
            pCategory,
            pName,
            pTitle,
            pPrice,
            productImage,
        });

        // Save the product to the database
        await product.save();

        // Respond with the created product
        res.status(201).json(product);
    } catch (error) {
        // Handle error
        res.status(500).json({ error: 'An error occurred' });
    }
});



router.get('/products', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});



router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "please fill" })
    }

    try {
        const userexist = await User.findOne({ email: email })
        if (userexist) {
            return res.status(422).json({ error: "Email Already Exist" })
        } else if (password !== cpassword) {
            return res.status(422).json({ error: 'Password and confirm password are not matched' })
        } else {
            const user = new User({ name, email, phone, work, password, cpassword })
            await user.save();
            res.status(201).json({ message: "user Registeration succesfull" })
        }
    } catch (error) {
        console.log(error);
    }
})





// user Login

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'please fill login' })
        }
        const userLogin = await User.findOne({ email: email })

        // check email and pass with Database

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)

            // for generate Token JWT
            const token = await userLogin.generateAuthToken();
            res.cookie('jsonwebtoken', token, {
                expires: new Date(Date.now() + 25892000000),
                // 30000 means 3 mint
                // 25892000000 means 30 days
                httpOnly: true
            })

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credentials" })
            } else {
                res.status(200).json({ message: "login Successfully" })
            }
        } else {
            res.status(400).json({ error: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
    }
})


router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser);
})

// getUSerData for Contact Page and Home Page
router.get('/getData', authenticate, (req, res) => {
    res.send(req.rootUser);
})


// store Contact data to server

router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.json({ error: 'please fill contact form' })
        }
        const userContactForm = await User.findOne({ _id: req.userID })
        if (userContactForm) {
            const userMessage = await userContactForm.addMessage(name, email, phone, message);
            await userContactForm.save()
            res.status(201).json({ message: "Succssefully send contact message" })
        }
    } catch (error) {
        console.log(error);
    }
})

// logout Route
router.get('/logout', (req, res) => {
    console.log('hello logout');
    res.clearCookie('jsonwebtoken', { path: '/' });
    res.status(200).send('user Logout')
})




module.exports = router;
