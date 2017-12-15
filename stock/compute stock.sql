SELECT s.code, t.cnt FROM stock s 
JOIN stock_daily_info d ON d.stock_code = s.code  
LEFT JOIN ( SELECT stock_code, COUNT(id) AS cnt  FROM money_flow WHERE `date` = '2017-12-15' GROUP BY stock_code) t ON t.stock_code = s.code 
WHERE s.price < 40 
AND s.per_net_asset > 2 
AND s.per_funds > 1 
AND s.flow_guben < 1 
AND POSITION(9 IN s.CODE) <> 1 
AND s.is_deleted = 0 AND d.syl < 40 AND t.cnt IS NULL 
ORDER BY s.id 
 
 
 SELECT s.`code`, s.`name`, s.`concept`, s.`price`, t.cnt
 FROM stock s
 JOIN        
(SELECT stock_code, COUNT(middle_order) AS cnt FROM `money_flow`
-- select * from money_flow
-- delete from `money_flow`
WHERE DATE = '2017-12-15' 
AND POSITION('14' IN TIME) = 1 
AND middle_order > 10
-- ORDER BY stock_code, time
GROUP BY stock_code) t ON t.stock_code = s.code
WHERE s.`concept` <> '' AND t.cnt > 30


SELECT *
FROM money_flow f
WHERE `date` = '2017-12-15' AND stock_code = '601999'


SELECT * FROM stock
WHERE CODE = '601999'
