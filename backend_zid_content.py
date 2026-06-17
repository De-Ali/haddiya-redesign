"""Shared content data for Haddiya Backend + ZID Integration roadmap.
Imported by both DOCX and PDF builders.
"""

PLATFORM_DESCRIPTION = (
    "Haddiya backend is the orchestration and intelligence layer sitting between the consumer "
    "apps (already designed and built in React + React Native) and the ZID e-commerce platform. "
    "ZID — the leading Saudi multi-tenant commerce platform — provides the core commerce "
    "primitives (catalog, orders, customers, payments, shipping). Haddiya backend extends ZID with "
    "multi-vendor marketplace logic, the Gift AI Assistant, send-as-gift workflows, scheduled "
    "delivery, loyalty, vendor portal APIs, and admin operations — all the differentiators that "
    "ZID alone does not provide out of the box."
)

WHY_ZID = (
    "ZID is purpose-built for the GCC market with native support for Mada, STC Pay, Tabby, Tamara, "
    "Apple Pay, Arabic-first storefront APIs, local shipping carriers (SMSA, Aramex, Naqel), and "
    "PDPL-compliant data residency. Building Haddiya on ZID compresses 4–6 months of commerce "
    "primitives work and inherits proven payment and tax flows. Haddiya focuses engineering effort "
    "on the high-value differentiators — multi-vendor orchestration, AI, and the gifting experience."
)

INTEGRATION_PRINCIPLES = [
    ("ZID owns commerce primitives", "Products, orders, payments, shipping, customers live in ZID as system-of-record. Haddiya never duplicates them as writeable."),
    ("Haddiya caches for performance", "ZID data mirrored to PostgreSQL + OpenSearch for fast queries, AI ranking, and reporting. Cache invalidated via ZID webhooks."),
    ("Haddiya owns differentiators", "Multi-vendor mapping, Gift AI, scheduled delivery, message cards, loyalty ledger, vendor payout tracking — Haddiya tables only."),
    ("Webhooks-first sync", "Real-time consistency via ZID webhooks; periodic reconciliation as safety net (every 15 min for inventory, hourly for orders)."),
    ("API contract isolation", "Mobile/web apps call Haddiya BFF, never ZID directly. Lets us swap ZID later without touching clients."),
    ("Idempotent everything", "Every ZID write (order create, refund, customer update) is idempotent with deterministic external_id to survive retries."),
]

BUSINESS_OBJECTIVES = [
    ["1", "Use ZID for commerce primitives, focus team on differentiators", "Save 4–6 months of build time"],
    ["2", "Webhook-driven near-real-time sync across all entities", "Sync lag < 5s p95"],
    ["3", "Idempotent integration that survives ZID API outages", "Zero duplicate orders, zero lost webhooks"],
    ["4", "Vendor payout accuracy across multi-vendor splits", "Reconciliation variance < 0.1% monthly"],
    ["5", "Backend SLA suitable for marketplace volumes", "99.95% uptime, p95 API latency < 250 ms"],
]

SYSTEM_COMPONENTS = [
    ["ZID Platform", "Catalog, orders, customers, payments, shipping (system-of-record)"],
    ["Haddiya BFF", "REST + GraphQL gateway for mobile/web; routes to ZID and internal services"],
    ["ZID Connector Service", "Typed SDK wrapper, OAuth token mgmt, rate-limit handling, retries"],
    ["Webhook Ingestion Service", "Receives ZID events, validates HMAC, dispatches to internal queues"],
    ["Catalog Cache Service", "PostgreSQL + OpenSearch mirror of ZID products + categories"],
    ["Multi-Vendor Orchestrator", "Maps Haddiya carts to per-vendor ZID orders; payout split logic"],
    ["Gift AI Service", "LLM + pgvector embeddings; product recommendation API"],
    ["Gift Experience Service", "Message cards, scheduled delivery, recipient mgmt, gift wrapping"],
    ["Loyalty Ledger", "Points earn/redeem, tier rules, ZID coupon bridge"],
    ["Vendor Portal API", "Per-vendor scoped APIs built on top of ZID per-store endpoints"],
    ["Admin Operations API", "Approvals, disputes, refunds (proxied to ZID)"],
    ["Notification Service", "Push (FCM/APNs), WhatsApp Business, transactional email"],
    ["Reporting Service", "Data warehouse (Snowflake/BigQuery) fed from ZID + Haddiya ledger"],
    ["Platform Foundation", "PostgreSQL, Redis, OpenSearch, SQS, S3, CloudFront, WAF"],
]

