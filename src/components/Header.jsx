import { useFormContext } from "react-hook-form";

const Header = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-md mt-10">
      {/* Voucher No */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Voucher No</label>
        <input
          {...register("header.vr_no")}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Auto-generated"
          readOnly
        />
        {errors?.header?.vr_no && (
          <span className="text-red-500 text-sm">{errors.header.vr_no.message}</span>
        )}
      </div>

      {/* Voucher Date */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          {...register("header.vr_date")}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors?.header?.vr_date && (
          <span className="text-red-500 text-sm">{errors.header.vr_date.message}</span>
        )}
      </div>

      {/* Account Name */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Account Name</label>
        <input
          {...register("header.ac_name")}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Account Name"
        />
        {errors?.header?.ac_name && (
          <span className="text-red-500 text-sm">{errors.header.ac_name.message}</span>
        )}
      </div>

      {/* Amount */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          {...register("header.ac_amt", { valueAsNumber: true })}
          className="border rounded px-3 py-2 bg-gray-100"
          readOnly
        />
        {errors?.header?.ac_amt && (
          <span className="text-red-500 text-sm">{errors.header.ac_amt.message}</span>
        )}
      </div>

      {/* Status */}
      <div className="flex flex-col md:col-span-2">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          {...register("header.status")}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Status --</option>
          <option value="A">Active</option>
          <option value="I">Inactive</option>
        </select>
        {errors?.header?.status && (
          <span className="text-red-500 text-sm">{errors.header.status.message}</span>
        )}
      </div>
    </div>
  );
};

export default Header;
