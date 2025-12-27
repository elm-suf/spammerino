import { inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

export function useMobileBreakpoint() {
  const breakpointObserver = inject(BreakpointObserver);
  const isMobile = breakpointObserver
    .observe('(max-width: 768px)')
    .pipe(map(({ matches }) => matches));
  return toSignal(isMobile);
}
