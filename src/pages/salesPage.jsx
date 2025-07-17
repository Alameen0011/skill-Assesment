import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "../components/Header";
import Details from "../components/Details";
import { combinedFormSchema } from "../schema/combinedSchema";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveSaleData } from "../features/sales/salesSlice";
import { useEffect } from "react";
// import { useSubmitSalesEntryMutation } from "../features/sales/salesApi";

export default function SalesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [submitSales] = useSubmitSalesEntryMutation();


  const currentVrNo = Number(localStorage.getItem("last_vr_no") || "0");
  const nextVrNo = currentVrNo + 1;


  const methods = useForm({
    resolver: zodResolver(combinedFormSchema),
    defaultValues: {
      header: {
        vr_no: nextVrNo,
        vr_date: new Date().toISOString().split("T")[0],
        ac_name: "",
        ac_amt: 0,
        status: "",
      },
      details: [
        {
          sr_no: 1,
          item_code: "",
          item_name: "",
          description: "",
          qty: 0,
          rate: 0,
        },
      ],
    },
  });

  const { handleSubmit, reset, setValue, control } = methods;

  const details = useWatch({ control, name: "details" });

  useEffect(() => {
    const total = details.reduce(
      (sum, row) => sum + (row.qty || 0) * (row.rate || 0),
      0
    );
    setValue("header.ac_amt", total);
  }, [details, setValue]);

  
  const getNextVrNo = () => {
    const lastVrNo = Number(localStorage.getItem("last_vr_no") || "0");
    return lastVrNo + 1;
  };

  const updateVrNoInStorage = (vr_no) => {
    localStorage.setItem("last_vr_no", vr_no.toString());
  };

  const onSubmit = async (data) => {
    console.log(data, "data before enriching");
    // Add `vr_no` to each detail row
    const newVrNo = getNextVrNo();

    const enriched = {
      header_table: { ...data.header, vr_no: newVrNo },
      detail_table: data.details.map((row) => ({
        ...row,
        vr_no: newVrNo,
      })),
    };
    console.log("Final Submit Data:", enriched);
    console.log("Sending to API:", enriched);

    try {
      dispatch(saveSaleData(enriched));

      // await submitSales(enriched).unwrap(); // ✅ API Call
      updateVrNoInStorage(newVrNo);
      alert("Sale entry submitted successfully!");

      navigate("/print");
      reset();
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to submit sale entry.");
    }
  };

  return (
<FormProvider {...methods}>
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="max-w-5xl mx-auto p-4 space-y-4"
  >
    <Header />
    <Details />
    <div className="text-right">
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  </form>
</FormProvider>

  );
}
