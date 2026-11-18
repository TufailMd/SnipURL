
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import {
    ArrowRight,
    Check,
    CheckCircle2,
    Eye,
    EyeOff,
    Link2,
    Loader2,
    LockKeyhole,
    Mail,
    UserRound,
    XCircle,
} from "lucide-react";

import { registerUser } from "../api/user.api.js";

const RegisterForm = ({ onSuccess, setLogin }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccessMessage("");

        // Password validation
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const data = await registerUser(username, email, password);

            // Validate API response
            if (!data?.success) {
                throw new Error(data?.message || "Registration failed.");
            }

            // Show success message
            setSuccessMessage(
                data.message || "Account created successfully!"
            );

            // Notify parent component
            onSuccess?.(data);

            // Clear form
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            await navigate({
                to: "/dashboard",
            });

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
                        Get started
                    </p>

                    <h1 className="text-4xl font-bold leading-tight">
                        Make every link count.
                    </h1>

                    <p className="mt-5 text-base leading-7 text-indigo-100">
                        Create your free account to turn long, unwieldy URLs into simple links worth sharing.
                    </p>
                </div>

                <ul className="relative space-y-3 text-sm text-indigo-100">
                    <li className="flex items-center gap-3">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15">
                            <Check className="h-3.5 w-3.5" />
                        </span>
                        Shorten links in seconds
                    </li>

                    <li className="flex items-center gap-3">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15">
                            <Check className="h-3.5 w-3.5" />
                        </span>
                        Keep your links organized
                    </li>
                </ul>
            </div>

            {/* Right Side - Register Form */}
            <div className="p-7 sm:p-10 lg:p-12">

                {/* Mobile Branding */}
                <div className="mb-8 lg:hidden">
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
                        Create an account
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Start shortening and sharing links for free.
                    </p>
                </div>

                {/* Register Form */}
                <form
                    className="mt-7 space-y-4"
                    onSubmit={handleSubmit}
                >

                    {/* Username */}
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">
                            Username
                        </span>

                        <span className="relative block">
                            <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                            <input
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                type="text"
                                autoComplete="username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder="Choose a username"
                                required
                            />
                        </span>
                    </label>

                    {/* Email */}
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">
                            Email address
                        </span>

                        <span className="relative block">
                            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                            <input
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
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
                        <span className="mb-2 block text-sm font-semibold text-slate-700">
                            Password
                        </span>

                        <span className="relative block">
                            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                            <input
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Create a password"
                                minLength={6}
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

                    {/* Confirm Password */}
                    <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">
                            Confirm password
                        </span>

                        <span className="relative block">
                            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                            <input
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                placeholder="Repeat your password"
                                minLength={6}
                                required
                            />
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
                                Creating account...
                            </>
                        ) : (
                            <>
                                Create account
                                <ArrowRight className="h-5 w-5" />
                            </>
                        )}
                    </button>

                </form>

                {/* Login Link */}
                <p className="mt-6 text-center text-sm text-slate-500">
                    Already have an account?{" "}

                    <span
                        onClick={() => setLogin(true)}
                        className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        Sign in
                    </span>
                </p>

            </div>
        </main>
    );
};

export default RegisterForm;
