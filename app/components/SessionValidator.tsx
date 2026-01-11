"use client";

import { useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

/**
 * SessionValidator Component
 *
 * Enforces single-device login by periodically checking if the user's
 * session is still valid. If another device logs in with the same account,
 * this session will be automatically logged out.
 *
 * HOW IT WORKS:
 * 1. Checks session validity every 30 seconds
 * 2. If session is invalid (another device logged in), logs out user
 * 3. Shows alert message explaining why they were logged out
 */
export function SessionValidator() {
  const router = useRouter();
  const hasShownAlertRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();
    let intervalId: NodeJS.Timeout;

    // Function to validate current session
    const validateSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        // If no session or session is invalid
        if (!session || error) {
          // Only show alert once
          if (!hasShownAlertRef.current) {
            hasShownAlertRef.current = true;

            // Log out the user
            await supabase.auth.signOut();

            // Show alert
            if (typeof window !== 'undefined') {
              alert(
                '🔒 Session Expired\n\n' +
                'You have been logged out because your account was accessed from another device.\n\n' +
                'For security reasons, only one device can be logged in at a time.'
              );
            }

            // Redirect to home page
            router.push('/');
            router.refresh();
          }
        }
      } catch (err) {
        console.error('[SessionValidator] Error checking session:', err);
      }
    };

    // Check session validity every 30 seconds
    intervalId = setInterval(validateSession, 30000);

    // Also check immediately on mount
    validateSession();

    // Cleanup interval on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [router]);

  return null; // This component doesn't render anything
}
