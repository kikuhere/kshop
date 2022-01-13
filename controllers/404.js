exports.get404 = (req, res, next) => {
  res.render("404", { pageTitle: "Oh.. Noo <br> You are Lost somewhere" });
};
