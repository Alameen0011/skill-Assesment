import { useFieldArray, useFormContext } from "react-hook-form";
import { useGetItemMasterQuery } from "../features/sales/salesApi";

const Details = () => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const { data: items = [] } = useGetItemMasterQuery();

  return (
    <div className="mt-8 border border-black rounded-md">
      <div className="bg-yellow-300 text-center font-bold py-1 border-b border-black">
        Detail
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[60px_120px_160px_1fr_80px_80px_60px] text-sm font-semibold bg-gray-100 border-b border-black">
        <div className="border border-black p-1 text-center">Sr No</div>
        <div className="border border-black p-1 text-center">Item Code</div>
        <div className="border border-black p-1 text-center">Item Name</div>
        <div className="border border-black p-1 text-center">Description</div>
        <div className="border border-black p-1 text-center">Qty</div>
        <div className="border border-black p-1 text-center">Rate</div>
        <div className="border border-black p-1 text-center">Cancel</div>
      </div>

      {/* Table Rows */}
      {fields.map((field, index) => {
        const rowErrors = errors?.details?.[index] || {};
        const missingFields = [];

        if (rowErrors.item_code) missingFields.push("Item Code");
        if (rowErrors.description) missingFields.push("Description");
        if (rowErrors.qty) missingFields.push("Qty");
        if (rowErrors.rate) missingFields.push("Rate");

        return (
          <div key={field.id}>
            <div className="grid grid-cols-[60px_120px_160px_1fr_80px_80px_60px] text-sm">
              <input
                {...register(`details.${index}.sr_no`, { valueAsNumber: true })}
                readOnly
                className="border border-black p-1 text-center bg-gray-50"
              />

              <select
                {...register(`details.${index}.item_code`)}
                onChange={(e) => {
                  const selectedCode = e.target.value;
                  const selectedItem = items.find(
                    (item) => item.item_code === selectedCode
                  );
                  setValue(`details.${index}.item_code`, selectedCode);
                  setValue(`details.${index}.item_name`, selectedItem?.item_name || "");
                }}
                className="border border-black p-1 bg-white"
              >
                <option value="">Item Code</option>
                {items.map((item) => (
                  <option key={item.item_code} value={item.item_code}>
                    {item.item_code}
                  </option>
                ))}
              </select>

              <input
                {...register(`details.${index}.item_name`)}
                placeholder="Item Name"
                readOnly
                className="border border-black p-1 bg-gray-50"
              />

              <input
                {...register(`details.${index}.description`)}
                placeholder="Description"
                className="border border-black p-1"
              />

              <input
                type="number"
                {...register(`details.${index}.qty`, { valueAsNumber: true })}
                placeholder="Qty"
                className="border border-black p-1 text-right"
              />

              <input
                type="number"
                {...register(`details.${index}.rate`, { valueAsNumber: true })}
                placeholder="Rate"
                className="border border-black p-1 text-right"
              />

              <button
                type="button"
                onClick={() => remove(index)}
                className="border border-black text-red-600 hover:bg-red-100 p-1 text-center"
              >
                ❌
              </button>
            </div>

            {/* Unified Row Error */}
            {missingFields.length > 0 && (
              <div className="col-span-full text-red-500 text-xs italic ml-2 mb-1">
                Row {index + 1}: Missing {missingFields.join(", ")}
              </div>
            )}
          </div>
        );
      })}

      {/* Add Row Button */}
      <div className="p-2 border-t border-black text-right">
        <button
          type="button"
          onClick={() => {
            const maxSrNo =
              fields.length > 0
                ? Math.max(...fields.map((f) => Number(f.sr_no) || 0))
                : 0;

            append({
              sr_no: maxSrNo + 1,
              item_code: "",
              item_name: "",
              description: "",
              qty: 0,
              rate: 0,
            });
          }}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
        >
          ➕ Add Row
        </button>
      </div>
    </div>
  );
};

export default Details;


