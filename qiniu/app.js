var qiniu = require("qiniu");
//��Ҫ��д��� Access Key �� Secret Key
qiniu.conf.ACCESS_KEY = 'OJb5DHhgOxDo42se8R2JvwLyaykWLUBYowqMA3Nu';
qiniu.conf.SECRET_KEY = 'tRfcP40zLvGUwfVANQEClOnyn2ATb2spLki9K7cH';
//Ҫ�ϴ��Ŀռ�
bucket = 'ubtech';
//�ϴ�����ţ�󱣴���ļ���
key = 'jimu/models/icons/customize/0.jpg';
//�����ϴ����Ժ���
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
}
//�����ϴ� Token
token = uptoken(bucket, key);
//Ҫ�ϴ��ļ��ı���·��
filePath = 'E:\\a_qiniu\\modelImage\\customize\\test\\32\\0.jpg'  // \\E:\a_qiniu\modelImage\customize
//�����ϴ�����
function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // �ϴ��ɹ��� ������ֵ
        console.log(ret.hash, ret.key, ret.persistentId);       
      } else {
        // �ϴ�ʧ�ܣ� �����ش���
        console.log(err);
      }
  });
}
//����uploadFile�ϴ�
uploadFile(token, key, filePath);