export default function BasicTextInput(props) {
    const { label, value, onChange, placeholder, must, password } = props

    return (
        <div className={'flex flex-col space-y-1 items-start w-full'}>
            <label className={"text-sm"}>
                <span className={"text-white"}>
                    {label}
                </span>
                {
                    must &&
                    <span className={"text-[#D14C6C]"}>
                        *
                    </span>
                }
            </label>
            <input type={password ? 'password' : "text"}
                   placeholder={placeholder}
                   value={value}
                   onChange={onChange}
                   className={"w-full bg-yellow-111 border border-yellow-222 placeholder:text-[#37393E] px-4 py-2 rounded-lg focus:outline-none"}
            />
        </div>
    )
}