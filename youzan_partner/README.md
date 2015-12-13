## youzan_partner


### about this project

```js
$ node crawler.js
```

script will crawl some data and save it into `result.json` file at the root folder.


### node tips - node file I/O

文件I/O是服务端语言必修课，`nodejs`提供的`fs`模块提供了文件操作的函数，可以异步（或同步）的操作文件。

- writeFile

说明：
`fs.writeFile(filename, data, callback)`
数据参数可以是string或者是Buffer,编码格式参数可选，默认为"utf8"，回调函数只有一个参数err。

writeFile函数，可以异步的将数据写入一个文件, 如果文件已经存在则会被替换。

示例：
```js
var fs= require("fs");
 
fs.writeFile('test.txt', 'Hello Node', function (err) {
   if (err) throw err;
   console.log('Saved successfully'); //文件被保存
});
```


- appendFile

参数：
`fs.appendFile(文件名,数据,编码,回调函数(err));`
编码格式默认为"utf8"

writeFile函数虽然可以写入文件，但是如果文件已经存在，我们只是想添加一部分内容，它就不能满足我们的需求了，很幸运，fs模块中还有appendFile函数，它可以将新的内容追加到已有的文件中，如果文件不存在，则会创建一个新的文件。

示例：

```js
var fs= require("fs");
 
fs.appendFile('test.txt', 'data to append', function (err) {
   if (err) throw err;
 
    //数据被添加到文件的尾部
    console.log('The "data to append" was appended to file!'); 
});
```


- exists

说明：
`fs.exists(文件，回调函数(exists));`
检查一个文件是否存在。
exists的回调函数只有一个参数，类型为布尔型，通过它来表示文件是否存在。

示例：

```js
var fs= require("fs");
 
fs.exists('/etc/passwd', function (exists) {
  console.log(exists ? "存在" : "不存在!");
});
```


- rename

说明：
`fs.exists(旧文件，新文件, 回调函数(err));`
修改文件名。
exists的回调函数只有一个参数，类型为布尔型，通过它来表示文件是否存在。

示例：

```js
var fs= require("fs");
 
fs.rename(旧文件，新文件，回调函数(err){
   if (err) throw err;
   console.log('Successful modification,');
});
```

还可以使用rename函数移动文件：
```js
var fs = require('fs');
 
fs.rename(oldPath,newPath,function (err) {
   if (err) throw err;
   console.log('renamed complete');
});
```

- readFile

说明：
`fs.readFile(文件,编码,回调函数);`
读取文件。

示例：
```js
var fs = require('fs');
 
fs.readFile(文件名, function (err, data) {
  if (err) throw err;
  console.log(data);
});
```

- mkdir

说明：
`fs.mkdir(路径，权限，回调函数(err))`
参数：
1.路径：新创建的目录。
2.权限：可选参数，只在linux下有效，表示目录的权限，默认为0777，表示文件所有者、文件所有者所在的组的用户、所有用户，都有权限进行读、写、执行的操作。
3.回调函数：当发生错误时，错误信息会传递给回调函数的err参数。


- rmdir

说明：
`fs.rmdir(路径，回调函数(err));`
删除指定目录

示例：

```js
var fs = require('fs');
 
fs.rmdir(path, function(err) {
  if (err) throw err;
  console.log('ok');
});
```


- readdir

说明：
`fs.readdir(目录,回调函数(err,files));`
读取目录下所有的文件,相当于 `ls` 命令。

回调函数 (callback) 接受两个参数 (err, files) 其中 files 是一个存储目录中所包含的文件名称的数组，数组中不包括 '.' 和 '..'

示例：

```js
var fs = require('fs');
 
fs.readdir('/usr/',function(err,files){
  if (err) throw err;
  console.log(files);
});

```




### node URL

- parse
parse函数的作用是解析url，返回一个json格式的数组

```js
var url = require('url');
url.parse('http://www.baidu.com');

{ protocol: 'http:',
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: null,
  pathname: 'www.baidu.com',
  path: 'www.baidu.com',
  href: 'http://www.baidu.com' }

```