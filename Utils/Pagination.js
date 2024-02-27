exports.PaginateQuery = async (req, res, next) => {
  const {
    query: { page = 1, limit = 10 },
  } = req;
  req.pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    skip: (page - 1) * limit,
  };
  next();
};
