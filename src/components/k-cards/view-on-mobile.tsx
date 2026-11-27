import QRCode from "react-qr-code";

/** Desktop-only QR in the corner of a public Card, so visitors can open it on their phone. */
export function ViewOnMobile({ url }: { url: string }) {
  return (
    <div className="fixed bottom-6 right-6 z-20 hidden flex-col items-center gap-2 rounded-[18px] bg-white p-3 text-[#151619] lg:flex">
      <QRCode value={url} size={104} bgColor="#ffffff" fgColor="#151619" level="M" />
      <span className="text-[12px] font-medium">View on mobile</span>
    </div>
  );
}
