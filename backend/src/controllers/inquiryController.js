import Inquiry from "../models/Inquiry.js";
import nodemailer from "nodemailer";

const sendEmailNotification = async (inquiry) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log("SMTP environment variables not configured. Skipping nodemailer alert.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10) || 587,
    secure: parseInt(SMTP_PORT, 10) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const targetEmail = ADMIN_EMAIL || "studio@ravitej.art";

  const mailOptions = {
    from: `"Monochrome Art Emporium" <${SMTP_USER}>`,
    to: targetEmail,
    subject: `New Studio Inquiry from ${inquiry.name}: ${inquiry.subject || "No Subject"}`,
    text: `You have received a new inquiry on Monochrome Art Emporium.\n\nFrom: ${inquiry.name} (${inquiry.email})\nSubject: ${inquiry.subject || "N/A"}\nMessage:\n${inquiry.message}\n\nManage inquiries by logging into your admin dashboard.`,
    html: `
      <h3>New Inquiry Received</h3>
      <p><strong>From:</strong> ${inquiry.name} (<a href="mailto:${inquiry.email}">${inquiry.email}</a>)</p>
      <p><strong>Subject:</strong> ${inquiry.subject || "N/A"}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line; background-color: #f9f9f9; padding: 15px; border-left: 3px solid #000;">${inquiry.message}</p>
      <br/>
      <hr/>
      <p style="font-size: 0.8em; color: #666;">This is an automated notification from Monochrome Art Emporium.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent successfully to ${targetEmail}`);
  } catch (error) {
    console.error("Nodemailer failed to send notification:", error);
  }
};

export const createInquiry = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    const errors = {};
    const trimmedName = String(name ?? "").trim();
    const trimmedEmail = String(email ?? "").trim();
    const trimmedMessage = String(message ?? "").trim();
    const trimmedSubject = String(subject ?? "").trim();

    if (!trimmedName) {
      errors.name = "Name is required";
    } else if (trimmedName.length > 100) {
      errors.name = "Name cannot exceed 100 characters";
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!trimmedEmail) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address";
    }

    if (trimmedSubject.length > 200) {
      errors.subject = "Subject cannot exceed 200 characters";
    }

    if (!trimmedMessage) {
      errors.message = "Message is required";
    } else if (trimmedMessage.length < 10) {
      errors.message = "Message must be at least 10 characters long";
    } else if (trimmedMessage.length > 2000) {
      errors.message = "Message cannot exceed 2000 characters";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const inquiry = new Inquiry({
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage,
    });

    await inquiry.save();

    // Trigger email notification asynchronously (don't block the HTTP response)
    sendEmailNotification(inquiry);

    return res.status(201).json({ message: "Inquiry received" });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const { read, page = 1, limit = 20 } = req.query;

    const query = {};
    if (read !== undefined) {
      query.read = read === "true";
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Inquiry.countDocuments(query);
    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const unreadCount = await Inquiry.countDocuments({ read: false });

    return res.status(200).json({
      inquiries,
      total,
      unreadCount,
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    return res.status(200).json(inquiry);
  } catch (error) {
    console.error("Error marking inquiry as read:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
