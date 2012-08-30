//モジュール
var formidable = require("formidable");
var fs         = require("fs");

// グローバル変数
var file_name = "";

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

// /start用のレイアウトファイル
exports.start = function(req, res) {
    res.render('start', { title : 'Upload File' });
}

// /upload用のレイアウトファイル
exports.upload = function(req, res, next) {
    var tmp_file    = req.files.thumbnail;
    var target_path = "./public/images/"+tmp_file.name;

    //　アップロードファイルの保存
    fs.rename(tmp_file.path, target_path, function(err) {
        if(err) {
            fs.unlink(target_path);
            fs.rename(tmp_file.path, target_path);
        }
    });

    // エラー処理も書いてる
    //fs.rename(tmp_file.path, target_path, function(err) {
    //    if (err) throw err;

    //    //非同期処理
    //    fs.unlink(tmp_file.path, function() {
    //        if (err) throw err;
    //    });
    //});

    res.render('upload', { title: 'Received Image',
                           name :  "images/"+tmp_file.name });
}

// /show用のレイアウトファイル
exports.show = function(req, res) {

    var img_files = [];

    // ディレクトリ読み込み
    fs.readdir("./public/images", function(err, files) {
        if (err) throw err;
        res.render('show', { title : 'Upload Files',
                             items : files });
    });        
}
