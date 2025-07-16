import { z } from "zod";

const headerSchema = z.object({
  vr_no: z.string().nonempty("Voucher number is required"),
  vr_date: z.string().nonempty("Voucher date is required"),
  ac_name: z.string().nonempty("Account name is required"),
  ac_amt: z
    .number()
    .min(0, "Amount must be 0 or more")
    .or(z.string().regex(/^\d+$/).transform(Number)), // fallback for RHF string inputs
  status: z.enum(["A", "I"], {
    errorMap: () => ({ message: "Status must be selected" }),
  }),
});

const detailRowSchema = z.object({
  sr_no: z.number().optional(),
  item_code: z.string().nonempty("Item code is required"),
  item_name: z.string().nonempty("Item name is required"),
  description: z.string().optional(),
  qty: z
    .number({ invalid_type_error: "Qty must be a number" })
    .min(1, "Quantity must be at least 1"),
  rate: z
    .number({ invalid_type_error: "Rate must be a number" })
    .min(0, "Rate cannot be negative"),
  vr_no: z.string().optional(), // This will be added dynamically before submit
});

export const combinedFormSchema = z.object({
  header: headerSchema,
  details: z
    .array(detailRowSchema)
    .min(1, "At least one detail row is required"),
});
