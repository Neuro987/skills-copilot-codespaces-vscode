// Create web server
// Create a route to get all comments
// Create a route to get all comments for a specific post
// Create a route to add a new comment
// Create a route to delete a comment
// Create a route to edit a comment

const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Data
const comments = [
    { id: 1, post_id: 1, body: 'This is the first comment' },
    { id: 2, post_id: 1, body: 'This is the second comment' },
    { id: 3, post_id: 2, body: 'This is the third comment' }
];

// Routes
app.get('/api/comments', (req, res) => {
    res.send(comments);
});

app.get('/api/comments/:post_id', (req, res) => {
    const postComments = comments.filter(comment => comment.post_id === parseInt(req.params.post_id));
    res.send(postComments);
});

app.post('/api/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        post_id: req.body.post_id,
        body: req.body.body
    };
    comments.push(comment);
    res.send(comment);
});

app.delete('/api/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.send(comment);
});

app.put('/api/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    comment.body = req.body.body;
    res.send(comment);
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});