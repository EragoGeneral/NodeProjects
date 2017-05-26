var marked = require('marked');
var Comment = require('../lib/mongo').Comment;

// �� comment �� content �� markdown ת���� html
Comment.plugin('contentToHtml', {
  afterFind: function (comments) {
    return comments.map(function (comment) {
      comment.content = marked(comment.content);
      return comment;
    });
  }
});

module.exports = {
  // ����һ������	
  create : function create(comment){
	return Comment.create(comment).exec();
  },
  
  // ͨ���û� id ������ id ɾ��һ������
  delCommentById : function delCommentById(commentId, author){
	return Comment.remove({author: author, _id: commentId}).exec();  
  },
  
  // ͨ������ id ɾ������������������
  delCommentsByPostId: function delCommentsByPostId(postId) {
    return Comment.remove({ postId: postId }).exec();
  },
  
  // ͨ������ id ��ȡ���������������ԣ������Դ���ʱ������
  getComments: function getComments(postId) {
    return Comment
      .find({ postId: postId })
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: 1 })
      .addCreatedAt()
      .contentToHtml()
      .exec();
  },
  
  // ͨ������ id ��ȡ��������������
  getCommentsCount: function getCommentsCount(postId) {
    return Comment.count({ postId: postId }).exec();
  }
}