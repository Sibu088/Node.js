"use strict";

const User = require("../models/user");

const getUserParams = body => {
  return {
    name: {
      first: body.first,
      last: body.last
    },
    email: body.email,
    password: body.password,
    zipCode: body.zipCode
  };
};

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        req.flash("success", "Users loaded successfully.");
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        req.flash("error", "Failed to load users.");
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("users/index");
  },

  new: (req, res) => {
    res.render("users/new");
  },

  create: (req, res, next) => {
    let userParams = getUserParams(req.body);
    User.create(userParams)
      .then(user => {
        req.flash("success", `${user.fullName}'s account was created successfully!`);
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        req.flash("error", `Failed to create user account: ${error.message}`);
        res.locals.redirect = "/users/new";
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) {
      res.redirect(redirectPath);
    } else {
      next();
    }
  },

  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        if (user) {
          res.locals.user = user;
          next();
        } else {
          req.flash("error", "User not found.");
          res.locals.redirect = "/users";
          next();
        }
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        req.flash("error", "Error finding user.");
        res.locals.redirect = "/users";
        next();
      });
  },

  showView: (req, res) => {
    res.render("users/show");
  },

  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        if (user) {
          res.render("users/edit", { user });
        } else {
          req.flash("error", "User not found for editing.");
          res.redirect("/users");
        }
      })
      .catch(error => {
        console.log(`Error fetching user for edit: ${error.message}`);
        req.flash("error", "Failed to load user for editing.");
        res.redirect("/users");
      });
  },

  update: (req, res, next) => {
    let userId = req.params.id,
      userParams = getUserParams(req.body);
    User.findByIdAndUpdate(userId, { $set: userParams }, { new: true })
      .then(user => {
        if (user) {
          req.flash("success", `${user.fullName}'s account was updated successfully.`);
          res.locals.redirect = `/users/${userId}`;
          res.locals.user = user;
        } else {
          req.flash("error", "User not found for update.");
          res.locals.redirect = "/users";
        }
        next();
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`);
        req.flash("error", `Failed to update user account: ${error.message}`);
        res.locals.redirect = `/users/${userId}/edit`;
        next();
      });
  },

  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(user => {
        if (user) {
          req.flash("success", "User account deleted successfully.");
        } else {
          req.flash("error", "User not found for deletion.");
        }
        res.locals.redirect = "/users";
        next();
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`);
        req.flash("error", "Failed to delete user account.");
        res.locals.redirect = "/users";
        next();
      });
  }
};
