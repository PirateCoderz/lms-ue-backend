const mongoose = require("mongoose");

const courseMaterialSchema = new mongoose.Schema({
  link: {        
    type: String,
  },             
  fileName: {    
    type: String,
  },             
  course: {      
    type: String,
  },             
  uploadDate: {  
    type: Date,  
    default: Date.now,
  },
});

const materials = mongoose.model("materials", courseMaterialSchema);

exports.materials = materials;
