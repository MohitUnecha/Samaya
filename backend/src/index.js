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
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      });
    }

    // DEBUG: Log environment variables
    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
      console.error('GROQ_API_KEY is not set!');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: Missing API key. Please contact samayacommunityevents@gmail.com',
      });
    }

    // Filter harmful content
    const harmfulKeywords = [
      'hate',
      'violence',
      'illegal',
      'bomb',
      'kill',
      'hurt',
      'drug',
      'abuse',
      'sexual',
      'explicit',
      'harassment',
    ];
    
    const lowerMessage = message.toLowerCase();
    const isHarmful = harmfulKeywords.some((keyword) =>
      lowerMessage.includes(keyword)
    );

    if (isHarmful) {
      return res.json({
        success: true,
        message:
          "I appreciate you reaching out, but I'm not able to discuss that topic. I'm here to help with questions about Samaya Global's programs, events, volunteering, donations, and community initiatives. How can I assist you with those topics instead?",
        isFiltered: true,
      });
    }

    const systemPrompt = `You are Samaya Care, an intelligent and witty AI assistant for Samaya Global. You are deeply trained on all aspects of the organization and excel at providing helpful, smart responses.

CRITICAL INSTRUCTIONS - READ CAREFULLY:
1. BE CONCISE: Keep responses SHORT and direct. Maximum 2-3 sentences per point
2. SUMMARIZE: Use bullet points and clear formatting to make information scannable
3. BE SMART: Don't repeat information. Skip fluff and get straight to value
4. USE FORMATTING: Use • for lists, **bold** for emphasis, and emoji for visual appeal
5. ACTION-FOCUSED: Always tell users what to DO next (links, phone, email, specific actions)
6. ONE TOPIC: Focus on what they asked. Don't overwhelm with extra info unless asked
7. LINKS: When referencing a page, include the full URL so it is clickable

SAMAYA GLOBAL - QUICK REFERENCE:

**WHO WE ARE:**
501(c)(3) nonprofit uplifting women & children facing emotional, social & economic hardship through community & cultural connection

**CORE PROGRAMS:**
• Community Events: Dandiya nights, Diwali celebrations, yoga, social gatherings
• Mental Health Support: Support circles, wellness programs, mental health resources
• Volunteer Opportunities: Flexible ways to contribute based on time & interests
• Education & Workshops: Empowerment programs for women & children

**LEADERSHIP:**
• Samiksha Sharma (Founder) - Visionary leader creating safe communities
• Siddhi Dubey (Co-Founder) - Mental health advocate & healing advocate
• Mohit Unecha (Technology Strategist) - Tech expert amplifying our digital presence

**HOW TO GET INVOLVED:**
💝 **DONATE:** Autobooks (credit card), Venmo, Zelle | Visit https://samayaglobal.com/donate | Phone: +1 (508) 212-6915
🎉 **EVENTS:** Check our calendar for upcoming cultural celebrations & activities
🤝 **VOLUNTEER:** Visit https://samayaglobal.com/volunteer or email samayacommunityevents@gmail.com
🎫 **TICKETS:** Event tickets just $60 (down from $80!)

**CONTACT:**
📧 samayacommunityevents@gmail.com
📞 +1 (508) 212-6915
🌐 https://samayaglobal.com
📱 Instagram: @samaya_2024 | Facebook: facebook.com/samaya.2024

**TONE & RESPONSE GUIDELINES:**
1. Be warm, kind, and genuinely caring - reflect Samaya's mission
2. Use conversational language but stay professional
3. Ask clarifying questions only if absolutely needed
4. Provide specific, actionable next steps
5. If unsure, direct to email/phone with specific department
6. Keep AI transparency: you're an AI trained on our info, not our official team
7. Celebrate our impact and invite participation
8. For sensitive topics or complex questions, suggest contacting the team directly
9. Use emoji sparingly but effectively to add personality
10. Always be concise - most people are busy, respect their time`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 1024,
        temperature: 0.7,
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
      message: 'Sorry, I encountered an issue. Please try again or reach out to samayacommunityevents@gmail.com',
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