# Timeframe — backend only (UI/UX done)
TIMEFRAME = [
    ["Backend MVP", "ZID account, OAuth, catalog sync, order orchestration, single-vendor checkout, single payment, basic webhooks", "8–10", "2–2.5", "Pilot with 5–10 vendors"],
    ["Backend V1 Production", "Multi-vendor splits, full payment mix, send-as-gift backend, scheduled delivery, vendor portal API, admin API, Gift AI v1, full notifications", "16–20", "4–5", "Public launch, ZID partner app live"],
    ["Backend V2 Enterprise", "Multi-country (UAE/Bahrain ZID stores), loyalty ledger, B2B gifting API, advanced analytics, anomaly detection, multi-warehouse", "28–34", "7–8.5", "GCC expansion, enterprise SLAs"],
    ["End-to-end (overlapped)", "Phases run in parallel after MVP foundation", "~26", "~6.5", "Backend complete with frontend already in place"],
]

# Module-wise ZID integration plan
MODULES = [
    # [#, Module, Description, ZID Coverage, Custom Effort, PW, Resources]
    ["1", "ZID Partner App Registration", "Register Haddiya as ZID partner app, scopes, OAuth credentials, sandbox + prod env config",
     "Full (provided by ZID)", "Config + flow wiring", "2", "1 BE Lead"],
    ["2", "OAuth 2.0 Store Connection", "Per-vendor store authorization, token storage (Secrets Manager), refresh handling",
     "Native OAuth flow", "Token vault + refresh worker", "4", "1 BE, 1 Sec"],
    ["3", "ZID SDK / Connector Library", "Typed NestJS client wrapping ZID REST API: retry, rate-limit aware (429 backoff), circuit breaker, request signing",
     "REST endpoints only", "All client logic in-house", "6", "1 BE"],
    ["4", "Webhook Ingestion Service", "Receive ZID events (order.created, product.updated, customer.created, etc.), HMAC verify, idempotency, SQS dispatch",
     "Webhook delivery only", "Full ingestion + dedupe", "8", "1 BE"],
    ["5", "Catalog Sync Pipeline", "ZID products → PostgreSQL + OpenSearch. Initial backfill + delta via webhooks. Bilingual fields, variants, media URLs",
     "Products API (read)", "Cache + reconciliation", "10", "1 BE"],
    ["6", "Inventory Sync", "Real-time stock from ZID + reservation hold during checkout. 15-min reconciliation job",
     "Stock webhook + API", "Reservation layer + recon job", "6", "1 BE"],
    ["7", "Customer Sync", "Mobile-first auth (phone+OTP) → ZID customer profile. Address book sync, GDPR/PDPL controls",
     "Customer API", "Auth bridge + privacy controls", "8", "1 BE, 1 Sec"],
    ["8", "Cart & Pricing Service", "Multi-vendor cart, ZID pricing rules (tax, promotions), Haddiya-applied platform discounts",
     "Cart API per store", "Cross-store aggregation", "10", "1 BE"],
    ["9", "Order Orchestration", "Haddiya checkout → 1..N ZID orders (one per vendor). Saga pattern for partial failures. Order status aggregation to customer",
     "Order create API + webhooks", "Saga + state machine", "14", "1.5 BE"],
    ["10", "Payment Integration via ZID", "Leverage ZID gateway abstraction (Mada, STC Pay, Tabby, Tamara, Apple Pay, COD). 3DS handled by ZID",
     "Full PSP coverage", "Checkout glue + retry", "6", "1 BE, 1 Sec"],
    ["11", "Shipping & Carrier Integration", "ZID carriers (SMSA, Aramex, Naqel) + Haddiya scheduled delivery windows stored as order metadata",
     "Native carrier integrations", "Schedule layer + tracking", "8", "1 BE"],
    ["12", "Refunds & Returns API", "Initiate refund in ZID, sync vendor payout ledger, notify customer",
     "Refund API", "Payout reconciliation", "6", "1 BE"],
    ["13", "Multi-Vendor Mapping Service", "Map Haddiya vendor → ZID store/sub-store. Vendor lifecycle (active, suspended, pending KYC)",
     "ZID Marketplace plan or 1 store/vendor", "Mapping + RBAC", "12", "1 BE"],
    ["14", "Vendor Payout Ledger", "Track commission per order, split calc, payout schedule. Reconciles to ZID order totals daily",
     "Order totals from ZID", "Full ledger in Haddiya", "12", "1 BE, finance review"],
    ["15", "Vendor Onboarding API", "KYC document upload (S3), approval workflow, ZID store provisioning via ZID admin API",
     "Store provisioning API", "KYC + approval flow", "10", "1 BE, ops"],
    ["16", "Vendor Portal API", "Per-vendor scoped: products, orders, earnings, payouts. Built on ZID per-store APIs with Haddiya RBAC layer",
     "ZID Products + Orders APIs", "RBAC + earnings calc", "14", "1 BE"],
    ["17", "Gift AI Assistant Service", "LLM + product embeddings (pgvector). Queries Haddiya catalog cache, never ZID directly",
     "None (Haddiya-only)", "Full build", "12", "1 AI, 1 BE"],
    ["18", "Send-as-Gift Backend", "Message cards (templates), recipient details, gift wrapping options. Attached to ZID order via custom fields/metadata",
     "Order metadata fields", "Gift entity + assets", "8", "1 BE"],
    ["19", "Scheduled Delivery Logic", "Date/time window selection, vendor capacity check, carrier handoff timing",
     "Order metadata", "Slot mgmt + validation", "6", "1 BE"],
    ["20", "Promotions & Coupons Bridge", "Haddiya platform coupons + ZID native discounts. Stacking rules, eligibility validation",
     "ZID discount API", "Bridge + stacking logic", "8", "1 BE"],
    ["21", "Loyalty & Points Ledger", "Earn on completed orders (ZID webhook), redeem via ZID coupon mint. Tiering rules",
     "ZID coupon API", "Full ledger + tiers", "10", "1 BE"],
    ["22", "Notifications Service", "Push (FCM/APNs), WhatsApp Business, transactional email (SES). Subscribes to ZID order webhooks",
     "Webhook events", "All channels in-house", "10", "1 BE"],
    ["23", "Admin Operations API", "Vendor approvals, dispute resolution, manual refunds, catalog moderation. Proxies to ZID where applicable",
     "Admin endpoints", "Workflow layer", "10", "1 BE"],
    ["24", "Reporting & Analytics Pipeline", "ETL from ZID Orders API + Haddiya ledger → Snowflake. GMV, AOV, vendor performance, cohort retention",
     "Orders/Customers APIs (export)", "Full DW + dashboards", "12", "1 Data, 1 BE"],
    ["25", "Document Management Service", "Vendor KYC, invoices (ZID provides), gift card art templates. S3 + signed URLs",
     "Invoice generation", "KYC + asset storage", "4", "1 BE"],
    ["26", "Customer Support API", "Ticket flow, order lookup (ZID), refund actions, chat handoff (Zendesk/Intercom)",
     "Order/refund APIs", "Ticket layer", "6", "1 BE"],
    ["27", "Auth & RBAC", "Haddiya users (customer/vendor/admin) — separate identity from ZID. JWT, refresh, MFA for vendors",
     "ZID customer auth (consumer side)", "Vendor/admin IdP + RBAC", "8", "1 BE, 1 Sec"],
    ["28", "Rate-Limit & Quota Mgmt", "Stay within ZID API quotas (per-store + per-app). Distributed token bucket via Redis",
     "ZID rate-limit headers", "Quota orchestration", "5", "1 BE"],
    ["29", "Observability & Tracing", "Track ZID API latency, webhook delivery success, retry counts. OpenTelemetry traces span Haddiya → ZID",
     "ZID returns request IDs", "Full instrumentation", "8", "1 DevOps"],
    ["30", "Security & Compliance", "OWASP, PDPL, GDPR. ZID OAuth token vault, webhook HMAC, PII encryption at rest",
     "ZID handles PCI scope", "Haddiya-side hardening", "10", "1 Sec, DevOps"],
    ["31", "DevOps & Infrastructure", "IaC (Terraform), CI/CD (GitHub Actions), ECS/EKS, env separation (dev/stage/prod), DR strategy",
     "—", "Full build", "14", "1 DevOps"],
    ["32", "Disaster Recovery & ZID Outage Playbook", "Read-only mode when ZID down, queued writes, customer messaging, auto-replay when ZID recovers",
     "—", "Full design + drills", "6", "1 DevOps, 1 BE"],
]

