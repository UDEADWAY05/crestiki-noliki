import { NavBar } from "@/widgets/navBar";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <NavBar />

            <section>
                {children}
            </section>
        </div>
    );
}