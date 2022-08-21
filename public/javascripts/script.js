function addToCart(proId) {
  $.ajax({
    url: "/add-to-cart/" + proId,
    method: "get",
    success: (res) => {
      if (res.status) {
        let count = $("#cartCount").html();
        count = parseInt(count) + 1;
        $("#cartCount").html(count);
      }
    },
  });
}

function changeQuantity(cartId, proId, count) {
  // console.log(cartId, proId, count);
  let c = $(`#${proId}`).html();
  $.ajax({
    url: "/change-cart-quantity",
    method: "post",
    data: { cart: cartId, product: proId, count: count, quantity: c },
    success: (res) => {
      console.log(res);
      if (res.status) {
        c = parseInt(c) + count;
        $(`#${proId}`).html(c);
        // console.log(c, count);
        if (res.removeProduct) location.reload();
      } 
    },
  });
}

function deleteCartItem(cartId,prodId){
  $.ajax({
    url: "/delete-cart-item",
    method: "post",
    data: { cart: cartId, prod: prodId },
    success: (res) => {
      if(res.status) location.reload();
    }})
}