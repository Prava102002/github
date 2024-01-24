const User = require("../models/user");
const axios = require("axios");

// Function to create a new user
const create = async (username) => {
  try {
    const existingUser = await User.findOne({ login: username });
    if (!existingUser) {
      const githubApiUrl = `https://api.github.com/users/${username}`;
      const response = await axios.get(githubApiUrl);

      if (response.status === 200) {
        const userData = response.data;
        const newUser = new User(userData);
        await newUser.save();
      } else {
        console.error(
          `Error fetching GitHub user data for ${username}. Status code: ${response.status}`
        );
      }
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Function to read user by username
const readByUsername = async (username) => {
  try {
    const user = await User.findOne({ login: username });
    return user;
  } catch (error) {
    console.error("Error reading user:", error);
    throw error;
  }
};

// Function to update user by username
const updateByUsername = async (username, updatedData) => {
  try {
    await User.updateOne({ login: username }, { $set: updatedData });
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Function to perform soft delete by username
const softDeleteByUsername = async (username) => {
  try {
    await User.deleteOne({ login: username });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Function to search for users based on criteria
const search = async (criteria) => {
  try {
    const users = await User.find(criteria);
    return users;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

// Function to get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Function to get all users sorted by a specified field
const getAllSorted = async (sortField) => {
  try {
    const users = await User.find().sort(sortField);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Export the functions
module.exports = {
  create,
  readByUsername,
  updateByUsername,
  softDeleteByUsername,
  search,
  getAllUsers,
  getAllSorted,
};
