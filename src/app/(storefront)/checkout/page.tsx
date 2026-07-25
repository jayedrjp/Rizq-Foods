"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { createOrder, NewStoreOrder } from "@/lib/orders";
import { firestoreOrderErrorMessage } from "@/lib/firebaseErrors";

type PaymentMethod = "cod" | "bkash" | "nagad" | "card";

const paymentOptions: { value: PaymentMethod; label: string; hint: string }[] = [
  { value: "cod", label: "Cash on Delivery", hint: "Pay with cash when your order arrives" },
  { value: "bkash", label: "bKash", hint: "Send payment to our bKash merchant number" },
  { value: "nagad", label: "Nagad", hint: "Send payment to our Nagad merchant number" },
  { value: "card", label: "Card", hint: "Visa, Mastercard or other debit/credit card" },
];

interface PlacedOrder extends NewStoreOrder { id: string }

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login?redirect=/checkout");
  }, [loading, router, user]);

  const delivery = subtotal > 0 ? 80 : 0;
  const total = subtotal + delivery;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [notes, setNotes] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [paymentContact, setPaymentContact] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (loading || !user) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isSubmitting || lines.length === 0) return;
    setIsSubmitting(true);
    setSubmitError("");

    const orderData: NewStoreOrder = {
      customerName: fullName,
      customerPhone: phone,
      address,
      area,
      notes,
      paymentMethod,
      paymentContact:
        paymentMethod === "bkash" || paymentMethod === "nagad" ? paymentContact : undefined,
      items: lines.map((line) => ({
        name: line.product.name,
        weight: line.product.weight,
        image: line.product.image,
        quantity: line.quantity,
        price: line.product.price,
      })),
      subtotal,
      delivery,
      total,
    };

    try {
      const id = await createOrder(orderData);
      setOrder({ id, ...orderData });
      clearCart();
    } catch (error) {
      console.error("Unable to create order", error);
      setSubmitError(firestoreOrderErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  // ---- Order just placed: show confirmation ----
  if (order) {
    const paymentLabel = paymentOptions.find((p) => p.value === order.paymentMethod)?.label;

    return (
      <div className="container-rizq flex justify-center py-12 md:py-20">
        <div className="w-full max-w-lg">
          <div className="flex flex-col items-center gap-4 rounded-xl2 border border-ink/8 bg-white p-6 text-center shadow-softer md:p-8">
            <span className="rizq-drop-lg animate-drip" aria-hidden="true" />
            <p className="eyebrow flex items-center gap-2">Order confirmed</p>
            <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">
              Thank you{order.customerName ? `, ${order.customerName.split(" ")[0]}` : ""}!
            </h1>
            <p className="text-sm text-stone-dark">
              Your order <span className="font-semibold text-ink">{order.id}</span> has been placed.
            </p>

            <div className="mt-2 w-full rounded-xl2 border border-ink/8 bg-cream p-5 text-left">
              <ul className="flex flex-col gap-3 border-b border-ink/8 pb-4">
                {order.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-stone">
                      <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                      <p className="text-xs text-stone-dark">
                        {item.weight} × {item.quantity}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-ink">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-1.5 border-b border-ink/8 py-4 text-sm text-ink/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{formatPrice(order.delivery)}</span>
                </div>
                <div className="flex justify-between font-display text-base font-semibold text-ink">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 pt-4 text-sm text-ink/80">
                <p>
                  <strong className="text-ink">Deliver to:</strong> {order.address}, {order.area}
                </p>
                <p>
                  <strong className="text-ink">Phone:</strong> {order.customerPhone}
                </p>
                {order.notes && (
                  <p>
                    <strong className="text-ink">Notes:</strong> {order.notes}
                  </p>
                )}
                <p>
                  <strong className="text-ink">Payment:</strong> {paymentLabel}
                  {order.paymentContact ? ` (${order.paymentContact})` : ""}
                </p>
              </div>
            </div>

            <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
              <Link href="/products" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/track-order" className="flex-1">
                <Button variant="primary" size="lg" className="w-full">
                  Track Your Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- Nothing to check out ----
  if (lines.length === 0) {
    return (
      <div className="container-rizq flex flex-col items-center gap-4 py-24 text-center">
        <span className="rizq-drop-lg" aria-hidden="true" />
        <p className="text-sm text-stone-dark">Your cart is empty — add something before checking out.</p>
        <Link href="/products">
          <Button variant="primary">Browse Products</Button>
        </Link>
      </div>
    );
  }

  // ---- Checkout form ----
  return (
    <div className="container-rizq py-8 md:py-12">
      <h1 className="mb-8 font-display text-3xl font-semibold text-ink md:text-4xl">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          {/* Delivery details */}
          <div className="rounded-xl2 border border-ink/8 bg-white p-6 shadow-softer">
            <h2 className="mb-4 font-display text-lg font-semibold text-ink">Delivery Details</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm text-ink">
                Full Name
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm text-ink">
                Phone Number
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                  placeholder="+880 1XXX-XXXXXX"
                  autoComplete="tel"
                />
              </label>
            </div>

            <label className="mt-4 flex flex-col gap-1.5 text-sm text-ink">
              Delivery Address
              <input
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                placeholder="House, Road, Block"
                autoComplete="street-address"
              />
            </label>

            <label className="mt-4 flex flex-col gap-1.5 text-sm text-ink">
              Area / City
              <input
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                placeholder="Gulshan, Dhaka"
                autoComplete="address-level2"
              />
            </label>

            <label className="mt-4 flex flex-col gap-1.5 text-sm text-ink">
              Delivery Notes (optional)
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="focus-ring resize-none rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                placeholder="Landmark, delivery instructions, etc."
              />
            </label>
          </div>

          {/* Payment method */}
          <div className="rounded-xl2 border border-ink/8 bg-white p-6 shadow-softer">
            <h2 className="mb-4 font-display text-lg font-semibold text-ink">Payment Method</h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {paymentOptions.map((option) => (
                <label
                  key={option.value}
                  className={`focus-ring flex cursor-pointer flex-col gap-1 rounded-xl2 border p-4 transition-colors ${
                    paymentMethod === option.value
                      ? "border-saffron bg-saffron-light"
                      : "border-ink/12 hover:border-saffron/40"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.value}
                      checked={paymentMethod === option.value}
                      onChange={() => setPaymentMethod(option.value)}
                      className="h-4 w-4 accent-saffron"
                    />
                    <span className="text-sm font-semibold text-ink">{option.label}</span>
                  </span>
                  <span className="text-xs text-stone-dark">{option.hint}</span>
                </label>
              ))}
            </div>

            {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
              <label className="mt-4 flex flex-col gap-1.5 text-sm text-ink">
                {paymentMethod === "bkash" ? "bKash" : "Nagad"} Number
                <input
                  required
                  value={paymentContact}
                  onChange={(e) => setPaymentContact(e.target.value)}
                  className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                  placeholder="01XXXXXXXXX"
                />
                <span className="text-xs font-normal text-stone-dark">
                  You&apos;ll receive a payment request on this number after placing the order.
                </span>
              </label>
            )}

            {paymentMethod === "card" && (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm text-ink sm:col-span-2">
                  Card Number
                  <input
                    required
                    inputMode="numeric"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                    placeholder="1234 5678 9012 3456"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  Expiry
                  <input
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                    placeholder="MM/YY"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm text-ink">
                  CVC
                  <input
                    required
                    inputMode="numeric"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="focus-ring rounded-lg border border-ink/12 px-3.5 py-2.5 text-sm"
                    placeholder="123"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Order summary */}
        <div className="h-fit rounded-xl2 border border-ink/8 bg-white p-6 shadow-softer">
          <h2 className="mb-4 font-display text-lg font-semibold text-ink">Order Summary</h2>

          <ul className="flex flex-col gap-3 border-b border-ink/8 pb-4">
            {lines.map((line) => (
              <li key={line.product.id} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-stone">
                  <Image
                    src={line.product.image}
                    alt={line.product.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{line.product.name}</p>
                  <p className="text-xs text-stone-dark">
                    {line.product.weight} × {line.quantity}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-ink">
                  {formatPrice(line.product.price * line.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 border-b border-ink/8 py-4 text-sm text-ink/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{formatPrice(delivery)}</span>
            </div>
          </div>

          <div className="flex justify-between py-4 font-display text-base font-semibold text-ink">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          {submitError && <p className="mb-3 text-sm text-red-600">{submitError}</p>}
          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </Button>
          <Link
            href="/cart"
            className="focus-ring mt-3 block text-center text-sm text-saffron-deep hover:underline"
          >
            Back to cart
          </Link>
        </div>
      </form>
    </div>
  );
}
