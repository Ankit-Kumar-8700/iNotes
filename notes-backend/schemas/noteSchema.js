const mongoose=require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title:{
    type: String,
    required:true
  },
  description:{
    type: String,
    required:true,
  },
  tag:{
    type: String,
    unique:"General"
  },
  img:{
    type:String,
    default:"https://w7.pngwing.com/pngs/20/774/png-transparent-emoji-notebook-text-messaging-sms-musical-note-frowning-multimedia-messaging-service-text-rectangle.png",
  },
  date:{
    type: Date,
    default:Date.now
 }
});

module.exports=mongoose.model('noteSchema',noteSchema);