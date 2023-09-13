
const app = require('express')();
const bparser = require('body-parser');
const { Session } = require('inspector');
const mongoose = require('mongoose');
const lib_form = require("./models/libraryModel.js");
const path = require('path');

const PORT= 8080;
const apiKey='mongodb://0.0.0.0:27017/hello_web';
mongoose.connect(apiKey, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Successfully Connected to mongodb");
  })
  .catch((error) => {
    console.log("Mongo DB Error:", error);
  });
  var urlencodedParser = bparser.urlencoded({ extended: true });
// _______________ejs connection_____________

  app.set('view engine', 'ejs');

// _________________PORT_________________
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
  });

// ------------------------GET Req------------------------
const emptyFilter = {};
  app.get('/bookShelfForm',async(req,res)=>{
    res.sendFile(path.join(__dirname, './bookform.html'));
  });

  app.get('/bookform.css',async(req,res)=>{
    res.sendFile(path.join(__dirname, './bookform.css'));
  });

  // app.get('/getlibrarybook',async(req,res)=>{
  //   let bkname=req.query.bkname;
  //     try{
  //       let libbooks=await lib_form.findOne({'bkname':bkname});
  //       if(!libbooks){
  //         res.send("Sorry your book name doesn't matched no data found for this name:!")
  //       }
  //       let booklibrary= '';
  //         res.send(booklibrary);
  //         console.log("Saved book reterived");
  //     }catch(error){
  //       console.log("you got error on retriveing bookd !",error);
  //     }
  // });

  app.get('/bookShelf',async(req,res)=>{
    try {
        let results = await lib_form.find(emptyFilter).exec();
        console.log("Results found = "+results.length);
        let bookList = new Array(results.length);
        for (let i=0; i < results.length; i++){
          book = results[i];
          bookList.push(book);
          // console.log("book = "+book);
          // console.log("name = "+book.bkname);
        }
        res.render('listBookShelf', {
          listBooks: bookList
        });
    } catch(error){
      console.log("you got error on retriveing books !",error);
    }
  });

// ------------------------POST Req------------------------

  app.post('/buybook',urlencodedParser,async(req,res)=>{
    console.log("you can buy book");
    let {bkname,bktitle,bkauthor,bkprice,bkcat,bkavailability,bkstock,bkedition}=req.body;
    let bkavaliable = false;
    if( bkavailability == 1){
      bkavaliable = true;
    }
    try { 
      let books=new lib_form({
        bkname,
        bktitle,
        bkauthor,
        bkprice,
        bkcat,
        bkstock,
        bkedition,
        bkavaliable,
      });
      books.save();
      console.log("Book saved to db.");
    } catch(error){
      console.log("error is ",error);
    }
    res.send("Book Saved :)");
    });
