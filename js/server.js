import express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
initializeApp();
const db = getFirestore();
const auth = getAuth();

const app = express();
app.use(express.json());

// POST /bookings route to handle booking requests
app.post('/bookings', async (req, res) => {
  const { tripId, userId, location, price, date } = req.body;
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided.' });
  }

  try {
    // Verify the ID token from Firebase Authentication
    const decodedToken = await auth.verifyIdToken(idToken);
    if (decodedToken.uid !== userId) {
      return res.status(403).json({ success: false, message: 'Forbidden: User mismatch.' });
    }

    // Save booking to Firestore
    const bookingRef = db.collection('bookings').doc();
    await bookingRef.set({
      userId,
      tripId,
      location,
      price,
      date,
      createdAt: new Date(),
    });

    res.status(200).json({ success: true, message: 'Booking successful.' });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
