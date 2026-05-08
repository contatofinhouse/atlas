import { Router } from "express";
import { stripe, STRIPE_WEBHOOK_SECRET, createCheckoutSession } from "../lib/stripe";
import { createServerSupabase } from "../lib/supabase";
import express from "express";

const router = Router();
const supabase = createServerSupabase();

// 1. Create Checkout Session
router.post("/create-checkout-session", express.json(), async (req, res) => {
    try {
        const { userId, userEmail, priceId } = req.body;
        if (!userId || !userEmail) {
            return res.status(400).json({ error: "Missing userId or userEmail" });
        }

        const session = await createCheckoutSession(userId, userEmail, priceId);
        res.json({ url: session.url });
    } catch (error: any) {
        console.error("[stripe] create-checkout-session error:", error);
        res.status(500).json({ error: error.message });
    }
});

// 2. Create Customer Portal Session
router.post("/create-portal-session", express.json(), async (req, res) => {
    try {
        const { stripeCustomerId } = req.body;
        if (!stripeCustomerId) {
            return res.status(400).json({ error: "Missing stripeCustomerId" });
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/account`,
        });

        res.json({ url: session.url });
    } catch (error: any) {
        console.error("[stripe] create-portal-session error:", error);
        res.status(500).json({ error: error.message });
    }
});

// 3. Webhook Listener
// Note: This route needs the raw body to verify the Stripe signature.
// In index.ts, we should use express.raw() for this specific route.
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
        console.error(`[stripe] Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as any;
            const userId = session.client_reference_id;
            const customerId = session.customer;

            console.log(`[stripe] Payment successful for user ${userId}`);

            // Update user tier to Pro
            const { error } = await supabase
                .from("user_profiles")
                .update({ 
                    tier: "Pro",
                    stripe_customer_id: customerId,
                    updated_at: new Date().toISOString() 
                })
                .eq("user_id", userId);

            if (error) {
                console.error("[stripe] Failed to update user tier:", error);
            }
            break;
        }
        case "customer.subscription.deleted": {
            const subscription = event.data.object as any;
            const customerId = subscription.customer;

            console.log(`[stripe] Subscription deleted for customer ${customerId}`);

            // Revert user tier to Free
            const { error } = await supabase
                .from("user_profiles")
                .update({ 
                    tier: "Free",
                    updated_at: new Date().toISOString() 
                })
                .eq("stripe_customer_id", customerId);

            if (error) {
                console.error("[stripe] Failed to revert user tier:", error);
            }
            break;
        }
        default:
            console.log(`[stripe] Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

export default router;
