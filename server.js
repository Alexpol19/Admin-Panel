require('./models/db');
var mongoose=require('mongoose');
// mongoose model
var Category=require('./models/categ.model');

var express=require('express');
var bodyParser=require('body-parser');
// packet for working with files
var fs=require('fs')
// ----------
// path for getting filename
const path=require('path')
// packet for treatment image request
const multer = require('multer')
// local when saves files
const storage=multer.diskStorage({
   // directory 
   destination: (req, file, cb)=>{
      cb(null, 'data')
   },
   // file
   filename: (req, file , cb)=>{
      cb(null, Date.now()+path.extname(file.originalname))
   }
})
// describe multer. and write that load 1 single file
const upload=multer({
   storage,
   limit: {fielSize: 2*1024*1024,}
}).single('photo')
// --------
// this amd Use cors- decide the problem of sending data on client
var cors=require('cors');
var app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
 
// get static files
app.use(express.static(__dirname + "/data"));

// Routes:

// get full data
app.get('/data', async (req,res)=>{
   const data=await Category.find({})
   res.send(data);
})
// create new categ or subcateg
app.post('/newcateg', async (req,res)=>{
   // if exists categId
   if(req.body.categId){
      await Category.find({}, async(err,categs)=>{
         if(err) throw err;
         // recursive function for find category by id in the subcategories...
         let findCategory=async(categs)=>{
            await categs.map(async(category)=>{
               if(category._id==req.body.categId){

                  await category.categories.push({
                     _id: new mongoose.Types.ObjectId(),
                     name: req.body.name,
                     description: req.body.description,
                  })
                  
               } else{
                  if(category.categories.length !=0){
                     await findCategory(category.categories)
                  }
               }
               // save category when maked something
               await category.save((err)=>{
                  if(err) throw err;
               })
            })
         }

         // First call recursive search
         await findCategory(categs)

         

      })
      Category.find({}).exec((err, categs)=>{
         res.send(categs);
      })

   }
   // if not categId make Extern Category
   else{
      var newCateg=new Category({
         _id: new mongoose.Types.ObjectId(),
         name: req.body.name,
         description: req.body.description,
         
      });
      await newCateg.save((err)=>{
         if(err) throw err;
      })
      Category.find({}).exec((err, categs)=>{
      res.send(categs);
      })
   }
})
// delete category by id and all photo in the posts in the allSubcategories
app.get('/del/:categId', async(req,res)=>{
   const categId=req.params.categId;
   // find category, or subcategory on all levels
   await Category.find({}, async (err, categs)=>{
      if(err) throw err;
      // recursive function for find category by id in the subcategories...
      let findCategory=(categs)=>{
         categs.map(async(category)=>{
            if(category._id==categId){
               // removecategory
               await category.remove();
               // remove images work only for posts in current Category(or Subcategory)
               let deleteImages=async (posts)=>{
                  await posts.map((post)=>{
                     console.log('1')
                     var filePath=__dirname+'/data/'+post.photo
                     if(filePath !=''){fs.unlink(filePath, (err)=>{
                        if(err && err.code == 'ENOENT') {
                           // file doens't exist
                           console.info("File doesn't exist, won't remove it.");
                        } else if (err) {
                           // other errors, e.g. maybe we don't have enough permission
                           console.error("Error occurred while trying to remove file");
                        } else {
                           console.info('removed');
                        }
                     });
                     }
                  })
               }
               // del images in current category(called one time fro Current Category)
               await deleteImages(category.postsData)
               // del images in all subCategs(called each time when exists ...categories!=0)
               let delAllSubImages=async(categs)=>{
                  await categs.map(async(categor)=>{
                     await deleteImages(categor.postsData)

                     if(categor.categories !=0){
                        await delAllSubImages(categor.categories)
                     }
                  })  
               }  
               // find categoryes in this category for deleting all images
               if(category.categories !=0){
                  await delAllSubImages(category.categories)
               }               
            } else{
               if(category.categories.length !=0){
                  await findCategory(category.categories)
               }
            }
            // save category when maked something
            await category.save((err)=>{
               if(err) throw err;
            }) 
         })
      }
      // First call recursive search
      await findCategory(categs)
   })
   // send data after deleting category/subcategory
   Category.find({}).exec((err, categs)=>{
      res.send(categs);
   })
})
// new img sent on server
app.post('/sendimg', (req,res)=>{
   // call my upload
   upload(req,res, err=>{
      let error='';
      if(err){      
         if(err.code === 'LIMIT_FILE_SIZE'){
            error='Image very big(max 2 mb)'
         } 
      }
      // get result-filename for imgurl
      res.json({
         filename: req.file.filename,
         ok: !!error,
         error
      })
   })
})
// create new Post with photo- unnecessarry photos delete
app.post('/newpost', async (req,res)=>{
   // remove unnecessarry photos 
   req.body.delPhotos.map((photo)=>{
      var filePath=__dirname+'/data/'+photo
      if(filePath !=''){fs.unlink(filePath, (err)=>{
         if(err && err.code == 'ENOENT') {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
         } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
         } else {
            console.info('removed');
         }
      });
      }
   })
   
   // create new post
   const categId=req.body.categid;

   // find category on all levels
   await Category.find({}, (err, categs)=>{
      if(err) throw err;
      // recursive function for find category by id in the subcategories...
      let findCategory=(categs)=>{
         categs.map(async(category)=>{
            if(category._id==categId){
               // push new post
               await category.postsData.push({
                  _id: new mongoose.Types.ObjectId(),
                  name: req.body.post.name,
                  description: req.body.post.description,
                  photo: req.body.post.photo,
               });
               // send data only for current Category
               res.send(category.postsData); 
               
            } else{
               if(category.categories.length !=0){
                  findCategory(category.categories)
               }
            }
            // save category when maked something
            await category.save((err)=>{
               if(err) throw err;
            })
                
         })
      }
      // First call recursive search
      findCategory(categs)
      
   })
})
// update some photo dates
app.post('/updpost', async (req,res)=>{
   // remove unnecessarry photos
   req.body.delPhotos.map((photo)=>{
      var filePath=__dirname+'/data/'+photo
      if(filePath !=''){fs.unlink(filePath, (err)=>{
         if(err && err.code == 'ENOENT') {
            // file doens't exist
            console.info("File doesn't exist, won't remove it.");
         } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Error occurred while trying to remove file");
         } else {
            console.info('removed');
         }
      });
      }
   })

   // update some post
   const categId=req.body.categid;
   const newpost=req.body.post;

   // find category on all levels
   await Category.find({}, (err, categs)=>{
      if(err) throw err;
      // recursive function for find category by id in the subcategories...
      let findCategory=(categs)=>{
         categs.map(async(category)=>{
            if(category._id==categId){
               // edit post
               await category.postsData.map((post)=>{
                  if(post._id==newpost.id){
                     post.name=newpost.name;
                     post.description=newpost.description;
                     post.photo=newpost.photo;
                     post.datePublication= new Date;
                  }
                  return post;
               })
               // category.save((err)=>{
               //    if(err) throw err;
               // })
               // send data only for current post
               var sendpost=category.postsData.id(newpost.id)
               res.send(sendpost);
            } else{
               if(category.categories.length !=0){
                  findCategory(category.categories)
               }
            }
            // save category when maked something
            await category.save((err)=>{
               if(err) throw err;
            })
                
         })
      }
      // First call recursive search
      findCategory(categs) 
   })
})
// delete post- with photo on server
app.get('/del/:categid/:postid', async(req, res)=>{
   // delete some post by id
   const categId=req.params.categid;
   const postid=req.params.postid;
   // find category on all levels
   await Category.find({}, (err, categs)=>{
      if(err) throw err;
      // recursive function for find category by id in the subcategories...
      let findCategory=(categs)=>{
         categs.map(async(category)=>{
            if(category._id==categId){
               // delete post
               var filePath=__dirname+'/data/'+category.postsData.id(postid).photo
               if(filePath !=''){fs.unlink(filePath, (err)=>{
                  if(err && err.code == 'ENOENT') {
                     // file doens't exist
                     console.info("File doesn't exist, won't remove it.");
               } else if (err) {
                     // other errors, e.g. maybe we don't have enough permission
                     console.error("Error occurred while trying to remove file");
               } else {
                     console.info('removed');
               }
               });}
               
               category.postsData.id(postid).remove();    
               // send data only for current Category
               res.send(category.postsData);           
            } else{
               if(category.categories.length !=0){
                  findCategory(category.categories)
               }
            }
            // save category when maked something
            category.save((err)=>{
               if(err) throw err;
            })
               
         })
      }
      // First call recursive search
      findCategory(categs)
   })
})

app.listen(4000, ()=>{
   console.log('Server listening at 4000');
})