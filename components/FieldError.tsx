export function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="text-[11px] font-medium text-[#ffb4ab]">
      {message}
    </p>
  );
}
