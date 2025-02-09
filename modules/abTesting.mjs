const AB_COOKIE = "ab_variant";

const abTest = (req, res, next) => {
  const testVariations = ["A", "B"];
  let variant = req.cookies[AB_COOKIE];

  if (!variant) {
    variant = testVariations[Math.floor(Math.random() * testVariations.length)];
    res.cookie(AB_COOKIE, variant, {maxAge: 1000 * 60 * 60 * 24});
  }

  req.abVariant = variant;
  
  next();
};

export default abTest;
