// backend/controllers/proposalController.js

import sendMail from "../utils/mailSender.js";

export const initiateProposal = async (req, res) => {
  const { initiatorName, partnerName, partnerEmail, date } = req.body;

  if (!initiatorName || !partnerName || !partnerEmail || !date) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // ✅ FIXED: use correct URL params
  const confirmationLink = `${process.env.CLIENT_URL}/partner-confirm?partnerName=${encodeURIComponent(partnerName)}&date=${encodeURIComponent(date)}&initiatorName=${encodeURIComponent(initiatorName)}`;

  const subject = `💍 A Sweet Surprise from ${initiatorName}`;
  const text = `Hey ${partnerName}, ${initiatorName} wants to make your love official 💖. Click to confirm: ${confirmationLink}`;

  const html = `
    <div style="font-family: sans-serif; text-align: center;">
      <h2>💌 Hey ${partnerName}!</h2>
      <p><strong>${initiatorName}</strong> wants to make your love official on <strong>${date}</strong>!</p>
      <p>Click below to accept this cute proposal 💍:</p>
      <a href="${confirmationLink}" style="display:inline-block;background-color:#ffccdc;color:black;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">Say Yes 💖</a>
      <p style="margin-top: 20px;">With love, <br> Couple Certificate Generator</p>
    </div>
  `;

  try {
    await sendMail(partnerEmail, subject, text, html);
    res.status(200).json({ message: "Proposal email sent to partner 💌" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
};

export const confirmProposal = async (req, res) => {
  const { partnerName, initiatorName, date } = req.body;

  if (!partnerName || !initiatorName || !date) {
    return res.status(400).json({ message: "Missing confirmation info" });
  }

  console.log(`${partnerName} accepted ${initiatorName}'s proposal for ${date}! 💍`);

  return res.status(200).json({ message: "Proposal confirmed" });
};
