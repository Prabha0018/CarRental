import Cars from '../models/Carmodel.js';
import Books from '../models/Bookmodel.js'
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed!'));
    }
}).single('carImage');

const getcars = async (req, res) => {
    try {
        const result = await Cars.find({});
        res.send(result);
        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};
const getbooks = async (req, res) => {
    try {
        const result = await Books.find({});
        res.send(result);
        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};
const createcar = async (req, res) => {
    const { Name,Rate,Year,Color,Regno,Carimg } = req.body;
    try {
        const existingCar = await Cars.findOne({ Regno });
        if (existingCar) {
            console.log(existingCar);
            console.log('Car Already Exists');
            return res.status(409).send('Car Already Exists');
        }
        const newCar = await Cars.create({Name,Rate,Year,Color,Regno,Carimg});
        res.send('Car Added Successfully');
     } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};
const createbook = async (req, res) => {
    const { Regno, Hours, Date, CheckinTime, Aadhar } = req.body;
    try {
        // Ensure you are using the correct property name to find the car by registration number
        const existingCar = await Cars.findOne({ Regno });
        
        if (existingCar) {
            const Name=existingCar.Name;
            const Carimg=existingCar.Carimg;
            console.log(Name,Carimg)
            const newbook=await Books.create({Name,Carimg,Regno, Hours, Date, CheckinTime, Aadhar});
            res.send("Car Booked Successfully")
        } else {
            console.log('Car Not Exists');
            return res.status(404).send('Car Not Exists');
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).send("Internal server error");
    }
};
const cancelbook = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the booking and delete it
        const booking = await Books.findByIdAndDelete(id);
        
        if (!booking) {
            return res.status(404).send('Booking not found');
        }

        res.send('Booking cancelled successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};
const getCarByRegNo = async (req, res) => {
    const { regno } = req.params;
    try {
        const car = await Cars.findOne({ Regno: regno });
        if (!car) {
            return res.status(404).send('Car not found');
        }
        res.json({
            CarName: car.Name,
            RatePerDay: car.Rate,
            CarImageURL: car.Carimg
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};

const uploadImage = (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // An unknown error occurred
            return res.status(400).json({ error: err.message });
        }

        // File upload was successful
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ imageUrl });
    });
};

export const verifyPasskey = async (req, res) => {
    const { passkey } = req.body;

    if (!passkey || passkey !== '123456') {
        return res.status(401).json({ error: 'Invalid passkey' });
    }

    res.status(200).json({ message: 'Passkey verified successfully' });
};

export { getcars, createcar, createbook, getbooks, cancelbook, getCarByRegNo, uploadImage };
