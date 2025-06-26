// Test script to create sample logs for testing
const mongoose = require('mongoose');

// Log schema (simplified for testing)
const logSchema = new mongoose.Schema({
  action: { type: String, enum: ['Denied', 'Accepted'], required: true },
  screenshot: { type: String },
  plateId: { type: String },
  carDetection: { type: [[Number]], default: [] },
  plateDetection: { type: [[Number]], default: [] },
  accessTime: { type: Date, default: Date.now, required: true },
  processed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  garage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garage',
    required: true,
  },
});

const Logs = mongoose.model('Logs', logSchema);

// Connect to database (using the same connection string from config.env)
async function createTestLogs() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      'mongodb://youssef:i5plAD1iJSHDnaGf@gateguard-shard-00-02.kbzsp.mongodb.net:27017,gateguard-shard-00-01.kbzsp.mongodb.net:27017,gateguard-shard-00-00.kbzsp.mongodb.net:27017/?authSource=admin&replicaSet=atlas-ci5r6o-shard-0&ssl=true',
    );

    console.log('Connected to MongoDB');

    // Sample garage ID from your database
    const garageId = '67d39c13bc2dd1deb37aacff'; // swiiiify Mall

    // Create test logs
    const testLogs = [
      {
        action: 'Accepted',
        plateId: 'ABC123',
        accessTime: new Date(),
        processed: false,
        garage: garageId,
        screenshot: 'sample_screenshot_1.jpg',
      },
      {
        action: 'Denied',
        plateId: 'XYZ789',
        accessTime: new Date(Date.now() - 5000), // 5 seconds ago
        processed: false,
        garage: garageId,
        screenshot: 'sample_screenshot_2.jpg',
      },
      {
        action: 'Accepted',
        plateId: 'DEF456',
        accessTime: new Date(Date.now() - 10000), // 10 seconds ago
        processed: true, // This one is already processed
        garage: garageId,
        screenshot: 'sample_screenshot_3.jpg',
      },
    ];

    // Insert test logs
    const insertedLogs = await Logs.insertMany(testLogs);
    console.log('Test logs created:', insertedLogs.length);
    console.log('Sample log IDs:');
    insertedLogs.forEach((log) => {
      console.log(`- ${log._id} (${log.action}, processed: ${log.processed})`);
    });
  } catch (error) {
    console.error('Error creating test logs:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createTestLogs();
