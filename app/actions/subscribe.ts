'use server';

export async function subscribeToSubstack(formData: FormData) {
    const email = formData.get('email');

    if (!email || typeof email !== 'string') {
        return { success: false, message: 'Please provide a valid email address.' };
    }

    try {
        // Due to Substack API CORS/CSRF protections, direct POST to /api/v1/free from an external domain will fail.
        // The most reliable way for a custom React frontend to subscribe a user is to redirect them to the Substack subscribe page
        // with the email pre-filled in the query string.

        return {
            success: true,
            message: 'Redirecting to Substack...',
            redirectUrl: `https://reflectorsreflections.substack.com/subscribe?email=${encodeURIComponent(email)}`
        };
    } catch (error) {
        return { success: false, message: 'A network error occurred. Please try again later.' };
    }
}
