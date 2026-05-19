export const sendSuccess = (res, statusCode, data, message = 'Success') => {
  res.status(statusCode).json({
    success: true,
    status: 'success',
    message,
    data,
  });
};

export const sendPaginated = (res, statusCode, data, pagination, message = 'Success') => {
  res.status(statusCode).json({
    success: true,
    status: 'success',
    message,
    data,
    pagination,
  });
};
