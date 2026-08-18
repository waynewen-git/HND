import GuitarCustomizer from "@/components/tools/GuitarCustomizer";

export default function ConfigurePage() {
  return (
    <>
      <div
        aria-hidden
        className="h-[calc(100dvh-3rem)] md:h-[calc(100dvh-3.5rem)]"
      />
      <GuitarCustomizer />
    </>
  );
}
