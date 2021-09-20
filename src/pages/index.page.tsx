import { Counter } from "@/components/Counter";

export default function Page() {
    return (
        <>
            <h1>Welcome</h1>
            This page is:
            <ul>
                <li>Rendered to HTML.</li>
                <li>
                    Interactive. <Counter />
                </li>
            </ul>
        </>
    );
}
