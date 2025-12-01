const mongoose = require('mongoose');

async function connect() {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thansohoc';
        
        await mongoose.connect(MONGODB_URI);
        
        console.log('✅ Connect to MongoDB successfully!!!');
        console.log(`📊 Database: ${mongoose.connection.name}`);
        
        // Create indexes on startup (idempotent)
        await createIndexes();
    } catch (error) {
        console.error('❌ Connect to MongoDB failure!!!', error);
        process.exit(1);
    }
}

// Helper function to safely create index
async function safeCreateIndex(collection, indexSpec, options = {}) {
    try {
        // Get existing indexes
        const existingIndexes = await collection.indexes();
        
        // Find index with same key specification
        const indexKeyStr = JSON.stringify(indexSpec);
        const existingIndex = existingIndexes.find(idx => 
            JSON.stringify(idx.key) === indexKeyStr
        );
        
        if (existingIndex) {
            // Index with same key already exists, check if options match
            const optionsMatch = 
                (existingIndex.unique === !!options.unique) &&
                (existingIndex.sparse === !!options.sparse);
            
            if (optionsMatch) {
                // Index exists and matches - no need to create
                return;
            } else {
                // Options don't match - drop old index first
                try {
                    await collection.dropIndex(existingIndex.name);
                } catch (dropError) {
                    // Ignore drop errors (might already be dropped)
                }
            }
        }
        
        // Create index (with explicit name if provided)
        const createOptions = options.name ? { ...options, name: options.name } : options;
        await collection.createIndex(indexSpec, createOptions);
        
    } catch (error) {
        // Only log non-ignorable errors
        if (!error.message.includes('already exists') && 
            !error.message.includes('duplicate key') &&
            !error.message.includes('IndexOptionsConflict') &&
            !error.message.includes('IndexKeySpecsConflict')) {
            console.warn(`⚠️ Warning creating index: ${error.message}`);
        }
    }
}

// Create indexes for optimal performance
async function createIndexes() {
    try {
        const User = mongoose.model('User');
        const NumerologyData = mongoose.model('NumerologyData');
        
        // User indexes
        // Note: Mongoose automatically creates index for unique fields (like username),
        // so we use safeCreateIndex which will skip if already exists
        
        await safeCreateIndex(User.collection, { username: 1 }, { unique: true });
        await safeCreateIndex(User.collection, { email: 1 }, { unique: true, sparse: true });
        await safeCreateIndex(User.collection, { refreshToken: 1 }, { sparse: true });
        await safeCreateIndex(User.collection, { createdAt: -1 });
        
        // NumerologyData indexes
        await safeCreateIndex(NumerologyData.collection, { userId: 1, deletedAt: 1 });
        await safeCreateIndex(NumerologyData.collection, { userId: 1, createdAt: -1 });
        await safeCreateIndex(NumerologyData.collection, { fullName: "text" });
        await safeCreateIndex(NumerologyData.collection, { birthDate: 1 });
        
        console.log('✅ Database indexes verified/created successfully');
    } catch (error) {
        console.warn('⚠️ Index creation warning:', error.message);
    }
}

module.exports = { connect };

