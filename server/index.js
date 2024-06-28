const express = require("express");
const cors = require("cors");
const axios = require("axios");

const port = 5000;
const token =
  "1000.b153e5586d4ce415855cdc3912e75562.9cf5fe5a074494d1e34343528ea28390";
const organizationId = 60030428164;
const app = express();
app.use(cors());

app.use(express.json());

app.post("/create-user", async (req, res) => {
  const url = "https://www.zohoapis.in/invoice/v3/users";
  const data = req.body;
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "X-com-zoho-invoice-organizationid": organizationId,
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/create-invoice", async (req, res) => {
  const url = "https://www.zohoapis.in/invoice/v3/invoices";
  const data = req.body;

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "X-com-zoho-invoice-organizationid": organizationId,
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
