var http = require('http')
var fs = require('fs')
var url = require('url')

var port = process.env.PORT || 8888; //bash设置端口：PORT=8001 node server.js

var server = http.createServer(function(request, response){
  
  var temp = url.parse(request.url,true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/


    if(path === '/'){
    var string = fs.readFileSync('./index.html','utf8')
    var db = fs.readFileSync('./db','utf8')
    string = string.replace('&&&amount&&&',db)
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/style.css'){
    var string = fs.readFileSync('./style.css','utf8')
    response.setHeader('Content-Type', 'text/css')
    response.write(string)
    response.end()
  }else if(path === '/main.js'){
    var string = fs.readFileSync('./main.js','utf8')
    response.setHeader('Content-Type', 'application/javascript;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/pay'){
    var amount = fs.readFileSync('./db',newAmount)
    var newAmount = amount - 1
    fs.writeFileSync('./db',newAmount)
    response.setHeader('Content-type','application/javascript')
    response.statusCode = 200
    response.write(`
      $(query.callbackName).call(undefined,'success') 
    `)
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('呜呜呜')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
