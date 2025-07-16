import { z } from "zod";

export const headerSchema = z.object({
  vr_no: z.string().nonempty("Voucher No is required"),
  vr_date: z.string().nonempty("Voucher Date is required"),
  ac_name: z.string().nonempty("Account Name is required"),
  ac_amt: z.string().nonempty("Amount is required"),
  status: z.enum(["A", "I"], {
    required_error: "Status is required",
    invalid_type_error: "Invalid status selected",
  }),
});