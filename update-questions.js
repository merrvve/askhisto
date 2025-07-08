const admin = require("firebase-admin");
const fs = require("fs");

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");  // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function addRandomNumbersToQuestions() {
  try {
    // Get all questions from Firestore
    const questionsRef = db.collection('questions');
    const snapshot = await questionsRef.get();
    
    // Prepare batch update
    const batch = db.batch();
    let batchCount = 0;
    const batchSize = 500; // Firestore batch limit
    
    console.log(`Found ${snapshot.size} questions to update...`);
    
    snapshot.forEach(doc => {
      // Only update if random field doesn't exist or you want to regenerate
      if (!doc.data().random) {
        const docRef = questionsRef.doc(doc.id);
        batch.update(docRef, { 
          random: Math.random(),
          // You can add other fields here if needed
        });
        batchCount++;
        
        // Commit batch when we reach batch size limit
        if (batchCount % batchSize === 0) {
          batch.commit();
          console.log(`Committed batch of ${batchSize} updates`);
          // Create a new batch for the next set of updates
          batch = db.batch();
        }
      }
    });
    
    // Commit any remaining updates in the batch
    if (batchCount % batchSize !== 0) {
      await batch.commit();
      console.log(`Committed final batch of ${batchCount % batchSize} updates`);
    }
    
    console.log(`Successfully updated ${batchCount} questions with random numbers`);
  } catch (error) {
    console.error('Error updating questions:', error);
  }
}

// Run the function
addRandomNumbersToQuestions();