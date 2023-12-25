document.getElementById('sendmail').onclick = async function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
  
    const emailt = document.getElementById('emailf');
    const emailr = emailt.value;
    const data = {
      email: emailr
    };
  
    try {
      await axios.post("http://localhost:3000/password", data);
      console.log('done');
    } catch (error) {
      console.error('Error:', error);
      // Handle the error as needed
    }
  };
  