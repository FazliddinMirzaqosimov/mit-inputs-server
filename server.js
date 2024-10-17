const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 9876;

// Middleware to parse JSON bodies

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Replace with your Telegram bot token and chat ID
const telegramToken = "7815914215:AAFpLKyx0aKs4fB2lGsShzHVVg2-TrN1dv0";
const chatId = "-4510993729";

// API endpoint to receive form data
app.post("/send", async (req, res) => {
  try {
    // Extract form data from request body
    const data = req.body;

    // Compose the message you want to send via Telegram
    let text = ``;

    Object.keys(data)?.forEach((el) => {
      text = text + `${el}: ${data[el]}\n`;
    });

    // Send the message to your Telegram bot using Axios
    await axios.post(
      `https://api.telegram.org/bot${telegramToken}/sendMessage`,
      {
        chat_id: chatId,
        text: text,
      }
    );

    // Send success response to the frontend
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
