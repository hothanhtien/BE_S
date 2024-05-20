"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var fs = require('fs');
var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
app.use(_express["default"].urlencoded());
app.use(_express["default"].json());
var checkAuthentication = function checkAuthentication(req, res, next) {
  var accessToken = req.headers.authorization;
  if (accessToken) {
    console.log('middleware to authen');
    req.user = accessToken;
    next();
  } else {
    res.send('user chưa login');
  }
};
app.get('/users', checkAuthentication, function (req, res) {
  req.user; // biết ai đang đăng nhập 
  fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) {
      res.send('lỗi đọc file');
      return;
    }
    res.send(data);
  });
});
app.post('/create/:id', function (req, res) {
  console.log('3. Tạo người dùng mới');
  console.log('Các trường và value muốn tạo: ', req.body);
  var newUser = {
    //req.body luôn
    id: parseInt(req.params.id),
    name: req.body.name,
    Age: parseInt(req.body.Age)
  };
  fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) {
      res.send('lỗi đọc file');
      return;
    }
    var dataUsers = JSON.parse(data);
    console.log(dataUsers);
    console.log(newUser);
    var newData = [].concat(_toConsumableArray(dataUsers), [newUser]);
    // console.log('hi',newData)
    fs.writeFile('data.json', JSON.stringify(newData), function (err) {
      if (err) {
        res.send('lỗi khi viết file', err);
        return;
      }
      res.send('data đã được lưu');
    });
  });
});
app.put('/update/:id', function (req, res) {
  console.log('4. Update dữ liệu');
  console.log('Id name Age bạn muốn update ', req.params.id);
  var name1 = req.body.name;
  var id1 = parseInt(req.params.id);
  var age1 = parseInt(req.body.Age);
  console.log('log ne', {
    id1: id1,
    name1: name1,
    age1: age1
  });
  // const userUpdate = users.find(user => user.id === parseInt(req.params.id))
  // userUpdate.name = req.body.name;
  // userUpdate.Age = parseInt(req.body.Age);
  fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) {
      res.send('Lỗi đọc file');
      return;
    }
    // console.log(JSON.parse(data))
    var newData = JSON.parse(data).map(function (item) {
      if (item.id == req.params.id) return {
        id: id1,
        name: name1,
        age: age1
      };
      return item;
    });
    // console.log(newData)
    // console.log(newData)
    fs.writeFile('data.json', JSON.stringify(newData), function (err) {
      if (err) {
        res.send('Lỗi ghi dữ liệu');
        return;
      }
      res.send('data updated');
    });
  });
});
app["delete"]('/delete/:id', function (req, res) {
  console.log('5. Xóa dữ liệu qua id');
  console.log('Id người nhập muốn xóa', req.params.id);
  fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) {
      res.send('Lỗi đọc dữ liệu');
      return;
    }
    var dataParse = JSON.parse(data);
    var userIndex = dataParse.findIndex(function (element) {
      return element.id == req.params.id;
    });
    console.log(userIndex);
    dataParse.splice(userIndex, 1);
    console.log(dataParse);
    // res.send('ok')
    fs.writeFile('data.json', JSON.stringify(dataParse), function (err) {
      if (err) {
        res.send('Lỗi ghi dữ liệu');
        return;
      }
      res.send('data updated');
    });
  });
});

// app.get('users/nguu', (req, res) => {
//     return res.send('Vào đây là ngu')
// })

app.get('/users/:id', function (req, res) {
  console.log('2. Get từng user cụ thể khi truyền params');
  console.log('ID muốn lấy ra thông qua params nè', req.params.id);
  fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) {
      res.send('Lỗi đọc dữ liệu');
      return;
    }
    var user = JSON.parse(data).filter(function (element) {
      return element.id == req.params.id;
    });
    console.log(user);
    res.send(user);
  });
});
app.listen(port, function () {
  console.log("Server listening on port ".concat(port));
});