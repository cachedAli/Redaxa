import clsx from "clsx";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full px-6 py-10 bg-blue-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Logo + Tagline */}
        <div
          className={clsx(
            "flex flex-col items-start gap-4",
            "max-sm:items-center max-sm:text-center"
          )}
        >
          <Image
            src="/redaxaLogo.png"
            width={120}
            height={120}
            alt="Redaxa Logo"
            className="object-contain"
          />
          <p className="text-sm max-w-xs">
            Helping you share your resume without sharing too much.
          </p>
        </div>

        {/* Company & Connect */}
        <div className="w-full flex  justify-around">
          <Company />
          <Connect />
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-12 text-center text-sm border-t border-blue-900 pt-10">
        © {new Date().getFullYear()} Redaxa. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

const Company = () => {
  return (
    <nav aria-label="Company" className="flex flex-col gap-4">
      <h3 className="font-semibold text-blue-900 text-lg">Company</h3>
      <ul className=" space-y-2">
        <li>
          <a
            href="https://mohammad-ali-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-500 transition-colors"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="mailto:official.cachedali@gmail.com?subject=Inquiry%20from%20Redaxa%20Website"
            className="hover:text-teal-500 transition-colors"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

const Connect = () => {
  return (
    <nav aria-label="Connect" className="flex flex-col gap-4">
      <h3 className="font-semibold text-blue-900 text-lg">Connect</h3>
      <ul className="space-y-2">
        <li>
          <a
            href="https://github.com/cachedali"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-500 transition-colors"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/cachedali/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-500 transition-colors"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://x.com/cachedali"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-500 transition-colors"
          >
            Twitter
          </a>
        </li>
      </ul>
    </nav>
  );
};
