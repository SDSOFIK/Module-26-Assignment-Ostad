const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">NewsPortal</h2>
          <p className="text-sm">আপনার বিশ্বস্ত সংবাদ মাধ্যম। সঠিক তথ্য, সঠিক সময়ে।</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/news" className="hover:text-white">News</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Contact</h3>
          <p className="text-sm">Email: support@newsportal.com</p>
          <p className="text-sm">Phone: +880 1XXX-XXXXXX</p>
        </div>
      </div>
      <div className="text-center text-sm py-4 border-t border-gray-700">
        © {new Date().getFullYear()} NewsPortal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;