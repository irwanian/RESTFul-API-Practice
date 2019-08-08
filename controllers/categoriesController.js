var {db} = require('../database').mysql

module.exports = {
    getCategories : (req, res)=>{
        
    var sql = `select * from category`
    db.query(sql, (err,results)=>{
        if(err) res.status(500).send(err)
        
        console.log(results);
        
        res.status(200).send(results)
})
    },
    addCategories : (req, res)=> {
        var data = req.body
    
    console.log(data);
    
    var sql = `insert into category set ?`;
    
    db.query(sql, data, (err, results)=>{
        if(err) res.status(500).send(err)
        
        var sql = `select * from category`

        db.query(sql, (err,results)=>{
            if(err) res.status(500).send(err)
            
            console.log(results);
            
            res.status(200).send(results)
    })
})
},
deleteCategories : (req, res)=> {
    var sql = `delete from category where id = ${req.params.id}`

    db.query(sql, (err,results)=>{
        if(err) res.status(500).send(err)

        var sql = `select * from category`

        db.query(sql, (err,results)=>{
            if(err) res.status(500).send(err)
            
            console.log(results);
            
            res.status(200).send(results)
        
    })
})
},

editCategories : (req, res) => {
    var sql= `update category set ? where id = ${req.params.id}`;

    db.query(sql, req.body, (err,results)=>{
        if(err) res.status(500).send(err)

        console.log(results);
        
        var sql = `select * from category`

        db.query(sql, (err,results)=>{
            if(err) res.status(500).send(err)
            
            console.log(results);
            
            res.status(200).send(results)
    })
    })
}


}