import { delay } from "@/utils/helpers";
import type { BillingData } from "@/features/billing/types";

const billingData: BillingData = {
  overview: {
    suiteName: "Premium Audit Suite",
    isActive: true,
    statusLabel: "Active Subscription",
    activeClients: 45,
    activeDossiers: 65,
  },
  invoices: [
    { id: "1", invoiceNumber: "INV001", status: "success", date: "12-05-2026", amount: "€250.00" },
    { id: "2", invoiceNumber: "INV001", status: "failed", date: "12-05-2026", amount: "€250.00" },
    { id: "3", invoiceNumber: "INV001", status: "success", date: "12-05-2026", amount: "€250.00" },
    { id: "4", invoiceNumber: "INV001", status: "pending", date: "12-05-2026", amount: "€250.00" },
    { id: "5", invoiceNumber: "INV001", status: "success", date: "12-05-2026", amount: "€250.00" },
    { id: "6", invoiceNumber: "INV001", status: "pending", date: "12-05-2026", amount: "€250.00" },
    { id: "7", invoiceNumber: "INV001", status: "failed", date: "12-05-2026", amount: "€250.00" },
    { id: "8", invoiceNumber: "INV001", status: "pending", date: "12-05-2026", amount: "€250.00" },
    { id: "9", invoiceNumber: "INV001", status: "pending", date: "12-05-2026", amount: "€250.00" },
    { id: "10", invoiceNumber: "INV001", status: "success", date: "12-05-2026", amount: "€250.00" },
    { id: "11", invoiceNumber: "INV001", status: "failed", date: "12-05-2026", amount: "€250.00" },
  ],
};

export async function fetchBillingData(): Promise<BillingData> {
  await delay(450);
  return billingData;
}
