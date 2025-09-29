import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/peermatch-logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#45cf78]/70 border-t-2 mt-14">
      <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center p-10 max-w-[90%] mx-auto">
        <Link href="/" className="w-44">
          <Image alt="" src={Logo} />
        </Link>
        {/*         <Image src={Logo} alt="PeerMatch" width={150} height={50} /> */}
        <ul className="flex flex-col md:flex-row gap-5 text-center my-6">
          <li>
            <Link
              href="#problem"
              className="sm:text-lg font-semibold hover:text-muted"
            >
              Problem
            </Link>
          </li>
          <li>
            <Link
              href="#benefit"
              className="sm:text-lg font-semibold hover:text-muted"
            >
              Benefits
            </Link>
          </li>
          <li>
            <Link
              href="#testimonial"
              className="sm:text-lg font-semibold hover:text-muted"
            >
              Testimonial
            </Link>
          </li>
        </ul>
        <p className="text-center">© 2025 PeerMatch. All rights reserved.</p>
      </div>
    </footer>
  );
}
