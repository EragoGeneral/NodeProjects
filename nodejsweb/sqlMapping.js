var user = {
    insert:'INSERT INTO book(id, name, author) VALUES(0,?,?)',
    update:'update book set name=?, age=? where id=?',
    delete: 'delete from book where id=?',
    queryById: 'select * from book where id=?',
    queryAll: 'select * from book'
};

module.exports = user;