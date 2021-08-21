const express = require('express');
const router = express.Router();

// Load Comment model
const Comment = require('../../models/Comment');

// @route GET api/CommentSchemas/test
// @description tests CommentSchemas route
// @access Public
router.get('/test', (req, res) => res.send('Comment route testing!'));

// @route GET api/CommentSchemas
// @description Get all CommentSchemas
// @access Public
router.get('/', (req, res) => {
    Comment.find()
        .then(CommentSchemas => res.json(CommentSchemas))
        .catch(err => res.status(404).json({ noCommentSchemasfound: 'No CommentSchemas found' }));
});

// @route GET api/CommentSchemas/:id
// @description Get single Comment by id
// @access Public
router.get('/:id', (req, res) => {
    Comment.find({ targetUser: req.params.id })
        .then(Comment => res.json(Comment))
        .catch(err => res.status(404).json({ noCommentSchemasfound: 'No Comment found' }));
});

// @route GET api/CommentSchemas
// @description register Comment
// @access Public
router.post('/', (req, res) => {
    Comment.create(req.body)
        .then(Comment => res.json({ msg: 'Comment added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this Comment' }));
});

module.exports = router;