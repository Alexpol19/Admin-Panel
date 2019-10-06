var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/admpanel',{ useNewUrlParser: true }, function(err){
   if(err) throw err;
   console.log('connection yes');
})