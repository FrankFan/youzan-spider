/*
 * http://fuwu.youzan.com/detail?id=1
 * http://wap.koudaitong.com/v2/showcase/homepage?kdt_id=1050250
 */

var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');


// 获取网页源代码
function getHtml(url) {
    http.get(url, function(res) {
        var html = '';

        res.on('data', function(data) {
            html += data;
        });

        res.on('end', function() {
            var resultData = filterData(html);

            writeFile(resultData);
        });

    }).on('error', function(e) {
        console.log('got error', e.message);
    });
}

// 过滤html源代码中的有用信息
function filterData(html) {
    var $ = cheerio.load(html);
    var companyInfo = $('.page-aside-content');
    var trs = companyInfo.find('tr');

    var allData = [];

    trs.each(function(item) {
        var tr = $(this);
        var title = tr.find('th').text().replace(/\s+/g, '').replace(/：/g, '');
        var content = tr.find('td').text();
        var objPageAsideContent = {};

        if (title == '服务内容') {
            content = content.replace(/\n/g, ';').replace(/\s+/g, '');
        } else {
            content = content.replace(/\s+/g, '');
        }

        objPageAsideContent.title = title;
        objPageAsideContent.content = content.substr(1);

        allData.push(objPageAsideContent);
    });

    return allData;
}

// 将数据保存为文件
function writeFile(resultData) {
    fs.appendFile('result.json', JSON.stringify(resultData) + '\n', function (err) {
        if (err) throw err;
        console.log('Saved successfully');
    });
}

function run() {
    for(var i = 1; i < 5; i++) {
        var url = 'http://fuwu.youzan.com/detail?id={id}';
        (function(args){
            console.log(args);
            url = url.replace(/{id}/g, args);
            console.log(url);
            getHtml(url);    
        })(i);
    }
}

// run
run();
