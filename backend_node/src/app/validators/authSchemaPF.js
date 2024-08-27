const zod = require("zod");

const loginSchema = zod.object({
  usuario: zod
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  pass: zod
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(255),
});

module.exports = { loginSchema };