import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { OrderStatus } from "@/types/admin";

export interface OrderItem {
  name: string;
  weight: string;
  image: string;
  quantity: number;
  price: number;
}

export interface StoreOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  area: string;
  notes: string;
  paymentMethod: string;
  paymentContact?: string;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
  status: OrderStatus;
  createdAt?: Timestamp;
}

export type NewStoreOrder = Omit<StoreOrder, "id" | "status" | "createdAt">;
const ordersCollection = collection(db, "orders");

export async function createOrder(order: NewStoreOrder) {
  const { paymentContact, ...orderWithoutOptionalContact } = order;
  const reference = await addDoc(ordersCollection, {
    ...orderWithoutOptionalContact,
    ...(paymentContact ? { paymentContact } : {}),
    status: "Pending" satisfies OrderStatus,
    createdAt: serverTimestamp(),
  });
  return reference.id;
}

export function subscribeToOrders(callback: (orders: StoreOrder[]) => void, onError: (error: Error) => void) {
  return onSnapshot(query(ordersCollection, orderBy("createdAt", "desc")), (snapshot) => {
    callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as StoreOrder)));
  }, onError);
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  return updateDoc(doc(db, "orders", id), { status });
}

export function removeOrder(id: string) {
  return deleteDoc(doc(db, "orders", id));
}
