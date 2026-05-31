'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();
  const users = [];
  let nextId = 1;

  app.use(express.json());

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = {
      id: nextId++,
      name,
    };

    users.push(newUser);

    return res.status(201).json(newUser);
  });

  app.get('/users', (req, res) => {
    return res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((currentUser) => currentUser.id === Number(id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  });

  return app;
}

module.exports = {
  createServer,
};
