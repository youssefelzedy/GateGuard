import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../config.env' }); // Make sure to specify the path

const dbConnect = async () => {
  try {
    // Add connection options for better compatibility
    const conn = await mongoose.connect(process.env.DATABASE as string, {
      dbName: 'gateguard',
      // Add these options for better connection handling
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `DB Connected Successfully: ${conn.connection.host}\n-------------------------`,
    );
    console.log(`Connected to database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Database connection failed:`, error);
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default dbConnect;
