import { useState } from "react";

import {
    ArrowRight,
    Eye,
    EyeOff,
    Link2,
    Loader2,
    LockKeyhole,
    Mail,
    CheckCircle2,
    XCircle,
} from "lucide-react";

import { loginUser } from "../api/user.api.js";
import { useDispatch } from "react-redux";
import { login } from "../app/slice/authSlice.js";
import { useNavigate } from "@tanstack/react-router";

const LoginForm = ({ onSuccess, setLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccessMessage("");
        setLoading(true);

        try {
            const data = await loginUser(email, password);

            if (!data?.success || !data?.user) {
                throw new Error(data?.message || "Login failed.");
            }

            // Update Redux
            dispatch(login(data.user));

            // Show success message
            setSuccessMessage(
                data.message || "Login successful!"
            );

            // Notify parent
            onSuccess?.(data);

            // Clear inputs
            setEmail("");
            setPassword("");

            // Navigate using TanStack Router
            await navigate({
                to: "/dashboard",
            });

        } catch (err) {
            setSuccessMessage("");

            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to sign in. Check your details and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/30 lg:grid-cols-[1.1fr_0.9fr]">

            {/* Left Side - Branding */}
            <div className="relative hidden overflow-hidden bg-indigo-600 p-12 text-white lg:flex lg:flex-col">

                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-400/40 blur-2xl" />

                <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-2xl" />

                <div className="relative flex items-center gap-3 text-xl font-bold tracking-tight">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
                        <Link2 className="h-5 w-5" />
                    </span>
                    SnipURL
                </div>

                <div className="relative my-auto max-w-sm">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">
                        Welcome back
                    </p>

                    <h1 className="text-4xl font-bold leading-tight">
                        Your links, always within reach.
                    </h1>

                    <p className="mt-5 text-base leading-7 text-indigo-100">
                        Sign in to create, organize, and share short links that work beautifully everywhere.
                    </p>
                </div>

                <p className="relative text-sm text-indigo-200">
                    Simple links. Bigger reach.
                </p>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-7 sm:p-10 lg:p-12">

                {/* Mobile Branding */}
                <div className="mb-10 lg:hidden">
                    <div className="flex items-center gap-3 text-xl font-bold tracking-tight text-slate-900">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white">
                            <Link2 className="h-5 w-5" />
                        </span>
                        SnipURL
                    </div>
                </div>

                {/* Heading */}
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        Sign in
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Enter your details to continue to your account.
                    </p>
                </div>

                {/* Login Form */}
                <form
                    className="mt-8 space-y-5"
                    onSubmit={handleSubmit}
                >

                    {/* Email */}
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">
                            Email address
                        </span>

                        <span className="relative block">
                            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                            <input
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="you@example.com"
                                required
                            />
                        </span>
                    </label>

                    {/* Password */}
                    <label className="block">
                        <span className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
                            Password

                            <a
                                className="font-medium text-indigo-600 hover:text-indigo-700"
                                href="#forgot-password"
                            >
                                Forgot password?
                            </a>
                        </span>

                        <span className="relative block">
                            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                            <input
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Enter your password"
                                required
                            />

                            <button
                                className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                                type="button"
                                onClick={() => setShowPassword((visible) => !visible)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </span>
                    </label>

                    {/* Success Alert */}
                    {successMessage && (
                        <div
                            className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                            role="status"
                        >
                            <CheckCircle2 className="h-5 w-5 shrink-0" />

                            <span className="font-medium">
                                {successMessage}
                            </span>
                        </div>
                    )}

                    {/* Error Alert */}
                    {error && (
                        <div
                            className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                            role="alert"
                        >
                            <XCircle className="h-5 w-5 shrink-0" />

                            <span className="font-medium">
                                {error}
                            </span>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-indigo-400"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign in
                                <ArrowRight className="h-5 w-5" />
                            </>
                        )}
                    </button>

                </form>

                {/* Register Link */}
                <p className="mt-8 text-center text-sm text-slate-500">
                    New to SnipURL?{" "}

                    <span
                        onClick={() => setLogin(false)}
                        className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        Create an account
                    </span>
                </p>

            </div>
        </main>
    );
};

export default LoginForm;
