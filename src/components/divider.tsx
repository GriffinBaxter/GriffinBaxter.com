export const rawHtmlDivider = `
  <div class="relative flex w-full items-center py-5 py-8">
    <div class="grow border-t border-gray-400"></div>
    <span class="mx-4 shrink select-none text-gray-400">//</span>
    <div class="grow border-t border-gray-400"></div>
  </div>
`;

export default function Divider() {
  return (
    <div className="relative flex w-full items-center py-5 py-8">
      <div className="grow border-t border-gray-400"></div>
      <span className="mx-4 shrink text-gray-400 select-none">{"//"}</span>
      <div className="grow border-t border-gray-400"></div>
    </div>
  );
}
