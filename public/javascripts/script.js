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

function changeQuantity(cartId, proId, count,user) {
  let c = $(`#${proId}`).html();
  $.ajax({
    url: "/change-cart-quantity",
    method: "post",
    data: { cart: cartId, product: proId, count: count, quantity: c ,userId:user},
    success: (res) => {
      if (res.status) {
        c = parseInt(c) + count;
        $(`#${proId}`).html(c);
        $('#total').html(res.total);
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

$("#checkout-form").submit((e)=>{
  e.preventDefault();
  $.ajax({
    url:"/place-order",
    method:"post",
    data:$('#checkout-form').serialize(),
    success: (res) => {
      // console.log(res);
      if(res.status) location.href="/"

    }
  })
})