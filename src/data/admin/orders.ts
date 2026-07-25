import { AdminOrder } from "@/types/admin";

export const adminOrders: AdminOrder[] = [
  {
    id: "RZQ-10231",
    customerName: "Nusrat Jahan",
    customerPhone: "+880 1711-223344",
    date: "2026-07-09",
    status: "Delivered",
    total: 2450,
    items: [
      { productName: "Sundarban Raw Honey", variantSize: "500 gm", quantity: 2, price: 650 },
      { productName: "Pure Desi Ghee", variantSize: "500 gm", quantity: 1, price: 950 },
    ],
  },
  {
    id: "RZQ-10232",
    customerName: "Rafiul Islam",
    customerPhone: "+880 1922-556677",
    date: "2026-07-10",
    status: "Shipped",
    total: 1450,
    items: [{ productName: "Premium Ajwa Dates", variantSize: "500 gm", quantity: 1, price: 1450 }],
  },
  {
    id: "RZQ-10233",
    customerName: "Farzana Akter",
    customerPhone: "+880 1611-889900",
    date: "2026-07-10",
    status: "Processing",
    total: 940,
    items: [{ productName: "Cold-Pressed Mustard Oil", variantSize: "1 Litre", quantity: 2, price: 420 }],
  },
  {
    id: "RZQ-10234",
    customerName: "Tanvir Ahmed",
    customerPhone: "+880 1811-334455",
    date: "2026-07-11",
    status: "Pending",
    total: 1800,
    items: [{ productName: "Pure Desi Ghee (Jumbo)", variantSize: "1 kg", quantity: 1, price: 1800 }],
  },
  {
    id: "RZQ-10235",
    customerName: "Mahin Chowdhury",
    customerPhone: "+880 1511-778899",
    date: "2026-07-08",
    status: "Cancelled",
    total: 780,
    items: [{ productName: "Premium Almonds", variantSize: "500 gm", quantity: 1, price: 780 }],
  },
];
