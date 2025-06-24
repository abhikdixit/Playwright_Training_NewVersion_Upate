exports.noteSchema = {
  type: "object",
  required: ["success", "status", "message", "data"],
  properties: {
    success: { type: "boolean" },
    status: { type: "number" },
    message: { type: "string" },
    data: {
      type: "object",
      required: ["id", "title", "description", "category", "completed", "created_at", "updated_at", "user_id"],
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        category: { type: "string" },
        completed: { type: "boolean" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
        user_id: { type: "string" }
      }
    }
  }
};
