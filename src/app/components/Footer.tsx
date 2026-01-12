export function Footer() {
  return (
    <footer className="mt-auto border-t border-primary/10 py-6">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm text-primary/70">
          &copy; 2026{" "}
          <a
            href="https://radiylon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary/60"
          >
            radiylon.com
          </a>
        </p>
      </div>
    </footer>
  );
}
