
module.exports = function (app, profile) {
  app.post('/add_product', (req, res) => {
    var newprofile = new profile();
    profile.find({ token: req.body.token }, (err, rs) => {
      if (rs.length != 0) {
        console.log("vao");
        let product = {
          id_product: req.body.token+"."+rs[0].list_product.length,
          name_product: req.body.name_product,
          image: [
            {
              file: req.body.file_image,
            }],
          price: req.body.price,
          price_new: req.body.price_new,
          price_precent: 0,
          described: req.body.described,
          ships_from: req.body.ships_from,
          ships_from_id: req.body.ships_from_id,
          condition: req.body.condition,
          modified: null,
          created: null,
          like: 0,
          comment: [],
          is_like: null,
          best_offers: null,
          video: [{
            url: req.body.video_url,
            thumb: req.body.video_thumb,
          }],
          size: [{
            id: String,
            size_name: req.body.size_name
          }],
          brand: [{
            id: String,
            brand_name: req.body.brand_name
          }],
          seller: {
            id_seller: String,
            username: String,
            avatar: String,
            score: String,
            listing: String,
          },
          category: [{
            id: String,
            name: String,
            has_brand: String,
            has_name: String
          }],
          state: null,
          is_blocked: null,
          can_edit: null,
          banned: null,
          can_buy: null,
          product_waiting_rate: null,
          seller_vacation_mode: null,
          offers: null,
          url_share: null,
          weight: req.body.weight,
          dimention: {
            width: req.body.width,
            height: req.body.height,
            length: req.body.length
          },
          list_report :[],
        };
        rs[0].list_product.push(product);
        rs[0].save(function (err, post) {
          if (err) {
            let result = {
              code: 404,
              message: err
            }
            return res.json(result);
          }
          let result = {
            code: 1000,
            message: "OK",
            data:{
              id : post.list_product[post.list_product.length-1]._id,
              url :post.list_product[post.list_product.length-1].url_share,
            }
          }
          return res.json(result);

        });
      } else{
        
          let result = {
            code: 9995,
            message: "User is not validated.",
          }
          return res.json(result);
        
      }
    })
  });
}