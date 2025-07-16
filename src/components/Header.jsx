import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { headerSchema } from "../schema/headerSchema";
import { updateHeader } from "../features/sales/salesSlice";

const Header = () => {
  const dispatch = useDispatch();
  const headerForm = useSelector((state) => state.sales.header);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: headerForm,
    resolver: zodResolver(headerSchema),
  });


  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
        console.log(value,name,type)
        if(name){
            dispatch(updateHeader({ field: name, value: value[name] }));
        }
    });

    return () => subscription.unsubscribe();

  },[watch,dispatch])
 

  return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log("submit", data))}>
        <input {...register("vr_no")} placeholder="Voucher No" />
        {errors.vr_no && <p>{errors.vr_no.message}</p>}

        <input type="date" {...register("vr_date")} />
        {errors.vr_date && <p>{errors.vr_date.message}</p>}

        <input {...register("ac_name")} placeholder="Account Name" />
        {errors.ac_name && <p>{errors.ac_name.message}</p>}

        <input type="number" {...register("ac_amt")} placeholder="Amount" />
        {errors.ac_amt && <p>{errors.ac_amt.message}</p>}

        <select
          id="status"
          {...register("status")}
          className="border rounded p-2"
        >
          <option value="">-- Select Status --</option>
          <option value="A">Active</option>
          <option value="I">Inactive</option>
        </select>
        {errors.status && <p>{errors.status.message}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Header;
