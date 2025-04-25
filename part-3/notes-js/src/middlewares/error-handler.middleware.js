const errorHandler = (error, req, res, next) => {
  if (error.isJoi) {
    for (const detail of error.details) {
      return res.status(400).json({ message: detail.message });
    }
  }

  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  res.status(status).json({ message });
};

module.exports = errorHandler;
