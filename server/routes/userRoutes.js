// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', async (req, res) => {
  try {
    await userController.create(req.body.username);
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/users/:username', async (req, res) => {
  try {
    const user = await userController.readByUsername(req.params.username);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error reading user:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/users/:username', async (req, res) => {
  try {
    await userController.updateByUsername(req.params.username, req.body);
    res.status(200).send('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/users/:username', async (req, res) => {
  try {
    await userController.softDeleteByUsername(req.params.username);
    res.status(200).send('User soft deleted successfully');
  } catch (error) {
    console.error('Error soft deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/users/search', async (req, res) => {
  try {
    const criteria = req.query;
    const users = await userController.search(criteria);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/users', async (req, res) => {
    try {
      const users = await userController.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching all users:', error);
      res.status(500).send('Internal Server Error');
    }
  });

router.get('/users/sorted/:field', async (req, res) => {
  try {
    const sortField = req.params.field;
    const users = await userController.getAllSorted(sortField);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
