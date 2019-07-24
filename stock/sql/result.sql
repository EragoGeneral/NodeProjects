SELECT s.`code`, -- s.`name`, -- s.`concept`, 
d.syl, d.`price`, d.zf, s.`total_guben`, s.`flow_guben`, s.per_net_asset, s.`per_benefit`, s.`net_profit`, CAST(REPLACE(s.net_profit_rate, '%', '') AS DECIMAL(10,2)) AS net_profit_rate
 FROM stock s
 JOIN stock_daily_info d ON s.`code` = d.`stock_code` AND d.`is_deleted` = 0 AND d.`date` = '2017-12-19'
 JOIN        
(SELECT stock_code, COUNT(middle_order) AS cnt FROM `money_flow`
WHERE DATE = '2017-12-19' AND middle_order > 10
-- AND POSITION('14' IN TIME) = 1
-- ORDER BY stock_code, time
GROUP BY stock_code) t ON t.stock_code = s.code
WHERE s.`is_deleted` = 0 AND s.`concept` <> '' -- AND t.cnt > 30
AND CAST(REPLACE(s.net_profit_rate, '%', '') AS DECIMAL(10,2))  > 10
AND CAST(s.`total_guben`  AS DECIMAL(10,2)) < 20
ORDER BY (net_profit_rate+0.00) DESC,
CAST((per_net_asset + 0.00) AS DECIMAL(10,2) ) DESC
