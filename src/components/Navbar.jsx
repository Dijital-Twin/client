export default function Navbar() {
    return (
        <div className={"flex flex-row justify-between border-b border-opacity-30 border-white px-40 py-4"}>
            <div className={"text-white text-lg"}>
                <h1>
                    DIGITAL TWIN
                </h1>
            </div>
            <div className={"flex flex-row items-center uppercase space-x-14 text-white-900"}>
                <a className={"text-sm"}>
                    About us
                </a>
                <a className={"text-sm"}>
                    Characters
                </a>
                <a className={"text-sm"}>
                    Contact
                </a>
                <a className={"text-sm"}
                   href={"/login"}
                >
                    Log in
                </a>
            </div>
        </div>
    )
}