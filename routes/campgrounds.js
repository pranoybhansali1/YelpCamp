var express 	  = require('express');
var router 		  = express.Router();
var Campground    = require('../models/campground');
var middlewareObj = require('../middleware');

//INDEX
router.get("/", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			//where it will be used
			req.flash("error", "Please reload the page..");
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

//CREATE
router.post("/", middlewareObj.isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, image: image, description: description, author: author};
	
	Campground.create(newCampground, function(err, newlycreated){
		if(err){
			req.flash("error", "Campground not created..");
			console.log(err);
		} else {
			req.flash("success", "Campground created successfully..");
			console.log("newly = " + newlycreated);
			res.redirect("/campgrounds");
		}
	});
});

//NEW
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//SHOW
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			req.flash("error", "Campground not found");
			console.log(err);
		} else{
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//EDIT AND UPDATE
router.get("/:id/edit", middlewareObj.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if (err) {
			req.flash("error", "Campground not found");
		} else {
			res.render("campgrounds/edit", {campground: foundCampground});
		}
	});
});

router.put("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if (err){
			req.flash("error", "Please edit campground again..!!");
			res.redirect("/campgrounds");
		} else {
			req.flash("info", "Campground updated successfully..!!");
			res.redirect("/campgrounds/" + req.params.id);
		}	
	});
});

router.delete("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if (err){
			req.flash("error", "Deletion Failed..We are sorry for that..!!");
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground deleted successfully..!!");
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;
