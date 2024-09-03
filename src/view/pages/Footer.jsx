import { Link } from 'react-router-dom';
import ictLogo from "../../assets/ict_logo.png";
import banglaLogo from "../../assets/bangla.png";

function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 mt-[94px]">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={banglaLogo} className="h-8" alt="Bangla Logo" />
            <img src={ictLogo} className="h-8" alt="ICT Logo" />
          </Link>

          <span className="block text-sm text-gray-500 sm:text-center">
            <Link to="/" className="hover:underline">© ২০২৪ সর্বস্বত্ব সংরক্ষিত </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
