const fs = require('fs');

class userControler {
    display(req, res, next) {
        req.user // biết ai đang đăng nhập 
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
                res.send('lỗi đọc file')
                return
            }
            res.send(data)
        })
    }
    detial(req, res, next) {
        console.log('2. Get từng user cụ thể khi truyền params')
        console.log('ID muốn lấy ra thông qua params nè' ,req.params.id)
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
            res.send('Lỗi đọc dữ liệu')
            return
            }
            const user = JSON.parse(data).filter(element => element.id == req.params.id);
            console.log(user)
            res.send(user)
        })
    }
    create(req, res, next) {
        console.log('3. Tạo người dùng mới')
        console.log('Các trường và value muốn tạo: ', req.body)
    
        const newUser = { //req.body luôn
            id: parseInt(Date.now()),
            name: req.body.name,
            Age: parseInt(req.body.Age)
        }
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
                res.send('lỗi đọc file');
                return;
            }
            let dataUsers = JSON.parse(data)
            const newData = [...dataUsers, newUser]
            fs.writeFile('data.json', JSON.stringify(newData), (err) => {
            if (err) {
                res.send('lỗi khi viết file', err)
                return
            }
            res.send(newData)
            })
        })
    }
    update(req, res, next) {
        console.log('4. Update dữ liệu')
        console.log('Id name Age bạn muốn update ', req.params.id)
        const { name, Age} = req.body;
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
                res.send('Lỗi đọc file')
                return
            }
            const newData = JSON.parse(data).map((item) => {
                if (item.id == req.params.id)
                return {
                    id: parseInt(req.params.id), 
                    name: name,
                    age: Age
                }
                return item
            })
            fs.writeFile('data.json', JSON.stringify(newData), (err) => {
                if (err) {
                res.send('Lỗi ghi dữ liệu')
                return
                }
                res.send(newData)
            })
        })
    }
    delete(req, res, next) {
        console.log('5. Xóa dữ liệu qua id')
        console.log('Id người nhập muốn xóa' ,req.params.id)
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
            res.send('Lỗi đọc dữ liệu')
            return
            }
            const dataParse = JSON.parse(data);
            const userIndex = dataParse.findIndex(element => element.id == req.params.id);
            console.log(userIndex)
            dataParse.splice(userIndex, 1);
            console.log(dataParse)
            // res.send('ok')
            fs.writeFile('data.json', JSON.stringify(dataParse), (err) => {
            if (err) {
                res.send('Lỗi ghi dữ liệu')
                return
            }
            res.send(dataParse)
            })
        })
    }
}

module.exports = new userControler();