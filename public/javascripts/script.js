const addToCart = function (proId) {
  $.ajax({
    url: "/add-to-cart/" + proId,
    method: "get",
    success: (response) => {
      if (response.status) {
        let count = $("#cartCount").html();
        count = parseInt(count) + 1;
        $("#cartCount").html(count);
      }
    },
  });
};

$("#checkout-form").submit((e) => {
  e.preventDefault();
  $.ajax({
    url: "/place-order",
    method: "post",
    data: $("#checkout-form").serialize(),
    success: (response) => {
      // alert(response);
      if (response.codSuccess) {
        location.href = "/go-to-orders";
      } else {
        // alert("Online Transcation..Waiting..");
        razorpayPayment(response);
      }
    },
  });
});

const razorpayPayment = (order) => {
  // console.log(order);
  var options = {
    key: "rzp_test_UXwYoWtdzICu9s", // Enter the Key ID generated from the Dashboard
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
      // alert(response);
      if (response.status) {
        location.href = "/go-to-orders";
      } else {
        alert("Payment Failed");
      }
    },
  });
}
