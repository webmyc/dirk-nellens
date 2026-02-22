'use server';

export async function subscribeToSubstack(formData: FormData) {
    const email = formData.get('email');

    if (!email || typeof email !== 'string') {
        return { success: false, message: 'Please provide a valid email address.' };
    }

    try {
        const response = await fetch('https://reflectorsreflections.substack.com/api/v1/free', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                source: 'website_embed'
            }),
        });

        if (response.ok) {
            return { success: true, message: 'Successfully subscribed!' };
        } else {
            const data = await response.json().catch(() => ({}));
            return {
                success: false,
                message: data.error || 'Failed to subscribe. You may already be subscribed.'
            };
        }
    } catch (error) {
        return { success: false, message: 'A network error occurred. Please try again later.' };
    }
}
