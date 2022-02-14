const handleError = (error, res) => {
  console.log(error);
  console.log(error.status || 500);
  res.json({
    message: error.message,
  });
};

module.exports = handleError;
