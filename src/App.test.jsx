import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';

describe('App', () => {
    it('renders without crashing', () => {
        // Basic smoke test
        // We wrap in try/catch because rendering might fail due to missing context or routing if not set up correctly in App
        // But App has providers inside it now.
        try {
            render(
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            );
            expect(true).toBe(true);
        } catch (e) {
            console.error(e);
            expect(e).toBeNull();
        }
    });
});
