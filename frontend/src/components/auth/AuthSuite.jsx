import { ArrowLeft, ArrowRight, CheckCircle2, CircleHelp, Link2, LoaderCircle, Mail, ShieldAlert, UserRound } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../api/user.api";
import { login } from "../../app/slice/authSlice";
import AuthBrandPanel from "./AuthBrandPanel";
import PasswordInput from "./PasswordInput";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

const modes = [
  { id: "signin", short: "Sign In", title: "Welcome back.", sub: "Sign in to continue shaping every route." },
  { id: "signup", short: "Sign Up", title: "Create your vault.", sub: "Start giving every important link a better destination." },
  // { id: "forgot", short: "Forgot", title: "Recover access.", sub: "Recovery links are managed securely by your workspace." },
  // { id: "reset", short: "Reset", title: "Reset credentials.", sub: "Use the secure recovery link sent to your inbox." }
];
const emailIsValid = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const inputClass = "h-12 w-full rounded-xl border border-[#e4cfc6] bg-[#fff8f6] px-4 text-[#251914] outline-none transition placeholder:text-[#ab8d84] focus:border-[#ae2900] focus:bg-white focus:ring-4 focus:ring-[#ae2900]/10";

function Notice({ type = "error", children }) {
  const positive = type === "success";
  return (
    <p role={positive ? "status" : "alert"} className={`mt-5 rounded-xl px-4 py-3 text-sm ${positive ? "bg-[#edf0e6] text-[#415036]" : "bg-[#fff0ed] text-[#a22a09]"}`}>
      {children}
    </p>
  );
}

