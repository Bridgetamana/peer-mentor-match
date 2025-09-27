import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#00a63e]/70 border-t-2 mt-14">
      <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center p-10 max-w-[90%] mx-auto">
        {/* <div>
                    <Image alt="" src={}/>
                </div> */}
        <h3 className="text-accent text-3xl font-bold">PeerMatch</h3>
        <ul className="flex flex-col md:flex-row gap-5 text-center my-6">
          <li>
            <Link href="" className="sm:text-lg font-semibold">
              Problem
            </Link>
          </li>
          <li>
            <Link href="" className="sm:text-lg font-semibold">
              Benefits
            </Link>
          </li>
          <li>
            <Link href="" className="sm:text-lg font-semibold">
              Testimonial
            </Link>
          </li>
        </ul>
        <p>© 2025 PeerMatch. All rights reserved.</p>
      </div>
    </footer>
  );
}
