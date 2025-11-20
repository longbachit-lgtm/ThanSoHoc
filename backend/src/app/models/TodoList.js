const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

// Sub-schema for individual todo items
const TodoItemSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, { _id: true, timestamps: true });

// Sub-schema for todo sections (like "Tính chất chung", "Mục đích sống", "Note 1")
const TodoSectionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  items: {
    type: [TodoItemSchema],
    default: []
  },
  isExpanded: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { _id: true, timestamps: true });

const TodoList = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // Đảm bảo mỗi userId chỉ có 1 document
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    default: "Danh sách việc cần làm"
  },
  sections: {
    type: [TodoSectionSchema],
    default: []
  },
  period: {
    type: String,
    enum: ['today', 'tomorrow', 'week', 'month', 'year', 'custom'],
    default: 'custom'
  },
  targetDate: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add plugins
TodoList.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

// Static methods
TodoList.statics.findByUserId = async function (userId, period = null) {
  try {
    const query = {
      userId,
      deletedAt: null,
      isActive: true
    };
    
    if (period) {
      query.period = period;
    }
    
    return await this.find(query)
      .sort({ createdAt: -1 })
      .lean();
  } catch (error) {
    console.error("Find todo list error:", error);
    return [];
  }
};

TodoList.statics.findActiveByUserId = async function (userId) {
  try {
    // Chỉ tìm 1 document duy nhất cho userId (vì đã có unique constraint)
    return await this.findOne({
      userId,
      deletedAt: null,
      isActive: true
    }).lean();
  } catch (error) {
    console.error("Find active todo list error:", error);
    return null;
  }
};

// Upsert method: update nếu tồn tại, create nếu chưa có
TodoList.statics.upsertByUserId = async function (userId, data) {
  try {
    // Tìm document hiện tại
    const existing = await this.findOne({
      userId,
      deletedAt: null
    });
    
    if (existing) {
      // Update existing document
      Object.assign(existing, data);
      existing.isActive = true;
      await existing.save();
      return existing;
    } else {
      // Create new document
      const newTodoList = new this({
        userId,
        ...data,
        isActive: true
      });
      await newTodoList.save();
      return newTodoList;
    }
  } catch (error) {
    console.error("Upsert todo list error:", error);
    throw error;
  }
};

TodoList.statics.getByPeriod = async function (userId, period, targetDate = null) {
  try {
    // Chỉ tìm 1 document duy nhất cho userId (không filter theo period vì chỉ có 1 document)
    // Period chỉ là metadata để frontend biết context
    return await this.findOne({
      userId,
      deletedAt: null,
      isActive: true
    }).lean();
  } catch (error) {
    console.error("Get todo by period error:", error);
    return null;
  }
};

module.exports = mongoose.model("TodoList", TodoList);

