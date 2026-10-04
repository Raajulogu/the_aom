export type OpsStatus = "Processing" | "On Track" | "Attention" | "Completed";

export const TODAY = "September 5, 2026";

export const kpis = [
  { label: "Active Customers", value: "57", note: "3 added this month", tone: "brand" as const },
  { label: "Today's Soil Received", value: "1,248", note: "items", tone: "sky" as const },
  { label: "Today's Fresh Delivered", value: "1,087", note: "items", tone: "brand" as const },
  { label: "Pending Laundry", value: "161", note: "items in process", tone: "warn" as const },
  { label: "Today's Laundry Value", value: "₹84,560", note: "6.2% vs last week", tone: "ink" as const },
  { label: "Pending Invoices", value: "8", note: "₹3.1L outstanding", tone: "danger" as const },
];

export type Customer = {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  gst: string;
  materials: number;
  soil: number;
  fresh: number;
  balance: number;
  total: number;
  status: "Active" | "Inactive";
  ops: OpsStatus;
  monthlyValue: string;
  note: string;
};

export const customers: Customer[] = [
  {
    id: "hotel-grand-a",
    name: "Hotel Grand A",
    contact: "Suresh Babu",
    phone: "98765 43210",
    email: "ops@hotelgranda.in",
    address: "12 Mission Street, Pondicherry 605001",
    gst: "34AABCG1234K1Z5",
    materials: 6,
    soil: 120,
    fresh: 100,
    balance: 45,
    total: 165,
    status: "Active",
    ops: "Processing",
    monthlyValue: "₹84,500",
    note: "42 items open",
  },
  {
    id: "hotel-royal-b",
    name: "Hotel Royal B",
    contact: "Meena Rajan",
    phone: "98765 43211",
    email: "front@royalb.in",
    address: "5 Rue Suffren, Pondicherry 605001",
    gst: "34AACCR7788L1Z2",
    materials: 5,
    soil: 85,
    fresh: 80,
    balance: 20,
    total: 105,
    status: "Active",
    ops: "On Track",
    monthlyValue: "₹58,200",
    note: "on schedule",
  },
  {
    id: "ocean-resort",
    name: "Ocean Resort",
    contact: "Anand Krishnan",
    phone: "98765 43212",
    email: "housekeeping@oceanresort.in",
    address: "ECR Road, Kottakuppam 605104",
    gst: "34AAECO4455M1Z9",
    materials: 7,
    soil: 150,
    fresh: 125,
    balance: 65,
    total: 215,
    status: "Active",
    ops: "Attention",
    monthlyValue: "₹72,300",
    note: "high backlog",
  },
  {
    id: "green-park-hotel",
    name: "Green Park Hotel",
    contact: "Lakshmi Devi",
    phone: "98765 43213",
    email: "admin@greenpark.in",
    address: "22 Nehru Street, Pondicherry 605001",
    gst: "34AAFCG9911N1Z4",
    materials: 4,
    soil: 72,
    fresh: 72,
    balance: 12,
    total: 144,
    status: "Active",
    ops: "Completed",
    monthlyValue: "₹41,900",
    note: "settled",
  },
  {
    id: "sunrise-resort",
    name: "Sunrise Resort",
    contact: "Vikram Rao",
    phone: "98765 43214",
    email: "stay@sunriseresort.in",
    address: "Auroville Main Road, Pondicherry 605101",
    gst: "34AAGCS2233P1Z7",
    materials: 5,
    soil: 96,
    fresh: 80,
    balance: 31,
    total: 176,
    status: "Inactive",
    ops: "Processing",
    monthlyValue: "₹36,400",
    note: "in queue",
  },
];

export const materials = [
  { name: "Bedsheet", category: "Bedding", unit: "Piece", rate: 90 },
  { name: "Pillow Cover", category: "Bedding", unit: "Piece", rate: 35 },
  { name: "Bath Towel", category: "Bathroom", unit: "Piece", rate: 70 },
  { name: "Hand Towel", category: "Bathroom", unit: "Piece", rate: 50 },
  { name: "Blanket", category: "Bedding", unit: "Piece", rate: 130 },
  { name: "Curtain", category: "Room", unit: "Piece", rate: 180 },
  { name: "Hotel Uniform", category: "Staff", unit: "Piece", rate: 110 },
];