# Phases — backend-specific
PHASES = [
    ("Phase A — ZID Foundation · Weeks 1–4", [
        "ZID partner app registration, OAuth credentials, sandbox environment.",
        "ZID API contract review, scope definition, rate-limit budget.",
        "Connector SDK skeleton (NestJS), authentication flow, retry/backoff.",
        "Webhook ingestion service, HMAC verification, SQS dispatch.",
        "PostgreSQL schema for cache, multi-vendor mapping, ledger tables.",
        "Initial CI/CD pipeline, staging environment with ZID sandbox.",
    ], "Deliverables: Working OAuth flow, webhook ingest, ZID SDK v0.1, staging env."),

    ("Phase B — Core Commerce Sync · Weeks 4–10", [
        "Catalog sync (products, categories, variants) → PostgreSQL + OpenSearch.",
        "Inventory sync via webhooks + 15-min reconciliation.",
        "Customer sync (Haddiya auth → ZID customer profile).",
        "Cart and pricing service (single-vendor first).",
        "Order orchestration v1 (single-vendor checkout, ZID order create, webhook listener).",
        "Payment integration via ZID gateway (Mada + COD initially).",
    ], "Deliverables: End-to-end single-vendor purchase flow on staging. Webhook reliability > 99%."),

    ("Phase C — Multi-Vendor Layer · Weeks 8–14", [
        "Vendor onboarding API + KYC workflow + ZID store provisioning.",
        "Multi-vendor mapping service.",
        "Cart splitting → N ZID orders, saga for partial failures.",
        "Vendor payout ledger + daily reconciliation against ZID totals.",
        "Vendor Portal API (products, orders, earnings scoped per vendor).",
    ], "Deliverables: Two vendors transacting in parallel, accurate payout split."),

    ("Phase D — Differentiator Modules · Weeks 12–18", [
        "Gift AI Assistant: embeddings pipeline, LLM-backed recommendation API.",
        "Send-as-gift backend (message cards, recipient details, wrapping).",
        "Scheduled delivery slot mgmt + carrier handoff timing.",
        "Loyalty ledger + ZID coupon bridge for redemption.",
        "Promotions bridge (Haddiya coupons + ZID discounts, stacking rules).",
    ], "Deliverables: AI-driven recommendations live; gifting metadata flowing end-to-end."),

    ("Phase E — Operations & Ops APIs · Weeks 14–20", [
        "Admin Operations API (approvals, disputes, refunds).",
        "Notifications service (push, WhatsApp, email) wired to ZID webhooks.",
        "Customer support API + ticketing integration.",
        "Refund and return flow with payout reconciliation.",
    ], "Deliverables: Full admin workflows; ops team can manage vendors and orders without ZID UI."),

    ("Phase F — Analytics & Hardening · Weeks 16–22", [
        "Reporting pipeline: ZID → Snowflake/BigQuery; Looker dashboards.",
        "Observability: OpenTelemetry traces, Datadog APM, RUM, error tracking.",
        "Security hardening: pen test, OWASP review, secrets rotation drill.",
        "Disaster recovery playbook + ZID outage simulation.",
        "Performance: k6 load tests at 5× expected peak.",
    ], "Deliverables: Production-ready, monitored, security-cleared backend."),

    ("Phase G — Production Launch & Stabilization · Weeks 20–24", [
        "Production cutover, blue-green deploy.",
        "On-call rotation, status page.",
        "Pilot vendor cohort (10–15) on production.",
        "Tuning based on real-traffic metrics.",
        "Backlog grooming for V2 (multi-country, loyalty deep-dive, B2B).",
    ], "Deliverables: Live production with paying transactions. Runbooks complete."),
]

