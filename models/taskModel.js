const {model,Schema} = require('mongoose')

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    
},{timestamps:true})

module.exports = model('task',TaskSchema)