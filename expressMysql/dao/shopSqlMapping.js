var shop = {
	insert: 'insert into xhs_product(buyable, category_id, description, discount_price, feature, height, id, image, ipq, link, new_arriving, price, promotion_text, seller_id , skucode, stock_shortage, stock_status , title, vendor_icon, whcode , width) '
		+'values (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?)',
	update: 'update xhs_product set category_id=?, price=? where id=?',
	delete: 'delete from xhs_product where id=?',
	queryById: 'select * from xhs_product where id=?',
	queryAll: 'select * from xhs_product'
};

module.exports = shop;