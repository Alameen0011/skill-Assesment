import { useFormContext } from "react-hook-form";

const Header = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <input {...register("header.vr_no")} placeholder="Voucher No" />
      {errors?.header?.vr_no && <p>{errors.header.vr_no.message}</p>}

      <input type="date" {...register("header.vr_date")} />
      {errors?.header?.vr_date && <p>{errors.header.vr_date.message}</p>}

      <input {...register("header.ac_name")} placeholder="Account Name" />
      {errors?.header?.ac_name && <p>{errors.header.ac_name.message}</p>}

      <input
        type="number"
        {...register("header.ac_amt", { valueAsNumber: true }) }
        placeholder="Amount"
        readOnly 
      />
      {errors?.header?.ac_amt && <p>{errors.header.ac_amt.message}</p>}

      <select {...register("header.status")} className="border rounded p-2">
        <option value="">-- Select Status --</option>
        <option value="A">Active</option>
        <option value="I">Inactive</option>
      </select>
      {errors?.header?.status && <p>{errors.header.status.message}</p>}
    </div>
  );
};

export default Header;
