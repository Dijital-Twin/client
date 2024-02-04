import Instagram from '../assets/icons/instagram.svg'
import Twitter from '../assets/icons/twitter.svg'

export default function Footer() {
    return (
        <div className={"flex flex-row justify-between px-40 mt-20 py-10"}>
            <div className={"flex flex-col text-white-900 space-y-4"}>
                <span>
                    Digital Twin
                </span>
                <span>
                    Create and talk with personalized AIs.
                </span>
                <span>
                    © Digital Twin 2023
                </span>
                <div className={"flex flex-row space-x-3"}>
                    <Instagram />
                    <Twitter />
                </div>
            </div>
            <div className={"flex flex-row space-x-20"}>
                <div className={"flex flex-col space-y-4 text-white-900"}>
                    <span>
                        Company
                    </span>
                    <span>
                        How it Works
                    </span>
                    <span>
                        Service
                    </span>
                    <span>
                        Blog
                    </span>
                    <span>
                        About Us
                    </span>
                </div>
                <div className={"flex flex-col space-y-4 text-white-900"}>
                     <span>
                        Help Center
                    </span>
                    <span>
                        FAQ
                    </span>
                    <span>
                        Online Chat
                    </span>
                    <span>
                        Newsletter
                    </span>
                </div>
            </div>
        </div>
    )
}