
import { useState } from "react";
import {
    LayoutDashboard,
    Link as LinkIcon,
    ChartNoAxesCombined,
    Settings,
    Search,
    Bell,
    Plus,
    MoreVertical,
    Menu,
    X,
} from "lucide-react";

const navLinks = [
    { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { name: "My Links", icon: LinkIcon, path: "/dashboard/links" },
    { name: "Analytics", icon: ChartNoAxesCombined, path: "/dashboard/analytics" },
    // { name: "Settings", icon: Settings, path: "/dashboard/settings" },
];

export default function Navbar({
    activePage = "Overview",
    onCreateLink = () => { },
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed left-4 top-4 z-[70] rounded-lg bg-[#AE2900] p-2 text-white lg:hidden"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-40 bg-black/30 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col justify-between border-r border-[#E5DCCE] bg-[#F3EBDD] px-4 py-6 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
            >
                <div>
                    {/* Logo */}
                    <div className="flex h-12 items-center gap-3 px-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#AE2900] text-lg font-bold text-white">
                            S
                        </div>

                        <span className="text-xl font-bold tracking-tight text-[#251914]">
                            SnipURL
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="mt-8 flex flex-col gap-2">
                        {navLinks.map(({ name, icon: Icon, path }) => {
                            const active = activePage === name;

                            return (
                                <a
                                    key={name}
                                    href={path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 rounded-full px-4 py-3 text-sm transition-all duration-200
                    ${active
                                            ? "bg-[#AE2900] font-bold text-white shadow-lg shadow-[#AE2900]/20"
                                            : "font-medium text-[#5B403A] hover:bg-[#FCE3DA]"
                                        }`}
                                >
                                    <Icon size={19} />
                                    {name}
                                </a>
                            );
                        })}
                    </nav>
                </div>

                {/* User Profile */}
                <div className="border-t border-[#E5DCCE] pt-4">
                    <div className="flex items-center gap-3 rounded-xl border border-[#E5DCCE] bg-[#FFF8F6] p-2">
                        <img
                            src="https://i.pravatar.cc/100?img=12"
                            alt="Profile"
                            className="h-9 w-9 rounded-full object-cover"
                        />

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-[#251914]">
                                Alex Rivera
                            </p>
                            <p className="truncate text-xs text-[#685A46]">
                                alex@snipurl.io
                            </p>
                        </div>

                        <button className="text-[#685A46] hover:text-[#AE2900]">
                            <MoreVertical size={19} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Top Navbar */}
            <header className="fixed left-0 right-0 top-0 z-30 flex h-[74px] items-center justify-between border-b border-[#E5DCCE] bg-[#F3EBDD]/90 px-5 pl-16 backdrop-blur-md lg:left-[260px] lg:px-8">

                {/* Search */}
                <div className="w-full max-w-[455px]">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#685A46]"
                        />

                        <input
                            type="text"
                            placeholder="Search links, tags, domains..."
                            className="h-[39px] w-full rounded-full border border-[#E5DCCE] bg-white pl-10 pr-4 text-sm text-[#251914] outline-none placeholder:text-[#9B8B82] focus:border-[#AE2900]"
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="ml-4 flex shrink-0 items-center gap-4">

                    <button className="rounded-full p-2 text-[#5B403A] transition hover:bg-[#FCE3DA]">
                        <Bell size={19} />
                    </button>

                    <button
                        onClick={onCreateLink}
                        className="flex items-center gap-2 rounded-full bg-[#AE2900] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#AE2900]/20 transition hover:bg-[#D53D12] active:scale-95"
                    >
                        <Plus size={17} />
                        <span className="hidden sm:block">Create Link</span>
                    </button>

                    <div className="hidden h-7 w-px bg-[#E5DCCE] sm:block" />

                    <img
                        src="https://i.pravatar.cc/100?img=12"
                        alt="User"
                        className="hidden h-9 w-9 rounded-full object-cover sm:block"
                    />
                </div>
            </header>
        </>
    );
}
