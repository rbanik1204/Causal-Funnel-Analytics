import { NavLink } from "react-router";
const links = [
    { to: "/", label: "Home" },
    { to: "/sessions", label: "Sessions" },
    { to: "/heatmap", label: "Heatmap" },
];
export function Navbar(){
    return (
        <nav className="absolute left-0 top-0 w-40 h-screen py-20 flex flex-col items-center justify-start gap-5 bg-white font-bold font-sans text-[18px]">
            {links.map(({ to, label }) => (
                <NavLink key={to} to={to} className="group">
                    {({ isActive }) => (
                        <div
                            className={`w-32 h-10 m-1 flex items-center justify-center rounded-md transition-colors
                                ${isActive
                                    ? "bg-pink-700 text-white"
                                    : "text-green-900 group-hover:bg-sky-400 group-hover:text-white"}`}
                        >
                            {label}
                        </div>
                    )}
                </NavLink>
            ))}
        </nav>
    );
}