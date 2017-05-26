var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');
var CommentModel = require('../models/comments');

var checkLogin = require('../middlewares/check').checkLogin;

// GET /posts �����û������ض��û�������ҳ
//   eg: GET /posts?author=xxx
router.get('/', function(req, res, next) {
  var author = req.query.author;
  PostModel.getPosts(author)
    .then(function (posts) {
      res.render('posts', {
        posts: posts
      });
    })
    .catch(next);
});

// POST /posts ����һƪ����
router.post('/', checkLogin, function(req, res, next) {
  var author = req.session.user._id;
  var title = req.fields.title;
  var content = req.fields.content;
  
  // У�����
  try {
    if (!title.length) {
      throw new Error('����д����');
    }
    if (!content.length) {
      throw new Error('����д����');
    }
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('back');
  }
  
  var post = {
    author: author,
    title: title,
    content: content,
    pv: 0
  };
  
  PostModel.create(post)
    .then(function (result) {
      // �� post �ǲ��� mongodb ���ֵ������ _id
      post = result.ops[0];
      req.flash('success', '����ɹ�');
      // ����ɹ�����ת��������ҳ
	  //res.redirect('/posts/${post._id}');
      res.redirect(`/posts/${post._id}`);
    })
    .catch(next);
});

// GET /posts/create ��������ҳ
router.get('/create', checkLogin, function(req, res, next) {
  res.render('posts/create');
});

// GET /posts/:postId ����һƪ������ҳ
router.get('/:postId', function(req, res, next) {
  var postId = req.params.postId;
  
  Promise.all([
    PostModel.getPostById(postId),// ��ȡ������Ϣ
	CommentModel.getComments(postId),// ��ȡ��������������
    PostModel.incPv(postId)// pv �� 1
  ])
  .then(function (result) {
    var post = result[0];
	var comments = result[1];
    if (!post) {
      throw new Error('�����²�����');
    }

    res.render('post', {
      post: post,
      comments: comments
    });
  })
  .catch(next);
});

// GET /posts/:postId/edit ��������ҳ
router.get('/:postId/edit', checkLogin, function(req, res, next) {
  var postId = req.params.postId;
  var author = req.session.user._id;
  
  PostModel.getRawPostById(postId)
    .then(function (post) {
      if (!post) {
        throw new Error('�����²�����');
      }
      if (author.toString() !== post.author._id.toString()) {
        throw new Error('Ȩ�޲���');
      }
      res.render('edit', {
        post: post
      });
    })
    .catch(next);
});

// POST /posts/:postId/edit ����һƪ����
router.post('/:postId/edit', checkLogin, function(req, res, next) {
  var postId = req.params.postId;
  var author = req.session.user._id;
  var title = req.fields.title;
  var content = req.fields.content;

  PostModel.updatePostById(postId, author, { title: title, content: content })
    .then(function () {
      req.flash('success', '�༭���³ɹ�');
      // �༭�ɹ�����ת����һҳ
      res.redirect(`/posts/${postId}`);
    })
    .catch(next);
  
});

// GET /posts/:postId/remove ɾ��һƪ����
router.get('/:postId/remove', checkLogin, function(req, res, next) {
  var postId = req.params.postId;
  var author = req.session.user._id;

  PostModel.delPostById(postId, author)
    .then(function () {
      req.flash('success', 'ɾ�����³ɹ�');
      // ɾ���ɹ�����ת����ҳ
      res.redirect('/posts');
    })
    .catch(next);
});

// POST /posts/:postId/comment ����һ������
router.post('/:postId/comment', checkLogin, function(req, res, next) {
  var author = req.session.user._id;
  var postId = req.params.postId;
  var content = req.fields.content;
  
  var comment = {
    author: author,
    postId: postId,
    content: content
  };
  
  CommentModel.create(comment)
    .then(function () {
      req.flash('success', '���Գɹ�');
      // ���Գɹ�����ת����һҳ
      res.redirect('back');
    })
    .catch(next);
});

// GET /posts/:postId/comment/:commentId/remove ɾ��һ������
router.get('/:postId/comment/:commentId/remove', checkLogin, function(req, res, next) {
  var commentId = req.params.commentId;
  var author = req.session.user._id;
  
  CommentModel.delCommentById(commentId, author)
    .then(function () {
      req.flash('success', 'ɾ�����Գɹ�');
      // ɾ���ɹ�����ת����һҳ
      res.redirect('back');
    })
    .catch(next);
});

module.exports = router;