import Joi from "joi";

const authLogin = (req, res, next) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    roles: Joi.string().valid("student", "admin").required(),
  });
  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: "Bad Request" });
  }
};

export default authLogin;
