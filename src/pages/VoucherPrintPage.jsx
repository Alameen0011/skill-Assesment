import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import VoucherPrint from "../components/VoucherPrint";

function VoucherPrintPage() {
  const contentRef = useRef(null);

  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
<div className="min-h-screen bg-gray-100 flex items-start justify-center py-10 px-4">
  <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
    {/* Print Button */}
    <div className="flex justify-end mb-6">
      <button
        onClick={reactToPrintFn}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded shadow"
      >
        🖨️ Print Voucher
      </button>
    </div>

    {/* Voucher Print Content */}
    <VoucherPrint ref={contentRef} />
  </div>
</div>

  );
}

export default VoucherPrintPage;
