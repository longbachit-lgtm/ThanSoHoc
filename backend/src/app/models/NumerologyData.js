const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

// Sub-schema for top4 data
const Top4Schema = new Schema({
  numberbase: {
    num1: { type: String, default: "" },
    num2: { type: String, default: "" },
    num3: { type: String, default: "" }
  },
  top01: {
    num: { type: String, default: "" },
    year: { type: Number, default: 0 },
    age: { type: Number, default: 0 }
  },
  top02: {
    num: { type: String, default: "" },
    year: { type: Number, default: 0 },
    age: { type: Number, default: 0 }
  },
  top03: {
    num: { type: String, default: "" },
    year: { type: Number, default: 0 },
    age: { type: Number, default: 0 }
  },
  top04: {
    num: { type: String, default: "" },
    year: { type: Number, default: 0 },
    age: { type: Number, default: 0 }
  }
}, { _id: false });

const NumerologyData = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  // Input data
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  birthDayString: {
    type: String,
    required: true
  },
  birthDayList: {
    type: String,
    required: true
  },

  // Number Karma (from birth date)
  number: {
    type: Number,
    default: 0
  },
  atitute: {
    type: Number,
    default: 0
  },
  day_birth: {
    type: Number,
    default: 0
  },
  arrow: {
    type: [String],
    default: []
  },
  lack_arrow: {
    type: [String],
    default: []
  },
  top4: {
    top4_peak: Top4Schema,
    top4_challenge: Top4Schema
  },
  strong_list: {
    type: [Number],
    default: []
  },
  weak_list: {
    type: [Number],
    default: []
  },

  // Number Name (from full name)
  destiny: {
    type: Number,
    default: 0
  },
  name: {
    type: Number,
    default: 0
  },
  inner: {
    type: String,
    default: "0"
  },
  express: {
    type: Number,
    default: 0
  },
  soul: {
    type: Number,
    default: 0
  },
  mature: {
    type: Number,
    default: 0
  },
  full_name_number: {
    type: String,
    default: ""
  },
  full_name_list: {
    type: String,
    default: ""
  },

  // Metadata
  version: {
    type: Number,
    default: 1
  },
  calculatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add plugins
NumerologyData.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

// Static methods
NumerologyData.statics.findByUserId = async function (userId) {
  try {
    return await this.findOne({
      userId,
      deletedAt: null
    }).lean(); // Use lean() for read-only queries (faster)
  } catch (error) {
    console.error("Find numerology data error:", error);
    return null;
  }
};

NumerologyData.statics.upsertByUserId = async function (userId, data) {
  try {
    // Find existing record
    const existing = await this.findOne({
      userId,
      deletedAt: null
    });

    if (existing) {
      // Update existing
      Object.assign(existing, data);
      existing.calculatedAt = new Date();
      existing.version += 1;

      console.log('existing', existing)
      await existing.save();
      return existing;
    } else {
      // Create new
      const newData = new this({
        userId,
        ...data,
        calculatedAt: new Date()
      });
      await newData.save();
      return newData;
    }
  } catch (error) {
    console.error("Upsert numerology data error:", error);
    throw error;
  }
};

NumerologyData.statics.getHistory = async function (userId, page = 1, limit = 10) {
  try {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.find({ userId, deletedAt: null })
        .select('fullName birthDate calculatedAt createdAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.countDocuments({ userId, deletedAt: null })
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error("Get history error:", error);
    throw error;
  }
};

module.exports = mongoose.model("NumerologyData", NumerologyData);

