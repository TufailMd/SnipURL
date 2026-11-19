
const labels = ["Very weak", "Weak", "Good", "Strong"];

export default function PasswordStrengthIndicator({ password }) {
  const level = Math.min(
    4,
    [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ].filter(Boolean).length
  );

  if (!password) return null;

  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((item) => (
          <span
            key={item}
            className={`h-1 flex-1 rounded-full ${item <= level
              ? level < 2
                ? "bg-[#d53d12]"
                : level < 4
                  ? "bg-[#c99531]"
                  : "bg-[#59614a]"
              : "bg-[#ead9d1]"
              }`}
          />
        ))}
      </div>

      <p className="mt-1 text-xs text-[#806860]">
        Password strength: {labels[Math.max(level - 1, 0)]}
      </p>
    </div>
  );
}
