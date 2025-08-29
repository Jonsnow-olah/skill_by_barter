import express from 'express';
import type { Request, Response } from 'express';
import { initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { Storage } from '@google-cloud/storage';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define user data interface
interface User {
  id: string;
  name: string;
  skillOffered: string;
  skillWanted: string;
  location: { lat: number; lng: number };
  yearsOfExperience: number;
  profilePicture: string;
  proofOfWork: string[];
}

// Validate environment variables
const requiredEnvVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing environment variable: ${envVar}`);
  }
}

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.FIREBASE_PROJECT_ID!,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.FIREBASE_APP_ID!
};

// Initialize Firebase
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(firebaseApp);
const storage = new Storage();
const bucket = storage.bucket(process.env.FIREBASE_STORAGE_BUCKET!);
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/users', async (_req: Request, res: Response) => {
  try {
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);
    const users: User[] = userSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as User));
    res.json(users);
  } catch (error) {
    console.error('Firestore error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const { name, skillOffered, skillWanted, location, yearsOfExperience } = req.body as Partial<User>;
    if (!name || !skillOffered || !skillWanted || !location || location.lat === undefined || location.lng === undefined || yearsOfExperience === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const userRef = await addDoc(collection(db, 'users'), {
      name,
      skillOffered,
      skillWanted,
      location: { lat: location.lat, lng: location.lng },
      yearsOfExperience,
      profilePicture: '',
      proofOfWork: []
    });
    res.json({ id: userRef.id, name, skillOffered, skillWanted, lat: location.lat, lng: location.lng, yearsOfExperience });
  } catch (error) {
    console.error('Firestore error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });
    const fileName = `${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);
    const stream = fileUpload.createWriteStream({
      metadata: { contentType: file.mimetype }
    });
    stream.on('error', (err) => {
      console.error('Storage error:', err);
      res.status(500).json({ error: 'Upload failed' });
    });
    stream.on('finish', async () => {
      const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      res.json({ url });
    });
    stream.end(file.buffer);
  } catch (error) {
    console.error('Storage error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));