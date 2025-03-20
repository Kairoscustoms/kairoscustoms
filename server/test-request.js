require("dotenv").config();
const axios = require("axios");

axios.post("http://localhost:3000/send-email", {
    name: "Test Name",
    email: "test@example.com",
    message: "This is a test request submission.",
})
.then(response => {
    console.log("Request sent successfully:", response.data);
})
.catch(error => {
    console.log("Error sending request:", error.response ? error.response.data : error.message);
});

