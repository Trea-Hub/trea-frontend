import { notFound } from "next/navigation";
import { getDemoEventRecord } from "@/lib/demo-data";
import { fetchEventById } from "@/lib/events";
import { CheckoutClient } from "./checkout-client";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await fetchEventById(id);

  if (!event) {
    notFound();
  }

  const record = getDemoEventRecord(id);
  const priceAmount =
    record?.priceAmount ?? (Number.parseFloat(event.price) || 0);
  const currency: "XLM" | "USDC" | null =
    record?.currency ??
    (event.price.toUpperCase().includes("USDC")
      ? "USDC"
      : event.price === "Free"
        ? null
        : "XLM");

  return (
    <CheckoutClient
      event={{
        id: event.id,
        title: event.title,
        subtitle: event.subtitle,
        summary:
          event.id === "meridian-2025"
            ? "General Pass · 3-day access"
            : event.subtitle,
        date: event.date,
        venue: event.location,
        price: priceAmount,
        currency,
        seat:
          event.id === "meridian-2025" ? "A12 · Upper Hall" : "General Admission",
        tickets: "1x General Pass",
        image: event.coverImage,
      }}
    />
  );
}
