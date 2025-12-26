import { InjectionToken } from '@angular/core';
import { HttpInterceptor, HttpContextToken } from '@angular/common/http';

/**
 * Injection token for the SpammerinoApi client base API path
 */
export const BASE_PATH_SPAMMERINOAPI = new InjectionToken<string>('BASE_PATH_SPAMMERINOAPI', {
  providedIn: 'root',
  factory: () => '/api', // Default fallback
});
/**
 * Injection token for the SpammerinoApi client HTTP interceptor instances
 */
export const HTTP_INTERCEPTORS_SPAMMERINOAPI = new InjectionToken<HttpInterceptor[]>(
  'HTTP_INTERCEPTORS_SPAMMERINOAPI',
  {
    providedIn: 'root',
    factory: () => [], // Default empty array
  },
);
/**
 * HttpContext token to identify requests belonging to the SpammerinoApi client
 */
export const CLIENT_CONTEXT_TOKEN_SPAMMERINOAPI = new HttpContextToken<string>(
  () => 'SpammerinoApi',
);
