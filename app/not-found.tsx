"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useReducer, useEffect } from 'react';

// Define reducer state and actions
interface NotFoundState {
    scroll: boolean;
    isMobileMenu: boolean;
}
type NotFoundAction =
    | { type: 'SET_SCROLL'; payload: boolean }
    | { type: 'TOGGLE_MOBILE_MENU' };

const initialState: NotFoundState = {
    scroll: false,
    isMobileMenu: false,
};

function notFoundReducer(state: NotFoundState, action: NotFoundAction): NotFoundState {
    switch (action.type) {
        case 'SET_SCROLL':
            return { ...state, scroll: action.payload };
        case 'TOGGLE_MOBILE_MENU':
            return { ...state, isMobileMenu: !state.isMobileMenu };
        default:
            return state;
    }
}

export default function NotFound() {
    const [state, dispatch] = useReducer(notFoundReducer, initialState);
    const { scroll, isMobileMenu } = state;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                dispatch({ type: 'SET_SCROLL', payload: true });
            } else {
                dispatch({ type: 'SET_SCROLL', payload: false });
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMobileMenu = () => {
        dispatch({ type: 'TOGGLE_MOBILE_MENU' });
    };

    return (
        <main>
            <div className="hero1-section-area  text-center">
                <Image
                    src="/assets/img/404.svg"
                    alt="404 Error Illustration"
                    width={200}
                    height={200}
                />
                <div className="hero-heading-content heading1">
                    <h1>404</h1>
                    <h2 className="mb-3">Page Not Found</h2>
                    <p className="mb-4">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                    {/* Action Buttons */}
                    <div className="btn-area1">
                        <Link href="/" className="vl-btn1">
                            Go Back Home
                            <span className="arrow1 ms-2">
                                <i className="fa-solid fa-arrow-right" />
                            </span>
                            <span className="arrow2 ms-2">
                                <i className="fa-solid fa-arrow-right" />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
} 