export const customerPricing = [
  { material: "Bedsheet", defaultRate: 90, rate: 100 },
  { material: "Pillow Cover", defaultRate: 35, rate: 40 },
  { material: "Bath Towel", defaultRate: 70, rate: 80 },
  { material: "Blanket", defaultRate: 130, rate: 150 },
];

export const materialLedger = [
  { material: "Bedsheet", opening: 20, soil: 10, fresh: 8, balance: 22, total: 32 },
  { material: "Bath Towel", opening: 15, soil: 20, fresh: 18, balance: 17, total: 37 },
  { material: "Pillow Cover", opening: 10, soil: 8, fresh: 8, balance: 10, total: 18 },
  { material: "Blanket", opening: 6, soil: 4, fresh: 3, balance: 7, total: 11 },
];

export const weekly = [
  { day: "Mon", soil: 1120, fresh: 990 },
  { day: "Tue", soil: 1248, fresh: 1120 },
  { day: "Wed", soil: 1024, fresh: 930 },
  { day: "Thu", soil: 1344, fresh: 1216 },
  { day: "Fri", soil: 1472, fresh: 1344 },
  { day: "Sat", soil: 960, fresh: 880 },
  { day: "Sun", soil: 800, fresh: 736 },
];

export const alerts = [
  { text: "Ocean Resort has unusually high pending laundry", tone: "warn" as const },
  { text: "3 customers have not submitted today's activity", tone: "sky" as const },
  { text: "8 invoices are pending", tone: "danger" as const },
  { text: "2 customer records require attention", tone: "neutral" as const },
];

export const activity = [
  { initial: "A", tone: "brand" as const, text: "Employee Arun recorded 25 towels for Hotel Grand A", time: "09:42 AM" },
  { initial: "R", tone: "sky" as const, text: "Admin updated pricing for Ocean Resort", time: "09:15 AM" },
  { initial: "I", tone: "neutral" as const, text: "Invoice generated for Green Park Hotel", time: "08:58 AM" },
  { initial: "S", tone: "warn" as const, text: "Customer Sunrise Resort viewed monthly report", time: "08:30 AM" },
];

export const invoices = [
  { no: "INV-2026-001", customer: "Hotel Grand A", month: "August 2026", amount: "₹84,500", date: "31 Aug 2026", status: "Generated" },
  { no: "INV-2026-002", customer: "Ocean Resort", month: "August 2026", amount: "₹72,300", date: "31 Aug 2026", status: "Pending" },
  { no: "INV-2026-003", customer: "Hotel Royal B", month: "August 2026", amount: "₹58,200", date: "31 Aug 2026", status: "Paid" },
  { no: "INV-2026-004", customer: "Green Park Hotel", month: "August 2026", amount: "₹41,900", date: "31 Aug 2026", status: "Generated" },
  { no: "INV-2026-005", customer: "Sunrise Resort", month: "July 2026", amount: "₹36,400", date: "31 Jul 2026", status: "Pending" },
];

export const invoiceLines = [
  { material: "Bedsheet", qty: 1240, rate: 100, amount: 124000 },
  { material: "Bath Towel", qty: 850, rate: 80, amount: 68000 },
  { material: "Pillow Cover", qty: 600, rate: 40, amount: 24000 },
];

export const employees = [
  { name: "Arun", role: "Laundry Staff", phone: "9876543210", entries: 12, status: "Active" },
  { name: "Kumar", role: "Laundry Staff", phone: "9876543211", entries: 9, status: "Active" },
  { name: "Divya", role: "Supervisor", phone: "9876543212", entries: 6, status: "Active" },
  { name: "Prakash", role: "Delivery", phone: "9876543213", entries: 4, status: "Inactive" },
];

export const monthlyVolume = [
  { month: "Apr", items: 24800 },
  { month: "May", items: 27400 },
  { month: "Jun", items: 26100 },
  { month: "Jul", items: 29800 },
  { month: "Aug", items: 31250 },
  { month: "Sep", items: 12400 },
];

export const rupee = (n: number) => "₹" + n.toLocaleString("en-IN");
