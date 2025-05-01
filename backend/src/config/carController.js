import mongoose from "mongoose";
import Cars from '../models/Carmodel.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
    console.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        const carData = [
            {
                Name: 'Tata Nexon',
                Year: 2023,
                Color: 'Blue',
                Rate: 800000,
                Regno: 'KA03EF9012',
                Carimg: 'https://th.bing.com/th/id/OIP.Ld6Fry4rdRaLeIeH4EZgYQHaEK?rs=1&pid=ImgDetMain'
              },
              {
                Name: 'Maruti Suzuki Swift',
                Year: 2022,
                Color: 'Red',
                Rate: 650000,
                Regno: 'DL05GH2345',
                Carimg: 'https://th.bing.com/th/id/OIP.YoB_JQjPvdiRS9m-DwuPfAHaEc?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
              },
              {
                Name: 'Hyundai i20',
                Year: 2021,
                Color: 'White',
                Rate: 750000,
                Regno: 'TN07IJ6789',
                Carimg: 'https://example.com/hyundai_i20.jpg'
              },
              {
                Name: 'Honda City',
                Year: 2023,
                Color: 'Silver',
                Rate: 900000,
                Regno: 'MH12KL3456',
                Carimg: 'https://th.bing.com/th/id/OIP.VJqC5FHdnr888sGzXaRDlwHaEK?w=313&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
              },
              // Add more cars here
              {
                Name: 'Mahindra XUV700',
                Year: 2023,
                Color: 'Black',
                Rate: 1200000,
                Regno: 'UP10MN4567',
                Carimg: 'https://example.com/mahindra_xuv700.jpg'
              },
              {
                Name: 'Toyota Innova Crysta',
                Year: 2022,
                Color: 'Grey',
                Rate: 1500000,
                Regno: 'AP08OP6789',
                Carimg: 'https://th.bing.com/th/id/R.8515fd008ac46dfe8bd953b91c7a0bb8?rik=x%2fiAR6u8DGFvkg&riu=http%3a%2f%2fpics.desigoogly.com%2fvar%2falbums%2fCars%2fToyota-Innova-Crysta%2fToyota+Innova+Crysta+Grey+Color.PNG%3fm%3d1549150653&ehk=y7pblHpdZIkokEEQU6YyGX8%2f4pk43S6Zx9csU%2baSdZ8%3d&risl=&pid=ImgRaw&r=0'
              },
              {
                Name: 'Ford EcoSport',
                Year: 2021,
                Color: 'Orange',
                Rate: 850000,
                Regno: 'WB13QR7890',
                Carimg: 'https://example.com/ford_ecosport.jpg'
              },
              {
                Name: 'Volkswagen Polo',
                Year: 2023,
                Color: 'Green',
                Rate: 700000,
                Regno: 'GJ14ST1234',
                Carimg: 'https://example.com/volkswagen_polo.jpg'
              },
              {
                Name: 'Renault Kiger',
                Year: 2022,
                Color: 'Yellow',
                Rate: 750000,
                Regno: 'RJ15UV2345',
                Carimg: 'https://example.com/renault_kiger.jpg'
              },
              {
                Name: 'Kia Seltos',
                Year: 2023,
                Color: 'White',
                Rate: 900000,
                Regno: 'MP16WX3456',
                Carimg: 'https://example.com/kia_seltos.jpg'
              },
              {
                Name: 'Nissan Magnite',
                Year: 2022,
                Color: 'Blue',
                Rate: 700000,
                Regno: 'KL17YZ4567',
                Carimg: 'https://example.com/nissan_magnite.jpg'
              },
              {
                Name: 'Skoda Kushaq',
                Year: 2023,
                Color: 'Black',
                Rate: 1100000,
                Regno: 'PB18AB5678',
                Carimg: 'https://example.com/skoda_kushaq.jpg'
              },
              {
                Name: 'MG Hector',
                Year: 2022,
                Color: 'Silver',
                Rate: 1400000,
                Regno: 'HR19CD6789',
                Carimg: 'https://example.com/mg_hector.jpg'
              },
              {
                Name: 'Jeep Compass',
                Year: 2021,
                Color: 'Red',
                Rate: 1600000,
                Regno: 'KA20EF7890',
                Carimg: 'https://example.com/jeep_compass.jpg'
              },
              {
                Name: 'Audi Q3',
                Year: 2023,
                Color: 'White',
                Rate: 2500000,
                Regno: 'TN21GH8901',
                Carimg: 'https://example.com/audi_q3.jpg'
              },
              {
                Name: 'BMW 3 Series',
                Year: 2022,
                Color: 'Black',
                Rate: 3000000,
                Regno: 'DL22IJ9012',
                Carimg: 'https://example.com/bmw_3_series.jpg'
              },
              {
                Name: 'Mercedes-Benz C-Class',
                Year: 2021,
                Color: 'Silver',
                Rate: 3200000,
                Regno: 'MH23KL0123',
                Carimg: 'https://example.com/mercedes_c_class.jpg'
              },
              {
                Name: 'Jaguar XE',
                Year: 2023,
                Color: 'Blue',
                Rate: 3500000,
                Regno: 'UP24MN2345',
                Carimg: 'https://example.com/jaguar_xe.jpg'
              },
              {
                Name: 'Land Rover Evoque',
                Year: 2022,
                Color: 'Grey',
                Rate: 3800000,
                Regno: 'KA25OP3456',
                Carimg: 'https://example.com/land_rover_evoque.jpg'
              },
              {
                Name: 'Volvo XC60',
                Year: 2023,
                Color: 'White',
                Rate: 4000000,
                Regno: 'DL26QR4567',
                Carimg: 'https://example.com/volvo_xc60.jpg'
              }
        ];

        Cars.insertMany(carData)
            .then(() => {
                console.log('Data uploaded successfully');
                mongoose.disconnect(); // Disconnect after successful insertion
            })
            .catch(err => {
                console.error('Error uploading data:', err); // Log specific error message
                mongoose.disconnect(); // Disconnect in case of error too
            });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB Atlas:', err);
    });
