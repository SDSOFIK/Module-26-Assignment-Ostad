const mongoose = require("mongoose");


const newsSchema = mongoose.Schema({

    title:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        required: true
    },
    photo:{
        type:String ,
        default: " "
    },

    category: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)


module.exports= mongoose.model("News" , newsSchema );