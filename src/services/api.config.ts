export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

/**
 * Flag indicating whether to route requests through mock data or live Spring Boot REST endpoints.
 * In development without a running backend, falls back gracefully to deterministic mocks.
 */
export const USE_MOCK_DATA = true;
