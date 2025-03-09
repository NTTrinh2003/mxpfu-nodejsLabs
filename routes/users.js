const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Send all users' information
  res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/email/:email",(req,res)=>{
  // Get the email requirement
  const email = req.params.email;

  // Filter the user with the provided email ID
  const filteredUsers = users.filter((user) => user.email === email);

  // Send the user's information, empty if not found
  res.send(filteredUsers);
});

// POST request: Create a new user
router.post("/",(req,res)=>{
  // Get the new user's information from the request body
  // Push into users list
  users.push({
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB,
  });

  // Send a response back to the user
  res.send("The user " + req.query.firstName + " has been added!"); //This line is to be replaced with actual return value
});


// PUT request: Update the details of a user by email ID
router.put("/email/:email", (req, res) => {
  // Get the required email
  const email = req.params.email;

  // Filter the user with the provided email ID
  let filteredUsers = users.filter((user) => user.email === email);

  if (filteredUsers.length > 0) {
    // Get the user information
    let filteredUser = filteredUsers[0];

    // Get the changed information
    let DOB = req.query.DOB;
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;
    
    // Change information if needed
    if (DOB) { filteredUser.DOB = DOB; }
    if (firstName) { filteredUser.firstName = firstName; }
    if (lastName) { filteredUser.lastName = lastName; }

    // Delete the current user from the currnet list
    users = users.filter((user) => user.email != email);

    // Add the updated user back to the list
    users.push(filteredUser);

    // Send a response back to the user
    res.send(`User with email ${email} has been updated`);
  } else {
    // Send a response back to the user if the user is not found
    res.send("User not found");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/email/:email", (req, res) => {
  // Get the required email
  let email = req.params.email;

  // Filter the user with the provided email
  users = users.filter((user) => user.email != email);

  // Send a response back to the user
  res.send(`Deleted user with email ${email}`);
});

router.get("/lastname/:lastName", (req, res) => {
  // Get the required last name
  let lastName = req.params.lastName;

  // Filter the users with the provided last name
  let filteredUsers = users.filter((user) => user.lastName === lastName);
  
  // Send the filtered users' information
  res.send(JSON.stringify({users: filteredUsers}, null, 4));
})

function getDateFromString(strDate) {
  let [dd, mm, yyyy] = strDate.split('-');
  return new Date(yyyy + "/" + mm + "/" + dd);
}

router.get("/sort", (req, res) => {
  let sorted_users = users.sort(function(a, b) {
    let date1 = getDateFromString(a.DOB);
    let date2 = getDateFromString(b.DOB);
    return date1 - date2;
  });
  
  // Send the sorted users' information
  res.send(sorted_users);
})

module.exports=router;
