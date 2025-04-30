import mongoose from "mongoose";
import Cars from '../models/Carmodel.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = "mongodb+srv://prabhakarans2022cse:Prabha45@prabha.geayet5.mongodb.net/carhub?retryWrites=true&w=majority&appName=Prabha"

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
                Carimg: 'https://example.com/tata_nexon.jpg'
              },
              {
                Name: 'Maruti Suzuki Swift',
                Year: 2022,
                Color: 'Red',
                Rate: 650000,
                Regno: 'DL05GH2345',
                Carimg: 'https://example.com/maruti_swift.jpg'
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
                Carimg: 'https://example.com/honda_city.jpg'
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
                Carimg: 'https://example.com/toyota_innova_crysta.jpg'
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
