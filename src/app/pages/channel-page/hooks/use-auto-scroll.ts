import { effect, signal, untracked, type ElementRef, type Signal } from '@angular/core';

export function useAutoScroll(
  scrollRef: Signal<ElementRef<HTMLElement> | undefined>,
  contentSignal: Signal<unknown>
) {
  const shouldAutoScroll = signal(true);

  // React to content changes and scroll in the same effect
  effect(() => {
    // Track content changes
    contentSignal();

    // Don't track shouldAutoScroll in dependencies, just read its value
    if (!untracked(() => shouldAutoScroll())) return;

    // Access the element outside the effect's tracking
    const el = untracked(() => scrollRef()?.nativeElement);
    if (!el) return;

    // Request the scroll to happen after current execution
    queueMicrotask(() => {
      el.scrollTop = el.scrollHeight;
    });
  });

  function onScroll() {
    const el = scrollRef()?.nativeElement;
    if (!el) return;

    const threshold = 20;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;

    shouldAutoScroll.set(atBottom);
  }

  function onMouseLeave() {
    // Re-enable auto-scroll and immediately scroll to bottom
    shouldAutoScroll.set(true);

    const el = untracked(() => scrollRef()?.nativeElement);
    if (!el) return;

    el.scrollTop = el.scrollHeight;
  }

  function onMouseEnter() {
    // Disable auto-scroll when user is interacting with the chat
    shouldAutoScroll.set(false);
  }

  return {
    onScroll,
    onMouseLeave,
    shouldAutoScroll,
    onMouseEnter,
  };
}
