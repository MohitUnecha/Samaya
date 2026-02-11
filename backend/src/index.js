const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://mohitunecha.github.io',
      'https://samayaglobal.org',
      'https://www.samayaglobal.org',
      'https://samaya-indol.vercel.app',
    ],
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
      });
    }

    // Send email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'We received your message - Samaya Global',
      html: `
        <h2>Thank you for contacting Samaya Global</h2>
        <p>Hi ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Samaya Global Team</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.json({
      success: true,
      message: 'Your message has been sent successfully!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error sending your message. Please try again later.',
    });
  }
});

// Partnership Form Endpoint
app.post('/api/partnership', async (req, res) => {
  try {
    const { vendorName, businessType, email, phone, moreInformation } = req.body;

    // Validation
    if (!vendorName || !businessType || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
      });
    }

    // Send email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Partnership Inquiry: ${vendorName}`,
      html: `
        <h2>New Partnership Inquiry</h2>
        <p><strong>Vendor/Business Name:</strong> ${vendorName}</p>
        <p><strong>Type of Business:</strong> ${businessType}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Additional Information:</strong></p>
        <p>${moreInformation ? moreInformation.replace(/\n/g, '<br>') : 'N/A'}</p>
      `,
    };

    // Send confirmation email to vendor
    const vendorMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Partnership Inquiry Received - Samaya Global',
      html: `
        <h2>Thank you for your partnership inquiry</h2>
        <p>Hi ${vendorName},</p>
        <p>We have received your partnership inquiry and appreciate your interest in collaborating with Samaya Global. Our team will review your submission and get back to you within 5-7 business days.</p>
        <p>If you have any urgent questions, please feel free to reach out to us at samayacommunityevents@gmail.com</p>
        <p>Best regards,<br>Samaya Global Team</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(vendorMailOptions);

    res.json({
      success: true,
      message: 'Your partnership inquiry has been submitted successfully!',
    });
  } catch (error) {
    console.error('Partnership form error:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error submitting your partnership inquiry. Please try again later.',
    });
  }
});

// Volunteer Form Endpoint
app.post('/api/volunteer', async (req, res) => {
  try {
    const { name, email, age, timeCommitment, educationLevel, details } = req.body;

    // Validation
    if (!name || !email || !timeCommitment) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and time commitment are required',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
      });
    }

    // Send email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Volunteer Application: ${name}`,
      html: `
        <h2>New Volunteer Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Age:</strong> ${age || 'N/A'}</p>
        <p><strong>Time Commitment:</strong> ${timeCommitment}</p>
        <p><strong>Education Level:</strong> ${educationLevel || 'N/A'}</p>
        <p><strong>Details:</strong></p>
        <p>${details ? details.replace(/\n/g, '<br>') : 'N/A'}</p>
      `,
    };

    // Send confirmation email to volunteer
    const volunteerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Your Interest in Volunteering - Samaya Global',
      html: `
        <h2>Thank you for your volunteer application</h2>
        <p>Hi ${name},</p>
        <p>We have received your volunteer application and are grateful for your interest in supporting Samaya Global's mission. Our team will review your application and get back to you within 5-7 business days.</p>
        <p>If you have any questions in the meantime, feel free to reach out to us at samayacommunityevents@gmail.com</p>
        <p>Best regards,<br>Samaya Global Team</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(volunteerMailOptions);

    res.json({
      success: true,
      message: 'Your volunteer application has been submitted successfully!',
    });
  } catch (error) {
    console.error('Volunteer form error:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error submitting your volunteer application. Please try again later.',
    });
  }
});

// AI Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      });
    }

    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
      console.error('GROQ_API_KEY is not set!');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please contact samayacommunityevents@gmail.com',
      });
    }

    // Filter harmful content
    const harmfulKeywords = [
      'hate', 'violence', 'illegal', 'bomb', 'kill', 'hurt',
      'drug', 'abuse', 'sexual', 'explicit', 'harassment',
    ];

    const lowerMessage = message.toLowerCase();
    if (harmfulKeywords.some((kw) => lowerMessage.includes(kw))) {
      return res.json({
        success: true,
        message:
          "I'm here to help with Samaya Global topics — events, volunteering, donations, and our mission. Let me know how I can assist with those! 💚",
        isFiltered: true,
      });
    }

    const systemPrompt = `You are **Samaya Care**, the AI assistant for Samaya Global — a US-based 501(c)(3) nonprofit uplifting women and children facing emotional, social, and economic hardship.

