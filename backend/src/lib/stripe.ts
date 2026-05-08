import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";

export const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-01-27.acacia" as any, // Using a recent stable version
});

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
export const STRIPE_PRO_PRICE_ID = process.env.STRIPE_PRO_PRICE_ID || "";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

/**
 * Creates a Stripe Checkout Session for a one-time payment or subscription.
 * We'll focus on subscription for the "Pro" tier.
 */
export async function createCheckoutSession(userId: string, userEmail: string, priceId?: string) {
    const finalPriceId = priceId || STRIPE_PRO_PRICE_ID;
    
    if (!finalPriceId) {
        throw new Error("Price ID is not configured.");
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price: finalPriceId,
                quantity: 1,
            },
        ],
        mode: "subscription",
        success_url: `${FRONTEND_URL}/account?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${FRONTEND_URL}/account`,
        customer_email: userEmail,
        client_reference_id: userId,
        subscription_data: {
            metadata: {
                user_id: userId,
            },
        },
    });

    return session;
}

/**
 * Creates a Stripe Customer Portal Session.
 * Allows users to manage their subscription, payment methods, and billing history.
 */
export async function createPortalSession(customerId: string) {
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${FRONTEND_URL}/account`,
    });

    return session;
}
