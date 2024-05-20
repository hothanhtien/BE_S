import express from 'express'
const fs = require('fs');
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded());
app.use(express.json())

  
app.get('/users'
    ,(req, res) => {
    req.user // biết ai đang đăng nhập 
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            res.send('lỗi đọc file')
            return
        }
        res.send(data)
    })
})
  
  
  
// app.post('/create/:id', (req, res) => {
// console.log('3. Tạo người dùng mới')
// console.log('Các trường và value muốn tạo: ', req.body)

// const newUser = { //req.body luôn
//     id: parseInt(req.params.id),
//     name: req.body.name,
//     Age: parseInt(req.body.Age)
// }
// fs.readFile('data.json', 'utf8', (err, data) => {
//     if (err) {
//     res.send('lỗi đọc file');
//     return;
//     }
//     let dataUsers = JSON.parse(data)
//     console.log(dataUsers)
//     console.log(newUser)
//     const newData = [...dataUsers, newUser]
//     // console.log('hi',newData)
//     fs.writeFile('data.json', JSON.stringify(newData), (err) => {
//     if (err) {
//         res.send('lỗi khi viết file', err)
//         return
//     }
//     res.send('data đã được lưu')
//     })
// })

// })

app.post('/create', (req, res) => {
    const { name, Age } = req.body
    const data = JSON.stringify({ id: Date.now(),Age: Age, name: name })
    fs.writeFile('data.json', data, (err) => {
        if (err) {
            res.send('Error writing file', err)
            return
        }
        res.send('Data saved')
    })
}
)

app.put('/update/:id', (req, res) => {
console.log('4. Update dữ liệu')
console.log('Id name Age bạn muốn update ', req.params.id)
// const name1 = req.body.name;
// const id1 = parseInt(req.params.id);
// const age1 = parseInt(req.body.Age)
const { name, Age} = req.body;
// console.log('log ne', {id1, name1, age1})
// const userUpdate = users.find(user => user.id === parseInt(req.params.id))
// userUpdate.name = req.body.name;
// userUpdate.Age = parseInt(req.body.Age);
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        res.send('Lỗi đọc file')
        return
    }
    // console.log(JSON.parse(data))
    const newData = JSON.parse(data).map((item) => {
        if (item.id == req.params.id)
        return {
            id: parseInt(req.params.id), 
            name: name,
            age: Age
        }
        return item
    })
    // console.log(newData)
    // console.log(newData)
    fs.writeFile('data.json', JSON.stringify(newData), (err) => {
        if (err) {
        res.send('Lỗi ghi dữ liệu')
        return
        }
        res.send('data updated')
    })
})
})

app.delete('/delete/:id', (req, res) => { 
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
    res.send('data updated')
    })
})

})

// app.get('users/nguu', (req, res) => {
//     return res.send('Vào đây là ngu')
// })

app.get('/users/:id', (req, res) => {
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

})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
