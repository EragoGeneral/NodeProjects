var jq = require("jquery");
console.log(jq);

jq.ajax({
  url: 'http://10.10.1.66:81/zentao/bug-browse-5-assignToMe-0.html',
  type: 'GET',
  complete: function(response) {
   if(response.status == 200) {
    alert('有效');
   } else {
    alert('无效');
   }
  }
});
 
