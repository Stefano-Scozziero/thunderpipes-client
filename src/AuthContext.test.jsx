import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

const TestComponent = () => {
    const { user, login } = useAuth();
    return (
        <div>
            <div data-testid="user">{user ? user.username : 'No User'}</div>
            <button onClick={() => login('test', 'password')}>Login</button>
        </div>
    );
};

describe('AuthContext', () => {
    it('provides user state and login function', async () => {
        axios.get.mockResolvedValue({ data: { user: null } });
        axios.post.mockResolvedValue({ data: { user: { username: 'testuser', role: 'customer' } } });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByTestId('user')).toHaveTextContent('No User');

        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByTestId('user')).toHaveTextContent('testuser');
        });
    });
});
