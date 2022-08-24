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
      if (res.codSuccess) location.href = "/";
      else razorpayPayment(res);

    }
  })
})

const razorpayPayment = (order) => {
  var options = {
    key: order.r_id, // Enter the Key ID generated from the Dashboard
    amount: order.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Company Name",
    description: "Test Transaction",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIYgwLjlymObFPD1K8stdVPFPvTaNUynbfow&usqp=CAU",
    order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response) {
      verifyPayment(response, order);
    },
    prefill: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
  var rzp1 = new Razorpay(options);
  rzp1.open();
};

function verifyPayment(payment, order) {
  $.ajax({
    url: "/verify-payment",
    data: {
      payment,
      order,
    },
    method: "post",
    success: (response) => {
      if (response.status) {
        alert("Payment Success");

        location.href = "/";
      } else {
        alert("Payment Failed");
      }
    },
  });
}