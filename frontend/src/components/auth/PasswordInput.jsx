
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({
  label,
  value,
  onChange,
  autoComplete = "current-password",
  ...props
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#5b403a]">
        {label}
      </span>

      <span className="relative block">
        <LockKeyhole
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9c7e75]"
          size={18}
        />

        <input
          {...props}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          className="h-12 w-full rounded-xl border border-[#e4cfc6] bg-[#fff8f6] pl-11 pr-12 text-[#251914] outline-none transition placeholder:text-[#ab8d84] focus:border-[#ae2900] focus:bg-white focus:ring-4 focus:ring-[#ae2900]/10"
        />

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-[#806860] hover:bg-[#fff1ec]"
        >
          {visible ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </span>
    </label>
  );
}
