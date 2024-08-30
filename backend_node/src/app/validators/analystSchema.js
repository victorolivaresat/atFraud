const zod = require("zod");

const createAnalystSchema = zod.object({
  name: zod
    .string({
      required_error: "Name is required",
    })
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(255, {
      message: "Name cannot exceed 255 characters",
    }),
  email: zod
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email must be a valid email address",
    }),
  pass: zod
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(255, {
      message: "Password cannot exceed 255 characters",
    }),
  image: zod
    .string()
    .url({
      message: "Image must be a valid URL",
    })
    .optional(),
  companyId: zod
    .number({
      required_error: "Company ID is required",
    })
    .int({
      message: "Company ID must be an integer",
    }),
  typeAnalystId: zod
    .number({
      required_error: "Type Analyst ID is required",
    })
    .int({
      message: "Type Analyst ID must be an integer",
    }),
  flgActive: zod.boolean({
    required_error: "Active flag is required",
  }),
  flgChangePass: zod.boolean().optional(),
  flgMailBox: zod.boolean().optional(),
  changePassDate: zod.date().optional(),
  cantLog: zod.number().int().optional(),
  flgBlocked: zod.boolean({
    required_error: "Blocked flag is required",
  }),
  rememberToken: zod.string().optional(),
});

const updateAnalystSchema = createAnalystSchema.partial();

module.exports = { createAnalystSchema, updateAnalystSchema };
