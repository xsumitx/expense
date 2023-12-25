<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Data Storage Example with Axios</title>
</head>
<body>
    <h1>User Data Storage Example with Axios</h1>
    <form id="productForm">
        <input type="text" name="item" placeholder="Item">
        <input type="text" name="price" placeholder="Price">
        <button type="button" id="submitBtn">Submit</button>
    </form>
    <div id="submittedData"></div>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
        let authToken = null; // Store the authentication token

        // Function to extract and store the authentication token from the response header
        function extractAuthToken(response) {
            authToken = response.headers['authorization'];
        }

        // Simulated user authentication (replace with your actual authentication mechanism)
        function authenticateUser() {
            // Replace with your authentication logic
            // For example, you might have a login function that sends a POST request to authenticate the user
            axios.post('/login', { username: 'user123', password: 'password123' })
                .then(response => {
                    // Extract and store the authentication token from the response header
                    extractAuthToken(response);
                    // Fetch and display user data
                    fetchUserData();
                })
                .catch(error => {
                    console.error('Authentication failed:', error);
                });
        }

        // Function to fetch user data using the authentication token
        function fetchUserData() {
            axios.get('/api/data', { headers: { Authorization: authToken } })
                .then(response => {
                    updateDOM(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }

        // Function to update the DOM with user-specific data
        function updateDOM(userData) {
            const submittedDataElement = document.getElementById('submittedData');
            submittedDataElement.innerHTML = '';

            for (const [index, entry] of userData.entries()) {
                const dataDiv = document.createElement('div');
                dataDiv.classList.add('result');
                dataDiv.innerHTML = `
                    <p>Item: ${entry.item}</p>
                    <p>Price: ${entry.price}</p>
                `;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    // Send a request to delete the entry on the server
                    axios.delete(`/api/data/${index}`, { headers: { Authorization: authToken } })
                        .then(() => {
                            // Update the DOM after successful deletion
                            userData.splice(index, 1);
                            updateDOM(userData);
                        })
                        .catch(error => {
                            console.error('Error deleting entry:', error);
                        });
                });

                dataDiv.appendChild(deleteButton);

                submittedDataElement.appendChild(dataDiv);
            }
        }

        // Function to add result to user-specific data on the server
        function addResult() {
            const form = document.getElementById('productForm');
            const itemInput = form.querySelector('[name="item"]');
            const priceInput = form.querySelector('[name="price"]');

            const item = itemInput.value;
            const price = priceInput.value;

            // Send a request to add the entry on the server
            axios.post('/api/data', { item, price }, { headers: { Authorization: authToken } })
                .then(() => {
                    // Clear input fields
                    itemInput.value = '';
                    priceInput.value = '';

                    // Retrieve updated user data from the server and update the DOM
                    fetchUserData();
                })
                .catch(error => {
                    console.error('Error adding entry:', error);
                });
        }

        // Attach addResult function to the submit button
        const submitButton = document.getElementById('submitBtn');
        submitButton.addEventListener('click', addResult);

        // Initial authentication and data retrieval on page load
        authenticateUser();
    </script>
</body>
</html>
