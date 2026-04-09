const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');
const Project = require('../models/Project');

// Rate limiting to prevent spam (max 3 messages per hour per IP)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, 
  message: { error: 'Too many messages sent from this IP, please try again after an hour.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password
  },
});

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Server error fetching projects' });
  }
});

// Submit a contact form
router.post('/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message, _honeypot } = req.body;
    
    // Catch bots
    if (_honeypot) return res.status(200).json({ success: true });

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Save to database
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    // Professional Email Template
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `⚡ Portfolio Contact: ${subject || 'New Message'} - from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
          <h2 style="color: #000000; border-bottom: 2px solid #ccff00; padding-bottom: 10px;">New Inquiry</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; color: #666666; width: 100px;"><strong>Sender:</strong></td>
              <td style="padding: 10px; color: #333333;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; color: #666666;"><strong>Email:</strong></td>
              <td style="padding: 10px; color: #333333;"><a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; color: #666666;"><strong>Subject:</strong></td>
              <td style="padding: 10px; color: #333333;">${subject || 'N/A'}</td>
            </tr>
          </table>

          <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border-left: 4px solid #ccff00;">
            <p style="margin: 0; color: #444444; line-height: 1.6; font-size: 16px;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eeeeee; font-size: 12px; color: #999999; text-align: center;">
            <p>Submitted via Prathamsinh Rajput Portfolio</p>
            <p>Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} | IP: ${req.ip}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Server error processing contact form. Please try again later.' });
  }
});

module.exports = router;
