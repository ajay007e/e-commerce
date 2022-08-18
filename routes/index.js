var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Home",admin:true,
    products: [
      { img: "https://miro.medium.com/max/1400/0*rZecOAy_WVr16810" },
      {
        img: "https://i.pinimg.com/564x/98/ce/14/98ce143a1e908669bcc2617edf62126e.jpg",
      },
      {
        img: "https://i.pinimg.com/564x/03/b7/ad/03b7ad774574210f81ab5269e0fd4d06.jpg",
      },
      {
        img: "https://i.pinimg.com/564x/53/26/25/532625ab674d695dd16e61579e65b9bf.jpg",
      },
      {
        img: "https://i.pinimg.com/564x/76/13/a3/7613a3e7da6c742c9af9418233cfa255.jpg",
      },
    ],
  });
});

module.exports = router;
