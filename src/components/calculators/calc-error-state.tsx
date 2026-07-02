/**
 * Fallback shown when a calculator receives invalid input (negative/zero where a
 * positive value is required). In normal use the input fields clamp to safe
 * minimums, so this is a defensive guard rather than a common state.
 */
export function CalcErrorState({
  message,
  onReset,
}: {
  message: string;
  onReset?: () => void;
}) {
  return (
    <div
      role="alert"
      className="rounded-[20px] border border-[#E7EBF3] bg-white p-8 text-center shadow-[0_1px_2px_rgba(16,24,40,.04)]"
    >
      <p className="text-[16px] font-semibold text-[#0E1525]">
        Check your inputs
      </p>
      <p className="mt-2 text-[15px] leading-[1.6] text-[#6B7488]">{message}</p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 text-[14px] font-semibold text-brand transition-opacity hover:opacity-80"
        >
          Reset to defaults
        </button>
      )}
    </div>
  );
}
