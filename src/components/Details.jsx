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
    <div>
      <h2>Detail Form</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-6 gap-2 mb-2">
          <input {...register(`details.${index}.sr_no`, { valueAsNumber: true })} readOnly />

          {/* <select
            {...register(`details.${index}.item_code`)}
            onChange={(e) => {
              const selectedCode = e.target.value;
              const selectedItem = items.find(
                (item) => item.item_code === selectedCode
              );
              setValue(`details.${index}.item_code`, selectedCode);
              setValue(
                `details.${index}.item_name`,
                selectedItem?.item_name || ""
              );
            }}
          > */}
          <select
            {...register(`details.${index}.item_code`)}
            onChange={(e) => {
              const selectedCode = e.target.value;
              const selectedItem = items.find(
                (item) => item.item_code === selectedCode
              );
              setValue(`details.${index}.item_code`, selectedCode);
              setValue(
                `details.${index}.item_name`,
                selectedItem?.item_name || ""
              );
            }}
          >
            <option value="">Item Code</option>
            {items.map((item) => (
              <option key={item.item_code} value={item.item_code}>
                {item.item_code}
              </option>
            ))}
          </select>
          {errors?.details?.[index]?.item_code && (
            <p>{errors.details[index].item_code.message}</p>
          )}

          <input
            {...register(`details.${index}.item_name`)}
            placeholder="Item Name"
            readOnly
          />

          <input
            {...register(`details.${index}.description`)}
            placeholder="Description"
          />
          {errors?.details?.[index]?.description && (
            <p>{errors.details[index].description.message}</p>
          )}

          <input
            type="number"
            {...register(`details.${index}.qty`, { valueAsNumber: true })}
            placeholder="Qty"
          />
          {errors?.details?.[index]?.qty && (
            <p>{errors.details[index].qty.message}</p>
          )}

          <input
            type="number"
            {...register(`details.${index}.rate`, { valueAsNumber: true })}
            placeholder="Rate"
          />
          {errors?.details?.[index]?.rate && (
            <p>{errors.details[index].rate.message}</p>
          )}
          {/* Remove button */}
          <button
            type="button"
            onClick={() => remove(index)}
            className="bg-red-600 text-white px-2 py-1 rounded"
          >
            ❌
          </button>
        </div>
      ))}

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
        className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
      >
        ➕ Add Row
      </button>
    </div>
  );
};

export default Details;
