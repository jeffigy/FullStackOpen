const { model, Schema } = require("mongoose");
const transformToJSON = require("../utils/mongoose-transform.util");

const noteSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  important: {
    type: Boolean,
    default: false,
    require: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

transformToJSON(noteSchema);

module.exports = model("note", noteSchema);
