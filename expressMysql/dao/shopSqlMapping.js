var shop = {
	insert: 'insert into xhs_product_new(buyable, category_id, category_name, description, discount_price, feature, height, id, image, ipq, link, new_arriving, price, promotion_text, seller_id , skucode, stock_shortage, stock_status , title, vendor_icon, whcode , width, created_time, is_deleted) '
		+'values (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, SYSDATE(), \'0\')',
	update: 'update xhs_product_new set category_id=?, price=? where id=?',
	delete: 'delete from xhs_product_new where id=?',
	queryById: 'select * from xhs_product_new where id=?',
	queryAll: 'select * from xhs_product_new'
};

module.exports = shop;