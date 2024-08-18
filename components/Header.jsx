import Image from "next/image";
import Link from "next/link";

import { LuChevronDown, LuRedo, LuUndo } from "react-icons/lu";
import { PiResizeFill } from "react-icons/pi";

const Header = () => {
  return (
    <nav className="shadow-md">
      {/* Primary Header */}
      <div className="bg-white">
        <div className="mx-auto flex max-w-7xl justify-between items-center px-6 py-4 lg:px-8">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={125}
              height={57}
              priority
            />
          </Link>
          <p>Menu</p>
        </div>
      </div>
      {/* Bottom Nav */}
      <div className="bg-gray-50">
        <div className="mx-auto flex max-w-7xl justify-between items-center px-6 py-3 lg:px-8">
          <div className="w-3/12 flex gap-2">
            <button className="button hover:bg-white flex gap-1 items-center"><PiResizeFill/> Resize</button>
            <button className="icon_button hover:bg-white">
              <LuUndo />
            </button>
            <button className="icon_button hover:bg-white">
              <LuRedo />
            </button>
          </div>
          <div className="bg-red-200 w-6/12">
          {/* Middel */}
          </div>
          <div className="w-3/12 flex justify-end">
          <button className="button bg_theme_pink text-white flex items-center gap-1">Download <LuChevronDown/></button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
