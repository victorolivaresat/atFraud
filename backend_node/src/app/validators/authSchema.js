const zod = require("zod");

const loginSchema = zod.object({
  email: zod
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  password: zod
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(255, {
      message: "Password cannot exceed 255 characters",
    }),
});

module.exports = { loginSchema };
