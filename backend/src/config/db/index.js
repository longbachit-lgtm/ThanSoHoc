const mongoose = require('mongoose');

async function connect() {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thansohoc';
        
        await mongoose.connect(MONGODB_URI, {
            useUnifiedTopology: true,
        });
        
        console.log('✅ Connect to MongoDB successfully!!!');
        console.log(`📊 Database: ${mongoose.connection.name}`);
        
        // Create indexes on startup (idempotent)
        await createIndexes();
    } catch (error) {
        console.error('❌ Connect to MongoDB failure!!!', error);
        process.exit(1);
    }
}

// Create indexes for optimal performance
async function createIndexes() {
    try {
        const User = mongoose.model('User');
        const NumerologyData = mongoose.model('NumerologyData');
        
        // User indexes
        await User.collection.createIndex({ username: 1 }, { unique: true });
        await User.collection.createIndex({ email: 1 }, { unique: true, sparse: true });
        await User.collection.createIndex({ refreshToken: 1 }, { sparse: true });
        await User.collection.createIndex({ createdAt: -1 });
        
        // NumerologyData indexes
        await NumerologyData.collection.createIndex({ userId: 1, deletedAt: 1 });
        await NumerologyData.collection.createIndex({ userId: 1, createdAt: -1 });
        await NumerologyData.collection.createIndex({ fullName: "text" });
        await NumerologyData.collection.createIndex({ birthDate: 1 });
        
        console.log('✅ Database indexes created successfully');
    } catch (error) {
        console.warn('⚠️ Index creation warning:', error.message);
    }
}

module.exports = { connect };

