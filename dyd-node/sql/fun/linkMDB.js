const Monk = require('monk')
const url = 'localhost:27017/recruit';
const db = new Monk(url);

class LinkMdb{
    constructor(){

    }

    db(){
        return db
    }
    get(body){
        let table=body.$table
        let data=body.$where
        let orderBy=body.$orderBy
      if(!orderBy){
        return new Promise(  (resolve, reject) => {
          console.log(1)
          db.get(table).find(data).then(res=>{
            resolve(res) ;
          })
        })
      }else{
        return new Promise(  (resolve, reject) => {
          db.get(table).find(data).sort(orderBy).then(res=>{
            resolve(res) ;
          })
        })
      }

    }

    add(body){
        let table=body.$table
        let data=body.$insert
      delete data._id
        return new Promise(   (rs, rj) => {
            if (db.get(table).insert([data])) {
                rs(true)
            } else {
                rj(false)
            }
        })
    }

    del(body){
        let table=body.$table
        let data=body.$where

        return new Promise(   (rs, rj) => {
            if (db.get(table).remove(data)) {
                rs(true)
            } else {
                rj(false)
            }
        })
    }

    up(body){
        let table=body.$table
        let data=body.$set
        let where=body.$where
        return new Promise(   (rs, rj) => {
            if (db.get(table).update(where,{$set:data})) {

                rs(true)
            } else {

                rj(false)
            }
        })
    }
}

module.exports=new LinkMdb()

