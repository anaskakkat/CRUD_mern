const notFound = (req, res, next) => {
  const error = new Error(`Not FOund -${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource Not Found";
    stack: proccess.env.NODE_ENV === "production" ? null : err.stack;
  }
};


export{notFound,errorHandler}