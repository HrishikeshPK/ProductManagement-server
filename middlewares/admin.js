const adminOnly = (req, res, next) => {
    console.log("Inside AdminOnly Middleware");
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ msg: "Admin access only" });
  }
  next();
};

module.exports = adminOnly;