# Architecture stack
ARCHITECTURE = [
    ["Commerce Engine", "ZID Platform (Marketplace plan)", "GCC-native, PDPL-compliant, full payment + shipping coverage"],
    ["Backend Framework", "Node.js + NestJS (TypeScript)", "Type-safe, modular, mature ecosystem"],
    ["API Gateway / BFF", "REST + tRPC for internal, GraphQL for mobile aggregation", "Channel-tailored payloads"],
    ["Database", "PostgreSQL 16 on RDS (multi-AZ) + pgvector", "ACID for ledger, embeddings for AI"],
    ["Caching", "Redis (ElastiCache)", "Hot product cache, OAuth tokens, rate-limit buckets"],
    ["Search", "OpenSearch (managed) with Arabic + English analyzers", "Catalog search, faceting, RTL tokenization"],
    ["Queue / Events", "Amazon SQS + EventBridge", "Webhook fan-out, async order processing"],
    ["Object Storage", "S3 + CloudFront", "KYC documents, gift card assets, signed URLs"],
    ["Cloud Region", "AWS me-central-1 (UAE) primary, eu-south-1 DR", "PDPL data residency"],
    ["Secrets", "AWS Secrets Manager", "ZID OAuth tokens, webhook HMAC keys, rotation"],
    ["Observability", "Datadog APM + logs + RUM, OpenTelemetry traces", "ZID → Haddiya latency visibility"],
    ["Error Tracking", "Sentry", "Full-stack exception capture"],
    ["Feature Flags", "LaunchDarkly or Unleash", "Safe rollouts, vendor-segment targeting"],
    ["Data Warehouse", "Snowflake or BigQuery + Looker/Metabase", "GMV, AOV, cohort, vendor performance"],
    ["CI/CD", "GitHub Actions → ECR → ECS Fargate", "Blue-green, daily prod deploys"],
    ["IaC", "Terraform modules per env", "Reproducible infra, drift detection"],
    ["WAF / Security", "AWS WAF + Shield", "Bot mitigation, DDoS, OWASP top-10"],
]

