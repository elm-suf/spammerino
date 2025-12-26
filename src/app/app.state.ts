import { computed, inject, resource } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UsersService } from '@api';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { filter, firstValueFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface AppState {
  query: string;
  userName: string;
}

const initialState: AppState = {
  query: '',
  userName: '',
};

export const AppStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withProps((store, svc = inject(UsersService)) => ({
    searchUsersResource: resource({
      params: () => {
        const query = store.query().trim();
        return query ? { query } : undefined;
      },
      loader: ({ params }) => firstValueFrom(svc.searchUsers(params.query)),
    }),

    selectedUserResource: resource({
      params: () => {
        const userName = store.userName();
        return userName ? { userName } : undefined;
      },
      loader: ({ params }) => firstValueFrom(svc.getUserByUsername(params.userName)),
    }),

    emotesResource: resource({
      params: () => {
        const userName = store.userName();
        return userName ? { userName } : undefined;
      },
      loader: ({ params }) => firstValueFrom(svc.getEmotesByUsername(params.userName)),
    }),

    badgesResource: resource({
      params: () => {
        const userName = store.userName();
        return userName ? { userName } : undefined;
      },
      loader: ({ params }) => firstValueFrom(svc.getBadgesByUsername(params.userName)),
    }),
  })),

  withComputed((store) => ({
    users: computed(() => store.searchUsersResource.value() ?? []),
    emotes: computed(() => store.emotesResource.value() ?? []),
    badges: computed(() => store.badgesResource.value() ?? []),

    selectedUser: store.selectedUserResource.value.asReadonly(),

    isLoading:
      store.searchUsersResource.isLoading ||
      store.selectedUserResource.isLoading ||
      store.emotesResource.isLoading ||
      store.badgesResource.isLoading,
  })),

  withMethods((store) => ({
    setQuery: (query: string) => patchState(store, { query }),
    setUserName: (userName: string) => patchState(store, { userName }),
  })),

  withHooks({
    onInit(store, route = inject(ActivatedRoute), router = inject(Router)) {
      router.events
        .pipe(
          filter((e): e is NavigationEnd => e instanceof NavigationEnd),
          takeUntilDestroyed(),
        )
        .subscribe(() => {
          const childRoute = route.firstChild ?? route;
          const userName = childRoute.snapshot.paramMap.get('userName') ?? '';

          store.setUserName(userName);
        });
    },
  }),
);
