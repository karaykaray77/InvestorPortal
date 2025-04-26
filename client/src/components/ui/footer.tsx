import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IR</span>
                </div>
                <span className="ml-2 text-lg font-semibold text-primary">IR Connect</span>
              </a>
            </Link>
            <p className="text-sm text-neutral-500 ml-4">© {new Date().getFullYear()} IR Connect. All rights reserved.</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy">
              <a className="text-sm text-neutral-600 hover:text-primary">Privacy Policy</a>
            </Link>
            <Link href="/terms">
              <a className="text-sm text-neutral-600 hover:text-primary">Terms of Service</a>
            </Link>
            <Link href="/contact">
              <a className="text-sm text-neutral-600 hover:text-primary">Contact Us</a>
            </Link>
            <Link href="/help">
              <a className="text-sm text-neutral-600 hover:text-primary">Help Center</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