# Team
TEAM_V1 = [
    ["Backend Lead / Architect", "1", "Full-time", "Full project", "Owns ZID integration design, code review"],
    ["Backend Engineers", "3", "Full-time", "Full project", "ZID SDK, sync pipelines, vendor services"],
    ["AI / ML Engineer", "1", "FT Phase D, PT after", "~3 months", "Gift AI Assistant, embeddings"],
    ["Data Engineer", "1", "PT (50%) from Phase F", "~2 months", "Analytics pipeline, warehouse"],
    ["DevOps / Platform Engineer", "1", "Full-time", "Full project", "IaC, CI/CD, observability, on-call"],
    ["Security Engineer", "1", "Part-time (40%)", "From Phase B", "OWASP, secrets, pen test"],
    ["QA / Integration Engineer", "1", "Full-time", "From Phase B", "API contract tests, ZID sandbox QA"],
    ["Product Manager", "1", "Full-time", "Full project", "Roadmap, vendor liaison, ZID partner mgmt"],
    ["Tech Project Manager", "1", "Full-time", "Full project", "Ceremonies, risk, ZID dependency tracking"],
    ["Peak Total", "~9–10 FTE", "—", "—", "Backend-only — frontend already complete"],
]

TEAM_OPTIONS = [
    ["Lean (Solo Founder)", "5–6 FTE", "7–8 months", "Sole BE lead + 2 BE + 1 DevOps + 1 QA + fractional Sec/AI", "Slower, sequential, no AI until later"],
    ["Standard (Recommended)", "9–10 FTE", "5 months", "Full pod with dedicated AI, Data, Sec", "Balanced; on-time backend launch"],
    ["Aggressive", "13+ FTE", "3.5–4 months", "Double backend pod, dedicated infra team", "Coordination tax, diminishing returns"],
]

# ZID-specific risks
RISKS_TECH = [
    ["ZID API rate limits hit during catalog burst sync", "Medium", "High", "Distributed token bucket, exponential backoff, off-peak backfill, request batching"],
    ["Webhook delivery failures / out-of-order events", "High", "Medium", "HMAC verify, idempotency keys, dead-letter queue, periodic reconciliation"],
    ["ZID API contract changes (deprecation, breaking versions)", "Medium", "High", "Pin API version, monitor ZID changelog, integration test suite, abstraction layer"],
    ["Multi-vendor split semantics differ from ZID native model", "High", "High", "Saga pattern, custom mapping table, daily reconciliation"],
    ["OAuth token expiry during high-traffic windows", "Low", "High", "Pre-emptive refresh worker, retry on 401, distributed lock on refresh"],
]

RISKS_SCALE = [
    ["ZID API latency spikes under load", "GMV spike (Eid, Mother's Day)", "Aggressive caching, async order intake, queued writes"],
    ["Webhook backlog during ZID incidents", "ZID downtime > 5 min", "SQS-backed buffer, replay on recovery, alerting"],
    ["Catalog cache divergence from ZID", "Catalog > 50K SKUs across vendors", "Hourly reconciliation, drift metrics, alerting on > 0.5% variance"],
    ["Payout ledger reconciliation lag", "Daily order volume > 5K", "Streaming reconciliation, materialized views, anomaly detection"],
]

