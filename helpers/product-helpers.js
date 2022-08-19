var db = require('../config/connection');
var collections = require('../config/collection');
const collection = require('../config/collection');

module.exports={
    addProduct:(product,callback)=>{
        db.get()
          .collection(collections.PRODUCTS_COLLECTION)
          .insertOne(product)
          .then((data) => {
            callback(data.insertedId.toString());
          });
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products =await db.get().collection(collection.PRODUCTS_COLLECTION).find().toArray();
            resolve(products);
        })
    }
}
