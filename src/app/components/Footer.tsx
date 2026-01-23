import { Copyright } from "./Copyright";

export function Footer() {
  return (
    <footer className="hidden md:block mt-auto border-t border-primary/10 py-6">
      <div className="mx-auto max-w-6xl px-6">
        <Copyright />
      </div>
    </footer>
  );
}
