const { User } = require("../model/user");
const ErrorResponse = require("../utils/error");
const jwt = require("jsonwebtoken");
const userProtected = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);

  if (!token || token === "null") {
    return next(new ErrorResponse(MESSAGE.NOT_AUTHORIZED, 401));
  }
  try {
    const decodeJwt = jwt.verify(token, "1234567");

    const user = await User.findById({
      _id: decodeJwt.id,
    });

    if (!user) {
      return next(new ErrorResponse(MESSAGE.NOT_AUTHORIZED, 401));
    }
    // req.User = {
    //   id: user.id,

    //   email: user.email,
    // };

    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new ErrorResponse("Token has expired", 401));
    }
    console.log(err);
    return next(new ErrorResponse("An error occurred", 500));
  }
};

module.exports = {
  userProtected,
};
