var express 		= require('express'),
	app 			= express(),
	bodyParser 		= require('body-parser'),
	mongoose 		= require('mongoose'),
	passport 		= require('passport'),
	LocalStrategy 	= require('passport-local'),
	Campground 		= require('./models/campground'),
	Comment			= require('./models/comment'),
	User 			= require('./models/user'),
	seedDB			= require('./seeds')

//requiring routes
var campgroundRoutes = require('./routes/campgrounds'),
	commentRoutes 	 = require('./routes/comments'),
	indexRoutes		 = require('./routes/index')

mongoose.connect("mongodb://localhost:27017/YelpCamp_Database_v7", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

seedDB();

app.use(require("express-session")({
	secret: "My name is Pranoy..",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(req, res){
	console.log("Server has started...");
});



/*
NAMES:-

your visiting library- current time, location, map, pics, people with, ratings, would you like to show this in public
hotels and restaurants
sweets corner
mbm sugesstions corner, semesters, exams, content
quora, discord sort of
resources:- students posting resources helpful for juniors, teachers posting resources, most liked post, most followed post
*/
