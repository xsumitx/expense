console.log('hi');
const token = localStorage.getItem('token');

// Define the headers for the Axios request
const headers = {
  'Authorization': token,
  // Add any other headers if needed
};

// Make the Axios GET request with the headers
const PAGE_SIZE = 2; // Number of expenses per page
let currentPage = 1; // Current page

function loadExpenses(page) {
  axios.get(`http://localhost:3000/expense?page=${page}&limit=${PAGE_SIZE}`, { headers })
    .then((response) => {
      // Handle the response
      console.log(response.data);
      // Render expenses on the page, e.g., update HTML with the received expenses data
    })
    .catch((error) => {
      // Handle errors
      console.error('GET Error:', error);
    });
}

// Function to load the initial page
function loadInitialPage() {
  loadExpenses(currentPage);
}

// Event listeners for pagination buttons
const paginationButtons = document.querySelectorAll('.page');
paginationButtons.forEach(button => {
  button.addEventListener('click', () => {
    const pageNumber = parseInt(button.getAttribute('data-page'));
    currentPage = pageNumber;
    loadExpenses(currentPage);
  });
});

// Initial loading of the first page
loadInitialPage();


// Assuming you want to trigger the POST request when the form is submitted
document.getElementById('login-form2').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  const itemquantity = document.getElementById('quantity');
  const itemname = document.getElementById('item');
  const itemprice = document.getElementById('price');

  if (itemquantity && itemname && itemprice) {
    const quantity = itemquantity.value;
    const item = itemname.value;
    const price = parseInt(itemprice.value, 10);


    // Create a data object to send in the POST request
    const data1 = {
      amount: price, // Use the correct variable name
      description: item, // Use the correct variable name
      category: quantity,   // Use the correct variable name
    };
    console.log('hi');

    axios.post("http://localhost:3000/expense", data1, { headers })
      .then((response) => {
        // Handle the response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('POST Error:', error);
      });
  }
});
document.getElementById('buypremium').onclick = async function (e) {
  
    const response = await axios.get("http://localhost:3000/premiumUser", { headers });
    var option = {
      "key": response.data.keyid,
      "order_id":  response.data.razorpayOrder.id,
      "payment_id":response.data.updatedOrder.paymentId,
    

    
    "handler":async function(response){
      
      await axios.post("http://localhost:3000/payment",{
        order_id:option.order_id,
        payment_id:option.payment_id,
    },{headers})
      alert('you r a premium user')
      document.getElementById('buypremium').style.display = 'none';

      // Create and display a text element for premium user
      const premiumText = document.createElement('p');
      premiumText.textContent = 'You are a premium user';
      document.body.appendChild(premiumText);

      
    }

    };
    const rzp1= new Razorpay(option);
    rzp1.open();
    e.preventDefault();

  };
  document.getElementById('leaderboard').onclick = async function (e) {
    try {
        const response = await axios.get("http://localhost:3000/leaderboard", { headers });

        // Assuming the response contains an array of users with "Name" and "totalexpense" properties
        const users = response.data.users;

        // Update the DOM with the response data
        const leaderboardData = document.getElementById('leaderboard');
        leaderboardData.innerHTML = '';

        if (users.length > 0) {
            const ul = document.createElement('ul');
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `Name: ${user.Name}, Total Expense: ${user.totalexpense}`;
                ul.appendChild(li);
            });
            leaderboardData.appendChild(ul);
        } else {
            leaderboardData.textContent = 'No users found.';
        }
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        // Handle the error as needed, e.g., display an error message on the page.
    }
};
//document.getElementById('download').onclick = async function (e) {
  //try {
    //await axios.get("http://localhost:3000/download", { headers });

