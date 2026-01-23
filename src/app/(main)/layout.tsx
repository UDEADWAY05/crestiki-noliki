import { NavBar } from "@/widgets/navBar";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col grow">
            <NavBar />

            <section>
                {children}
            </section>
        </div>
    );
}