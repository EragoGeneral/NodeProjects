var book = {
	insert: 'insert into book(name, author) values (?, ?)',
	update: 'update book set name=?, author=? where id=?',
	delete: 'delete from book where id=?',
	queryById: 'select * from book where id=?',
	queryAll: 'select * from book'
};

module.exports = book;