RESPONSE RULES:
- Be concise. 1-3 short sentences per point. No walls of text.
- Use bullet points (•) for lists, **bold** for key info, emoji sparingly.
- Always include clickable full URLs (https://samayaglobal.org/...) when referencing pages.
- Give a clear next step: a link, email, or phone number.
- Don't repeat what the user already knows. Don't restate their question.
- If asked something outside your knowledge, say so honestly and direct them to email.
- You remember the full conversation — reference earlier messages naturally.

ORGANIZATION KNOWLEDGE:

About: Samaya Global creates safe, compassionate communities through cultural events, mental health support, education, and direct aid. Based in New Jersey, USA.

Leadership:
• **Samiksha Sharma** — Founder. Visionary leader building safe communities for women & children.
• **Siddhi Dubey** — Co-Founder. Mental health advocate focused on healing and empowerment.
• **Mohit Unecha** — Technology Strategist. Powers Samaya's digital presence and tech initiatives.

Programs:
• **Community Events** — Dandiya nights, Diwali, Holi celebrations, yoga sessions, social gatherings
• **Mental Health** — Support circles, wellness workshops, resources for women facing isolation/depression
• **Volunteering** — Flexible opportunities: event help, outreach, social media, mentoring
• **Education** — Empowerment workshops for women & children

Upcoming/Recent Events:
• **Bollywood Fusion Dandiya** — The most awaited Dandiya night in New Jersey
• **Bollywood Garba Night** — Beats, tradition & dance
• **Galentine's Ki Filmy Shaam** — Bollywood, sisterhood & dance celebration
• Event tickets: **$60** (reduced from $80)
• See all events: https://samayaglobal.org/events/

Get Involved:
• **Donate:** https://samayaglobal.org/donate/ — accepts credit card (Autobooks), Venmo, and Zelle
• **Volunteer:** https://samayaglobal.org/volunteer/ — fill out the form or email us
• **Partner:** https://samayaglobal.org/partnership/ — business/vendor partnership inquiries
• **Buy Tickets:** https://samayaglobal.org/tickets/

Contact:
• 📧 samayacommunityevents@gmail.com
• 📞 +1 (508) 212-6915
• 🌐 https://samayaglobal.org
• 📸 Instagram: https://www.instagram.com/samaya_2024/
• 📘 Facebook: https://www.facebook.com/samaya.2024/
• 💬 WhatsApp Community: https://chat.whatsapp.com/CqVIIeyuKek3EO321ZxqwX

Website Pages (use these exact URLs when directing users):
• Home: https://samayaglobal.org/
• Events: https://samayaglobal.org/events/
• Donate: https://samayaglobal.org/donate/
• Team: https://samayaglobal.org/team/
• Contact: https://samayaglobal.org/contact/
• Volunteer: https://samayaglobal.org/volunteer/
• Partnership: https://samayaglobal.org/partnership/
• Tickets: https://samayaglobal.org/tickets/
• Chat: https://samayaglobal.org/chat/
• Privacy: https://samayaglobal.org/privacy/
• Terms: https://samayaglobal.org/terms/

TONE: Warm, genuine, helpful. Like a knowledgeable friend — not robotic or formal. Celebrate impact, invite participation. You're an AI trained on Samaya's info, not a staff member.`;

    // Build conversation messages with history for context
    const messages = [{ role: 'system', content: systemPrompt }];

    // Include up to last 10 messages of conversation history for context
    if (Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages,
        max_tokens: 512,
        temperature: 0.6,
      },
      {
        headers: {
          Authorization: `Bearer ${groqKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiMessage = response.data.choices[0].message.content;

    res.json({
      success: true,
      message: aiMessage,
      isFiltered: false,
    });
  } catch (error) {
    if (error.response) {
      console.error('Groq API Error:', error.response.status, error.response.data);
    } else {
      console.error('Chat error:', error.message);
    }

    res.status(500).json({
      success: false,
      message: 'Sorry, something went wrong. Please try again or email samayacommunityevents@gmail.com 💚',
    });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

app.listen(PORT, () => {
  console.log(`Samaya Global backend server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
