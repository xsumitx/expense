
console.log
 document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    
   //  console.log('hey');
    // Check if the elements exist
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    if (emailInput && passwordInput) {
        const email = emailInput.value;
        const password = passwordInput.value;
        console.log('Email:', email);
        console.log('Password:', password);
    
        // Create a data object to send in the POST request
        const data = {
            email: email,
            password: password
        };

         
        // Make a POST request to the /login route using Axios
      axios.post ("http://localhost:3000/login",data).then((response) => {
        
            console.log('i am inside then block')
            // Store the token in local storage
            console.log(response.data);
            
              localStorage.setItem('token', response.data.token);
              window.location.href = "./expense.html";

        }).catch((error) => {
        
            console.error('Error:', error);
        });
    }
}
)
document.getElementById('passwordf').onclick = async function (e) {
   
      window.location.href="./forgotpassword.html"
      console.log('done');
}
  

   
