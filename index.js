const { default: axios } = require("axios");
const express = require("express");
require('dotenv').config()

const app = express();

app.use(express.json());

app.listen(5000, () => {
  console.log("Server running");
});

// mobile no of receiver
const mobile = process.env.MOBILE;

var data = JSON.stringify({
    "messaging_product": "whatsapp",
    "to": mobile,
    "type": "template",
    "template": {
      "name": "event_registration_successful_2",
      "language": {
        "code": "en",
        "policy": "deterministic"
      },
      "components": [
        {
          "type": "header"
        },
        {
          "type": "body",
          "parameters": [
            {
              "type": "text",
              "text": "Arindam Biswas"
            },
            {
              "type": "text",
              "text": "React India"
            },
            {
              "type": "text",
              "text": "React India Team"
            }
          ]
        }
      ]
    }
  })

var config = {
  method: "post",
  url: "https://graph.facebook.com/v14.0/106442968901790/messages",
  headers: {
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
  data: data,
};

app.get("/send", async (req, res) => {
    console.log('axios')
  try {
    const response = await axios(config);
    // console.log(JSON.stringify(response.data));
    res.status(200).send(JSON.stringify(response.data));
    // res.status(200).send("hello");
  } catch (error) {
    console.log("Error happened");
    console.log(error.message);
    res.send(JSON.stringify(error));
  }
});
