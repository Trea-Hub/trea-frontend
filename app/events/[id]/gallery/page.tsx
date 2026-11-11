import { notFound } from "next/navigation";
import { getDemoGalleryPhotos } from "@/lib/demo-data";
import { fetchEventById } from "@/lib/events";
import { GalleryClient } from "./gallery-client";

export default async function EventGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await fetchEventById(id);

  if (!event) {
    notFound();
  }

  const photos = getDemoGalleryPhotos(id);

  return (
    <GalleryClient
      eventId={event.id}
      eventTitle={event.title}
      galleryCount={event.galleryCount || photos.length}
      photos={photos}
    />
  );
}
