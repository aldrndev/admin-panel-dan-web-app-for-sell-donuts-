const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (error.message === 'ingredients_not_found') {
    statusCode = 404;
    message = 'Ingredients not found';
  }

  if (error.message === 'category_not_found') {
    statusCode = 404;
    message = 'Category not found';
  }

  if (error.message === 'unauthorized' || error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Please login first';
  }

  if (
    error.message === 'user_not_found_login' ||
    error.message === 'password_invalid'
  ) {
    statusCode = 401;
    message = 'Invalid email/password';
  }

  if (error.message === 'item_not_found') {
    statusCode = 404;
    message = 'Item not found';
  }

  if (error.message === 'email_required') {
    statusCode = 400;
    message = 'Email is required';
  }

  if (error.message === 'password_required') {
    statusCode = 400;
    message = 'Password is required';
  }

  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    statusCode = 400;
    message = error.errors[0].message;
  }

  res.status(statusCode).json({
    message,
  });
};

module.exports = errorHandler;
