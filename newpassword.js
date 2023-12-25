console.log('hi');
let ele = document.getElementById('sendnewpassword1');
ele.addEventListener('click', async function (e) {
  e.preventDefault(); 

  const url = window.location.href;
  const parts = url.split('/');
  const uuid = parts[parts.length - 1]; // Extract UUID from the URL

  if (uuid) {
    console.log('UUID:', uuid);

    const newPassword = document.getElementById('newpassword').value;
    const data = {
      password: newPassword,
      uuid: uuid,
      cu: url // Sending the entire URL as 'cu' parameter
    };

    try {
      const response = await axios.post("http://localhost:3000/newpassword", data);
      console.log('Response:', response.data);
      console.log('done');
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    console.error('UUID not found in the URL');
  }
});