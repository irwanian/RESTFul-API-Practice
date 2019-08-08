var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')


var port = 2000





var arr = [{
    id:1,
    nama: 'Popok Hokage',
    harga: 100000,
    description: 'Siapkah bayi anda menjadi Hokage?'
}, {
    id:2,
    nama: 'Popok Ngesot',
    harga: 50000,
    description: 'Dijamin bayi anda ngesot abis!'
}, {
    id:3,
    nama: 'Popok Yang Tertukar',
    harga: 125000,
    description: 'Popok yang tiada bandingnya!'
}]

var app = express()

app.use(cors())
app.use(bodyParser.json())

const {
    mongoRouter,
    mysqlRouter
} = require('./routers')

app.use('/mongo', mongoRouter)
app.use('/mysql', mysqlRouter)


app.get('/', (req,res) => {
    res.send('<h1>Hello Guys</h1>')
})

app.get('/users', (req, res)=>{
    if(!req.query.username){
        req.query.username = ''
    }
    // if(!req.query.usiaMin){
    //     req.query.usiaMin = 0
    // }
    // if(!req.query.usiaMax){
    //     req.query.usiaMax = 999
    // }
    var sql = ` select u.*, r.nama as RoleName
                from users u
                left join roles r
                on u.roleid = r.id
                where username like '%${req.query.username}%' `
               if(req.query.usiaMin){
                   sql += ` and u.usia >= ${req.query.usiaMin}`
               }
               if(req.query.usiaMax){
                   sql += ` and u.usia <= ${req.query.usiaMax}`
               }if(req.query.email){
                   sql+= ` and u.email like '%${req.query.email}%'`
               }
               if(req.query.password){
                sql+= ` and u.email like '%${req.query.password}%'`
               }
               if(req.query.role){
                   sql += ` and r.nama = '${req.query.role}'`
               }
    db.query(sql, (err,results)=>{
        if(err) res.status(500).send(err)
        
        console.log(results);
        
        res.status(200).send(results)
    })
})

app.get('/home', (req,res) => {
    res.send({ message: 'Ini Home' })
})

app.get('/products/:id', (req,res) => {
    console.log('Masuk /products/:id')
    // console.log(req.params.id)
    // console.log(typeof(req.params.id))
    var newArr = arr.filter((item) => item.id === Number( req.params.id))
    // console.log(newArr)
    res.send(newArr)
})

app.get('/products', (req,res) => {
    console.log('Masuk /products')
    // console.log(req.query)
    var newArr = arr
    if(req.query.nama) {
        newArr = newArr.filter(
            (item) => item.nama.toLowerCase().includes(req.query.nama.toLowerCase())
        )
    }
    if(req.query.hargaMin) {
        newArr = newArr.filter((item) => item.harga >= Number(req.query.hargaMin))
    }
    if(req.query.hargaMax) {
        newArr = newArr.filter((item) => item.harga <= Number(req.query.hargaMax))
    }

    res.send(newArr)
})

app.get('/test', (req, res)=>{
   try{
       console.log('masup');
         res.status(202).send('request success')
   } catch(err){
       console.log(err.message);
       res.status(500).send(err.message)
       
   }
})

app.post('/addproduct', (req,res)=>{
    console.log(req.body);
    arr.push(req.body)
    res.status(201).send({message : 'Add Product Success', newData : arr})
})


app.listen(port, () => console.log(`API aktif di port ${port}`))