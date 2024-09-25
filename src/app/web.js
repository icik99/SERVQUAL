import express from "express";
import cors from "cors";
import { publicRouter } from "../routes/public.js";
import { errorMidleware } from "../middleware/error-middleware.js";
import { createClient } from "@supabase/supabase-js";
import { logger } from "./logger.js"; // Pastikan logger diimpor

export const web = express();
web.use(express.json());

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Daftar URL yang diizinkan
        const allowedOrigins = [
            'https://servqual-fe.vercel.app',
            'http://localhost:3001'
        ];
        // Jika URL masuk dalam daftar, izinkan akses
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
};

// Use CORS middleware
web.use(cors(corsOptions));

// Ganti dengan URL dan kunci Anda
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


// Tambahkan rute dasar untuk memastikan server berjalan
web.get('/', (req, res) => {
    res.send('Server is running'); // Respons sederhana untuk uji coba
});

// Route handling
web.use(publicRouter);

// Middleware error handling
web.use(errorMidleware);
