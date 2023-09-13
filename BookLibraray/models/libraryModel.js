const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const libShelfStructure= new Schema({
    bkname:String,
    bktitle:String,
    bkauthor:String,
    bkedition:String,
    bkcat:String,
    bkprice:Number,
    bkstock:Number,
    bkavaliable:Boolean,
}); 

module.exports = mongoose.model("lib_form", libShelfStructure);