function SignInForm({ setMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    if (!emailIsValid(email))
      return setError("Enter a valid email address.");

    if (!password) return setError("Enter your password.");

    setLoading(true);
    setError("");
    try {
      const data = await loginUser(email, password);

      if (!data?.success || !data?.user)
        throw new Error(data?.message || "Unable to sign in.");

      dispatch(login(data.user));
      await navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to sign in. Check your details and try again.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <form onSubmit={submit} className="mt-7 space-y-5" noValidate>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-[#5b403a]">
          Email address
        </span>
        <span className="relative block">
          <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9c7e75]" size={18} />
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@studio.com"
            className={`${inputClass} pl-11`} required />
        </span>
      </label>
      <PasswordInput
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter your password" required
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-[#5b403a]">
          <input
            type="checkbox"
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
            className="size-4 accent-[#ae2900]"
          />
          Remember me
        </label>
        <button
          type="button"
          onClick={() => setMode("forgot")}
          className="font-semibold text-[#ae2900] hover:underline">
          Forgot password?
        </button>
      </div>

      {error && <Notice>
        {error}
      </Notice>
      }
      <Submit loading={loading} text="Sign In" loadingText="Signing in…" />

      <p className="text-center text-sm text-[#765d56]">
        New to SnipURL?
        <button type="button" onClick={() => setMode("signup")} className="font-bold text-[#ae2900] hover:underline">
          Create an account
        </button>
      </p>
    </form>
  );
}


function SignUpForm({ setMode }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (username.trim().length < 2) {
      return setError("Enter your full name.");
    }

    if (!emailIsValid(email)) {
      return setError("Enter a valid work email.");
    }

    if (password.length < 8) {
      return setError("Use at least 8 characters for your password.");
    }

    if (password !== confirm) {
      return setError("Passwords do not match.");
    }

    if (!terms) {
      return setError("Please accept the terms to continue.");
    }

    setLoading(true);
    setError("");

    try {
      const data = await registerUser(
        username.trim(),
        email,
        password
      );

      if (!data?.success || !data?.user) {
        throw new Error(
          data?.message || "Unable to create your account."
        );
      }

      dispatch(login(data.user));
      await navigate({ to: "/dashboard" });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mt-7 space-y-4"
      noValidate
    >
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-[#5b403a]">
          Full name
        </span>

        <span className="relative block">
          <UserRound
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9c7e75]"
            size={18}
          />

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="name"
            placeholder="Your name"
            className={`${inputClass} pl-11`}
            required
          />
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-[#5b403a]">
          Work email
        </span>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="you@studio.com"
          className={inputClass}
          required
        />
      </label>

      <div>
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          placeholder="Create a password"
          required
        />

        <PasswordStrengthIndicator password={password} />
      </div>

      <PasswordInput
        label="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        autoComplete="new-password"
        placeholder="Repeat your password"
        required
      />

      <label className="flex cursor-pointer items-start gap-2 text-sm leading-5 text-[#5b403a]">
        <input
          type="checkbox"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          className="mt-0.5 size-4 accent-[#ae2900]"
        />

        I agree to the Terms of Use and Privacy Policy.
      </label>

      {error && <Notice>{error}</Notice>}

      <Submit
        loading={loading}
        text="Create Account"
        loadingText="Creating your vault…"
      />

      <p className="text-center text-sm text-[#765d56]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => setMode("signin")}
          className="font-bold text-[#ae2900] hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

function UnsupportedRecovery({ reset, setMode }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const token = new URLSearchParams(
    window.location.search
  ).get("token");

  const submit = (e) => {
    e.preventDefault();

    if (!reset && !emailIsValid(email)) {
      return setError("Enter a valid email address.");
    }

    setError(
      "Password recovery has not been enabled by this SnipURL server."
    );
  };

  return (
    <form
      onSubmit={submit}
      className="mt-7 space-y-5"
    >
      {reset ? (
        <>
          <div className="rounded-xl bg-[#fff1ec] p-4 text-sm leading-6 text-[#5b403a]">
            <ShieldAlert
              className="mb-2 text-[#ae2900]"
              size={20}
            />

            {token
              ? "A recovery token is present, but this server does not provide a reset-password endpoint to verify it."
              : "Open the reset link supplied by your administrator. This server does not currently offer a token-verification endpoint."}
          </div>

          <PasswordInput
            label="New password"
            value=""
            onChange={() => { }}
            placeholder="Unavailable until recovery is enabled"
            disabled
          />

          <PasswordInput
            label="Confirm new password"
            value=""
            onChange={() => { }}
            placeholder="Unavailable until recovery is enabled"
            disabled
          />
        </>
      ) : (
        <>
          <div className="rounded-xl bg-[#fff1ec] p-4 text-sm leading-6 text-[#5b403a]">
            <CircleHelp
              className="mb-2 text-[#ae2900]"
              size={20}
            />

            Recovery links will be delivered to your registered inbox when password recovery is enabled for this server.
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#5b403a]">
              Registered account email
            </span>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.com"
              className={inputClass}
            />
          </label>
        </>
      )}

      {error && <Notice>{error}</Notice>}

      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center rounded-xl bg-[#ae2900] font-bold text-white hover:bg-[#d53d12]"
      >
        {reset ? "Update Credentials" : "Send Reset Link"}
      </button>

      <button
        type="button"
        onClick={() => setMode("signin")}
        className="flex h-11 w-full items-center justify-center gap-2 font-semibold text-[#5b403a] hover:text-[#ae2900]"
      >
        <ArrowLeft size={17} />
        Back to Sign In
      </button>
    </form>
  );
}

function Submit({ loading, text, loadingText }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ae2900] font-bold text-white shadow-lg shadow-[#ae2900]/20 transition hover:bg-[#d53d12] disabled:opacity-60"
    >
      {loading ? (
        <>
          <LoaderCircle
            className="animate-spin"
            size={18}
          />
          {loadingText}
        </>
      ) : (
        <>
          {text}
          <ArrowRight size={18} />
        </>
      )}
    </button>
  );
}

export default function AuthSuite() {
  const [mode, setMode] = useState("signin");

  const config = modes.find(
    (item) => item.id === mode
  );

  return (
    <main className="min-h-screen bg-[#fff8f6] lg:flex">
      <AuthBrandPanel />

      <section className="min-h-screen flex-1 px-4 py-5 sm:px-8 lg:flex lg:items-center lg:px-12 xl:px-20">
        <div className="mx-auto w-full max-w-xl">
          <div className="flex items-center justify-between lg:hidden">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#5b403a]"
            >
              <ArrowLeft size={16} />
              Back
            </Link>

            <Link
              to="/"
              className="flex items-center gap-2 font-bold"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-[#ae2900] text-white">
                <Link2 size={16} />
              </span>

              SnipURL
            </Link>
          </div>

          <div className="mt-10 lg:mt-0">
            <p className="text-xs font-bold uppercase tracking-[.15em] text-[#ae2900]">
              Authentication Dispatch
            </p>

            <h2 className="font-display mt-2 text-4xl font-bold tracking-[-.045em] text-[#251914]">
              {config.title}
            </h2>

            <p className="mt-2 text-[#765d56]">
              {config.sub}
            </p>
          </div>

          <nav
            className="mt-7 grid grid-cols-2 gap-1 rounded-xl bg-[#fff1ec] p-1"
            aria-label="Authentication flow"
          >
            {modes.map((item) => (
              <button
                key={item.id}
                onClick={() => setMode(item.id)}
                className={`min-h-10 rounded-lg px-1 text-xs font-bold transition sm:text-sm ${mode === item.id
                  ? "bg-white text-[#ae2900] shadow-sm"
                  : "text-[#806860] hover:text-[#5b403a]"
                  }`}
              >
                {item.short}
              </button>
            ))}
          </nav>

          <div className="relative mt-5 overflow-hidden rounded-[1.7rem] border border-[#ead9d1] bg-white p-5 shadow-[0_24px_65px_-38px_rgba(74,30,14,.45)] sm:p-8">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-[#ae2900] via-[#d53d12] to-[#59614a]" />

            <h3 className="font-display text-2xl font-bold text-[#251914]">
              {mode === "signin"
                ? "Sign in"
                : mode === "signup"
                  ? "Create account"
                  : mode === "forgot"
                    ? "Find your account"
                    : "Secure reset"}
            </h3>

            {mode === "signin" ? (
              <SignInForm setMode={setMode} />
            ) : mode === "signup" ? (
              <SignUpForm setMode={setMode} />
            ) : (
              <UnsupportedRecovery
                reset={mode === "reset"}
                setMode={setMode}
              />
            )}
          </div>

          <div className="mt-7 rounded-2xl bg-[#59614a] p-4 text-[#fff8f6] lg:hidden">
            <p className="text-xs uppercase tracking-[.14em] text-[#dfe3cf]">
              Archival Storage
            </p>

            <div className="mt-2 flex items-center justify-between">
              <span className="font-editor text-2xl italic">
                Your routes, safely held.
              </span>

              <CheckCircle2 className="text-[#d7e09f]" />
            </div>
          </div>

          <p className="mt-7 text-center text-xs text-[#91756d]">
            Secure access layer · Designed for intentional sharing
          </p>
        </div>
      </section>
    </main>
  );
}