RISKS_SEC = [
    ["ZID OAuth tokens leaked", "Critical", "Secrets Manager, no env vars, automated rotation, audit logging"],
    ["Webhook spoofing (forged ZID events)", "Critical", "HMAC signature verification on every event, replay protection"],
    ["Vendor data cross-tenant leak", "High", "Tenant scoping in every query, RLS on Postgres, isolation tests"],
    ["PII exposure (Oman PDPL, GDPR)", "Critical", "Encryption at rest (KMS) + TLS 1.3, field-level PII, audit log, data residency in me-central-1"],
    ["Supply-chain (npm) attack", "Medium", "Dependabot, SBOM, Snyk/Socket, signed images, lockfile audit"],
]

RISKS_PERF = [
    ["ZID round-trips on every order page render", "Slow product detail", "Aggressive Redis cache, read-through from PG mirror"],
    ["N+1 ZID calls during multi-vendor checkout", "Slow checkout confirmation", "Batch where API supports, parallel fan-out with bulkhead"],
    ["Webhook processing slower than ingestion", "Growing SQS backlog", "Horizontal worker scale, batch consumption, prioritized queues"],
    ["Reconciliation job blocks DB", "Locks during peak", "Read replica for recon, off-peak scheduling, chunked queries"],
]

# Final recommendation
MVP_FEATURES = [
    "ZID partner app live with OAuth + webhook ingestion.",
    "Catalog sync (products + categories + variants) to Haddiya cache.",
    "Inventory sync (real-time webhooks + reconciliation).",
    "Customer auth bridge (phone+OTP → ZID customer).",
    "Single-vendor cart + checkout, ZID order create, ZID payment (Mada + COD).",
    "Order status webhooks → push notifications to customer.",
    "Basic admin API for order lookup + refund initiation.",
    "Vendor onboarding API (manual approval) + 1 store/vendor.",
    "Send-as-gift v1: message card text stored as order metadata.",
    "Observability baseline (logs + metrics + error tracking).",
]

DEFER_V1 = [
    "Multi-vendor cart splitting (saga + payout ledger).",
    "Gift AI Assistant (LLM + embeddings).",
    "Scheduled delivery slot management.",
    "Loyalty ledger + ZID coupon bridge.",
    "Vendor Portal API (self-service).",
    "Full payment mix (Tabby, Tamara, STC Pay, Apple Pay).",
    "WhatsApp Business notifications.",
    "Reporting pipeline + warehouse.",
]

DEFER_V2 = [
    "Multi-country expansion (UAE, Bahrain ZID stores) with multi-currency.",
    "B2B corporate gifting API (bulk orders, invoicing, custom branding).",
    "Subscription gifting / recurring deliveries.",
    "Advanced anomaly detection (vendor fraud, inventory anomalies).",
    "Multi-warehouse routing logic.",
    "Marketplace ads / sponsored placement API.",
    "Vendor mobile app backend.",
]

FAST_APPROACH = [
    ("Pin ZID API version. ", "Read changelog weekly. Integration test suite runs nightly against sandbox."),
    ("Webhook-first, never poll. ", "Polling at scale exhausts rate limits. Reconciliation as safety net only."),
    ("Idempotency keys everywhere. ", "Every ZID write carries deterministic external_id derived from Haddiya domain event."),
    ("Cache aggressively, invalidate on webhook. ", "Hot products + categories cached in Redis with 15-min TTL + webhook bust."),
    ("Saga + dead-letter queues for multi-vendor orders. ", "Partial failures must be observable and replayable."),
    ("Daily payout reconciliation in dev from day one. ", "Build the financial truth-table before any vendor ships."),
    ("Sandbox-driven development. ", "Every engineer has a personal ZID sandbox; no shared dev env coupling."),
    ("Contract tests against ZID API. ", "Pact or schema snapshots catch ZID changes before they reach prod."),
    ("Pre-book ZID partner support contact. ", "Direct escalation line for incidents and API questions."),
    ("Reserve 15% capacity for ZID quirks. ", "GCC commerce platforms have edge cases — VAT, address formats, name fields."),
]

MILESTONES = [
    ["ZID partner app + OAuth working", "W 2", "Sandbox transactions possible"],
    ["Catalog + inventory sync live", "W 6", "Cache mirrors ZID in real time"],
    ["Single-vendor checkout end-to-end", "W 10", "MVP backend launches private beta"],
    ["Multi-vendor split + payout ledger", "W 14", "Marketplace flow functional"],
    ["Gift AI + send-as-gift backend", "W 18", "Differentiators live"],
    ["V1 production launch", "W 22", "Public consumer launch alongside frontend"],
    ["V2 GCC expansion start", "W 26", "Second ZID region onboarded"],
]
