const express = require('express');
const router = express.Router();

/**
 * POST /api/contact
 * Relays the name, email, and message to Web3Forms safely using the server key.
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: { message: 'Please fill in all contact fields (name, email, message).' }
      });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return res.status(500).json({
        success: false,
        error: { message: "Contact service not configured: 'WEB3FORMS_ACCESS_KEY' is missing on the server." }
      });
    }

    const payload = {
      access_key: accessKey.trim().replace(/['"]/g, ''),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      subject: "FlavorForge AI - Developer Message"
    };

    // Use global fetch (Node 18+) to communicate with the Web3Forms gateway
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const resJson = await response.json();
      if (resJson.success) {
        return res.status(200).json({
          success: true,
          message: 'Message sent successfully! The developer will contact you shortly.'
        });
      } else {
        return res.status(400).json({
          success: false,
          error: { message: resJson.message || 'Web3Forms API returned failure response.' }
        });
      }
    } else {
      const errorText = await response.text();
      return res.status(response.status).json({
        success: false,
        error: { message: `Gateway error: ${errorText.substring(0, 100)}` }
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
