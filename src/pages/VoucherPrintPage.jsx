// pages/VoucherPrintPage.jsx
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import VoucherPrint from "../components/VoucherPrint";


export default function VoucherPrintPage() {
  const printRef = useRef();

  return (
    <div className="p-6">
      <ReactToPrint
        trigger={() => (
          <button className="bg-blue-600 text-white px-4 py-2 mb-4">
            🖨️ Print Voucher
          </button>
        )}
        content={() => printRef.current}
        documentTitle="Sales Voucher"
        pageStyle="@media print { body { -webkit-print-color-adjust: exact; } }"
      />

      <VoucherPrint ref={printRef} />
    </div>
  );
}
