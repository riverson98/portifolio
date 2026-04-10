export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-slate-600 text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="gradient-text font-semibold">Riverson Vicente</span>
        </p>
        <p className="text-slate-700 text-xs">
          Software Developer · Itajaí, Brasil
        </p>
      </div>
    </footer>
  );
}
