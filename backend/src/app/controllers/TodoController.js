const TodoList = require("../models/TodoList");
const User = require("../models/User");
const { sendSuccess, sendError } = require("../utils/response");

class TodoController {
  // Create a new todo list
  create = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { title, sections, period, targetDate } = req.body;

      // Verify user exists
      const user = await User.getUserById(userId);
      if (!user) {
        return sendError(res, "User không tồn tại.", 404);
      }

      // Create new todo list
      const todoList = new TodoList({
        userId,
        title: title || "Danh sách việc cần làm",
        sections: sections || [],
        period: period || 'custom',
        targetDate: targetDate ? new Date(targetDate) : null,
        isActive: true
      });

      await todoList.save();

      return sendSuccess(
        res,
        todoList,
        "Tạo danh sách việc cần làm thành công.",
        201
      );
    } catch (error) {
      console.error("Create todo list error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi tạo danh sách, vui lòng thử lại.",
        500
      );
    }
  };

  // Get all todo lists for user
  getAll = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { period } = req.query;

      const todoLists = await TodoList.findByUserId(userId, period || null);

      return sendSuccess(
        res,
        todoLists,
        "Lấy danh sách thành công.",
        200
      );
    } catch (error) {
      console.error("Get todo lists error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi lấy danh sách, vui lòng thử lại.",
        500
      );
    }
  };

  // Get active todo list
  getActive = async (req, res) => {
    try {
      const userId = req.user.userId;

      const todoList = await TodoList.findActiveByUserId(userId);

      if (!todoList) {
        // Return empty structure if no todo list exists
        return sendSuccess(
          res,
          {
            _id: null,
            title: "Danh sách việc cần làm",
            sections: [],
            period: 'custom',
            targetDate: null
          },
          "Chưa có danh sách việc cần làm.",
          200
        );
      }

      return sendSuccess(
        res,
        todoList,
        "Lấy danh sách thành công.",
        200
      );
    } catch (error) {
      console.error("Get active todo list error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi lấy danh sách, vui lòng thử lại.",
        500
      );
    }
  };

  // Get todo list by period
  getByPeriod = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { period, targetDate } = req.query;

      if (!period) {
        return sendError(res, "Period là bắt buộc.", 400);
      }

      const todoList = await TodoList.getByPeriod(
        userId,
        period,
        targetDate ? new Date(targetDate) : null
      );

      if (!todoList) {
        return sendSuccess(
          res,
          {
            _id: null,
            title: "Danh sách việc cần làm",
            sections: [],
            period,
            targetDate: targetDate ? new Date(targetDate) : null
          },
          "Chưa có danh sách cho period này.",
          200
        );
      }

      return sendSuccess(
        res,
        todoList,
        "Lấy danh sách thành công.",
        200
      );
    } catch (error) {
      console.error("Get todo by period error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi lấy danh sách, vui lòng thử lại.",
        500
      );
    }
  };

  // Update todo list
  update = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;
      const { title, sections, period, targetDate, isActive } = req.body;

      const todoList = await TodoList.findOne({
        _id: id,
        userId,
        deletedAt: null
      });

      if (!todoList) {
        return sendError(res, "Không tìm thấy danh sách.", 404);
      }

      // Update fields
      if (title !== undefined) todoList.title = title;
      if (sections !== undefined) {
        // Ensure sections is an array
        if (Array.isArray(sections)) {
          todoList.sections = sections;
        } else {
          return sendError(res, "Sections phải là một mảng.", 400);
        }
      }
      if (period !== undefined) todoList.period = period;
      if (targetDate !== undefined) {
        todoList.targetDate = targetDate ? new Date(targetDate) : null;
      }
      if (isActive !== undefined) todoList.isActive = isActive;

      await todoList.save();

      return sendSuccess(
        res,
        todoList,
        "Cập nhật danh sách thành công.",
        200
      );
    } catch (error) {
      console.error("Update todo list error:", error);
      console.error("Error details:", error.message, error.stack);
      return sendError(
        res,
        error.message || "Có lỗi xảy ra khi cập nhật danh sách, vui lòng thử lại.",
        500
      );
    }
  };

  // Update section (add, update, delete section)
  updateSection = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;
      const { sectionId, action, sectionData } = req.body;

      const todoList = await TodoList.findOne({
        _id: id,
        userId,
        deletedAt: null
      });

      if (!todoList) {
        return sendError(res, "Không tìm thấy danh sách.", 404);
      }

      if (action === 'add') {
        // Add new section
        todoList.sections.push({
          title: sectionData.title || 'Section mới',
          items: sectionData.items || [],
          isExpanded: sectionData.isExpanded !== undefined ? sectionData.isExpanded : true,
          order: todoList.sections.length
        });
      } else if (action === 'update' && sectionId) {
        // Update existing section
        const sectionIndex = todoList.sections.findIndex(
          s => s._id.toString() === sectionId
        );
        if (sectionIndex !== -1) {
          if (sectionData.title !== undefined) todoList.sections[sectionIndex].title = sectionData.title;
          if (sectionData.items !== undefined) todoList.sections[sectionIndex].items = sectionData.items;
          if (sectionData.isExpanded !== undefined) todoList.sections[sectionIndex].isExpanded = sectionData.isExpanded;
          if (sectionData.order !== undefined) todoList.sections[sectionIndex].order = sectionData.order;
        }
      } else if (action === 'delete' && sectionId) {
        // Delete section
        todoList.sections = todoList.sections.filter(
          s => s._id.toString() !== sectionId
        );
      }

      await todoList.save();

      return sendSuccess(
        res,
        todoList,
        "Cập nhật section thành công.",
        200
      );
    } catch (error) {
      console.error("Update section error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi cập nhật section, vui lòng thử lại.",
        500
      );
    }
  };

  // Update todo item (toggle complete, update text)
  updateItem = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;
      const { sectionId, itemId, action, itemData } = req.body;

      const todoList = await TodoList.findOne({
        _id: id,
        userId,
        deletedAt: null
      });

      if (!todoList) {
        return sendError(res, "Không tìm thấy danh sách.", 404);
      }

      const section = todoList.sections.id(sectionId);
      if (!section) {
        return sendError(res, "Không tìm thấy section.", 404);
      }

      if (action === 'add') {
        // Add new item
        section.items.push({
          text: itemData.text || '',
          completed: false,
          order: section.items.length
        });
      } else if (action === 'update' && itemId) {
        // Update existing item
        const item = section.items.id(itemId);
        if (item) {
          if (itemData.text !== undefined) item.text = itemData.text;
          if (itemData.completed !== undefined) item.completed = itemData.completed;
          if (itemData.order !== undefined) item.order = itemData.order;
        }
      } else if (action === 'toggle' && itemId) {
        // Toggle complete status
        const item = section.items.id(itemId);
        if (item) {
          item.completed = !item.completed;
        }
      } else if (action === 'delete' && itemId) {
        // Delete item
        section.items = section.items.filter(
          i => i._id.toString() !== itemId
        );
      }

      await todoList.save();

      return sendSuccess(
        res,
        todoList,
        "Cập nhật item thành công.",
        200
      );
    } catch (error) {
      console.error("Update item error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi cập nhật item, vui lòng thử lại.",
        500
      );
    }
  };

  // Delete todo list (soft delete)
  delete = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { id } = req.params;

      const todoList = await TodoList.findOne({
        _id: id,
        userId,
        deletedAt: null
      });

      if (!todoList) {
        return sendError(res, "Không tìm thấy danh sách.", 404);
      }

      await todoList.delete(); // Soft delete

      return sendSuccess(
        res,
        null,
        "Xóa danh sách thành công.",
        200
      );
    } catch (error) {
      console.error("Delete todo list error:", error);
      return sendError(
        res,
        "Có lỗi xảy ra khi xóa danh sách, vui lòng thử lại.",
        500
      );
    }
  };
}

module.exports = new TodoController();

