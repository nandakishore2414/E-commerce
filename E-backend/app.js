import 'dotenv/config';
import express from 'express';
import session from 'express-session'
import { connectDB } from './utils/db.js';
import router from './route/AdminRoute.js';
import MongoStore from 'connect-mongo';
import UserRouter from './route/userRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      "Content-Type",
      "Authorisation",
      "Cache-Control",
      "Expires",
      "Pragma"
    ],
    credentials: true,
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

await connectDB();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60,
    sameSite: 'lax',
    httpOnly: true,
    secure: false
  }
}));

app.use('/', router);
app.use('/', UserRouter);

app.get('/', (req, res) => res.send('<h1>E-commerce Backend Running</h1>'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server now running on ${port}`);
  console.log(`Serving uploads from ${path.join(__dirname, 'uploads')}`);
});