//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// Using lodash to stdand names for routes
const _ = require("lodash")
//Require mongoose
const mongoose = require("mongoose");



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

//Connecting to mongoose
mongoose.connect('mongodb+srv://admin-george:george123@cluster0.5j0sm.mongodb.net/blogDB?retryWrites=true&w=majority');
// creating schema
const postSchema= {
  title:String,
  content:String
};
//Creating model
const Post = mongoose.model("Post", postSchema);


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// creating array
// let posts = [];
// Adding home page
app.get("/", function(req, res){
  Post.find({}, function(err, posts){
  res.render("home",{
    homeS1Content: homeStartingContent,
    posts: posts

  })
  // adding compose to main page

})
})

// Adding About page
app.get("/about", function(req, res){
  res.render("about",{
    aboutS1Content: aboutContent
  })
})
// Adding constactS1Content
app.get("/contact", function(req, res){
  res.render("contact",{
    contactS1Content: contactContent
  })
})


app.get("/compose", function(req, res){
  res.render("compose")
})
// defining post request using body parser by req.body + our var
app.post("/compose", function(req, res){
  // creating js Object()
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  })
  // posts.push(post)
  post.save(function(err){
    if(!err){
      res.redirect("/")
    }
  })
})

// using route params
app.get("/posts/:postId", function(req, res){

  const requestPostId = req.params.postID;

  Post.findOne({_id:requestPostId}, function(err, post){
    res.render("post", {
      title:post.title,
      content: post.content
    })
  })

  // const requestedTitle = _.lowerCase(req.params.postName)
  // posts.forEach(function(post){
  //   let storedTitle = _.lowerCase(post.title)
  //
  //   if(storedTitle === requestedTitle){
  //     // console.log("Match found")
  //     res.render("post",{
  //       // using post Object from above
  //       title :post.title,
  //       content :post.content
  //     })
  //   }
  // })
})






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
