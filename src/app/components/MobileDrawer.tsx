"use client";

import { useEffect, useRef, ReactNode, useCallback } from "react";
import { CloseIcon } from "./icons/CloseIcon";
import { Copyright } from "./Copyright";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function MobileDrawer({ isOpen, onClose, children }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    onClose();
    previousFocusRef.current?.focus();
  }, [onClose]);

  // Store previously focused element on open
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    const drawer = drawerRef.current;
    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // Focus the close button initially
    const firstFocusable = drawer.querySelector(focusableSelector) as HTMLElement;
    firstFocusable?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusableEls = drawer.querySelectorAll(focusableSelector);
      const firstEl = focusableEls[0] as HTMLElement;
      const lastEl = focusableEls[focusableEls.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl?.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl?.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        id="mobile-filter-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filters and search"
        className={`fixed top-0 right-0 z-[70] h-full w-[85vw] max-w-sm bg-white shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          overflow-y-auto p-6 flex flex-col`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-primary">Filters</h2>
          <button
            onClick={handleClose}
            aria-label="Close filters"
            className="p-2 hover:bg-gray-100 rounded"
          >
            <CloseIcon size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-6 flex-1">
          {children}
        </div>
        <div className="mt-auto pt-6">
          <Copyright />
        </div>
      </div>
    </>
  );
}
