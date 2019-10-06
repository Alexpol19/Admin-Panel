var mongoose=require('mongoose');
//create Schema and model

var Schema=mongoose.Schema;

// Schema for post
var PostSchema= new Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: String,
   photo: String,
   description: String,
   datePublication: {
      type: Date,
      default: Date.now
   },
});
// Schema for Category, Subcategory
var CategSchema=new Schema({
   _id: mongoose.Schema.Types.ObjectId,
   postsData: [PostSchema], 
   // categories: [SubcategSchema],
   name: String,
   description: String,
})

// recursive prop add after creating Schema
CategSchema.add({
   categories: [CategSchema]
})


var Category=mongoose.model('Category', CategSchema);

module.exports=Category;