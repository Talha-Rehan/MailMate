// controllers/healthController.js
exports.getHealthStatus = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "✅ MailMate Backend is running!",
    timestamp: new Date().toISOString()
  });
};
