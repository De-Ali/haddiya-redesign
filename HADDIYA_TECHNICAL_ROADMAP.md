# Haddiya — Technical Development Roadmap

**Prepared for:** Executive Leadership, Investors, and Project Stakeholders
**Document version:** 1.0
**Date:** Q2 2026
**Prepared by:** Engineering & Product Delivery

---

## 1. Project Overview

### 1.1 Platform Description

Haddiya is a luxury multi-vendor gift e-commerce platform headquartered in the Sultanate of Oman. The platform unifies premium gifting categories — perfumes, fine jewelry, watches, flowers, handbags, heritage items, chocolates, and children's products — into a single mobile-first, bilingual (Arabic / English, RTL-aware) marketplace.

Haddiya differentiates itself from generic marketplaces by combining a glassmorphism luxury UI, an AI-powered Gift Assistant (audience → occasion → budget recommendation flow), curated send-as-gift workflows (message cards, scheduled delivery, gift wrapping), and a comprehensive vendor self-service portal.

### 1.2 Business Objectives

| # | Objective | KPI |
|---|-----------|-----|
| 1 | Capture share of GCC premium gifting market | GMV growth ≥ 20 % QoQ |
| 2 | Onboard curated vendor base | 150 vendors in Y1, 500 in Y2 |
| 3 | Drive repeat purchase via personalization | Repeat-buyer rate ≥ 35 % |
| 4 | Enable cross-border GCC delivery (UAE, KSA, Bahrain) by V2 | International GMV ≥ 25 % of total |
| 5 | Maintain luxury brand perception | NPS ≥ 60, app store rating ≥ 4.7 |

### 1.3 Target Users & Stakeholders

**Primary user segments**
- Affluent consumers (25–55 yrs) gifting for family, corporate, and social occasions.
- Expatriate professionals in GCC sending gifts to local recipients.
- SMB corporate buyers (bulk gifting for events, employee recognition).

**Vendor segment**
- Boutique luxury retailers, florists, perfumers, jewelers, artisanal producers.
- Single-vendor and multi-branch operations.

**Internal stakeholders**
- Platform Operations (catalog quality, vendor onboarding, dispute resolution).
- Marketing & Growth (campaigns, promo codes, segmentation).
- Finance (settlement, commission, payouts).
- Customer Success (order tracking, refunds, gift-card support).

### 1.4 Major System Components

```
┌─────────────────────────────────────────────────────────────────┐
│                       Consumer Channels                          │
│  iOS App  │  Android App  │  Mobile Web (PWA)  │  Desktop Web   │
└────────┬────────────────────────────────────────────────────────┘
         │
┌────────┴────────────────────────────────────────────────────────┐
│                    API Gateway / BFF Layer                       │
│       Auth · Rate-limiting · Localization · Routing              │
└────────┬────────────────────────────────────────────────────────┘
         │
┌────────┼─────────────────────────┬─────────────────┬───────────┐
│  Core Commerce Services          │  Vendor Portal  │ Admin CMS │
│  · Catalog        · Cart         │  · Onboarding   │ · Ops     │
│  · Pricing        · Checkout     │  · Inventory    │ · Catalog │
│  · Orders         · Payments     │  · Orders       │ · Reports │
│  · Wishlist       · Shipping     │  · Earnings     │ · Vendors │
└────────┬─────────────────────────┴─────────────────┴───────────┘
         │
┌────────┴────────────────────────────────────────────────────────┐
│                     Intelligence Layer                           │
│  Gift AI Assistant · Recommendations · Search Ranking · Promo   │
└────────┬────────────────────────────────────────────────────────┘
         │
┌────────┴────────────────────────────────────────────────────────┐
│                     Platform Foundation                          │
│  PostgreSQL · Redis · OpenSearch · S3 · SQS · CDN · WAF         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Development Timeframe Estimation

Estimates assume a dedicated, co-located product team with stable scope. All durations expressed in calendar weeks and months. Buffer (~15 %) included.

| Release | Scope | Weeks | Months | Notes |
|---------|-------|-------|--------|-------|
| **MVP** | Core consumer flow, single payment gateway, 1 language, basic vendor portal | 14–16 | **3.5–4** | Launch-ready in Oman, 20–30 pilot vendors |
| **V1 — Production-Ready** | Full bilingual, multi-payment, Gift AI v1, full vendor portal, admin CMS, push notifications | 26–30 | **6.5–7.5** | Public launch, full catalog, marketing-ready |
| **V2 — Enterprise-Scale** | Multi-country (GCC), advanced AI personalization, loyalty/points, B2B corporate gifting, analytics, multi-warehouse | 44–52 | **11–13** | Regional expansion, enterprise SLAs |

**Total cumulative duration (sequential):** ~52 weeks / 12–13 months.
**Recommended parallelization:** MVP → V1 overlap saves 6–8 weeks. End-to-end calendar with overlap: **~10–11 months to V2-ready state.**

---

## 3. Team Composition

### 3.1 Recommended Team (V1 Production Build)

| Role | Headcount | Engagement | Duration | Notes |
|------|-----------|------------|----------|-------|
| Product Manager / Product Owner | 1 | Full-time | Full project | Roadmap, vendor liaison, prioritization |
| Project Manager / Scrum Master | 1 | Full-time | Full project | Ceremonies, delivery, risk register |
| UX Researcher | 1 | Part-time (50 %) | Phases 1–2, spot-check thereafter | Bilingual user testing |
| UI/UX Designer | 2 | Full-time | Phases 1–4, then part-time | One lead, one product designer |
| Frontend Engineers (Web) | 2 | Full-time | Phases 3–7 | React/Next.js, RTL/i18n expertise |
| Mobile Engineers | 2 | Full-time | Phases 3–7 | React Native or native iOS + Android |
| Backend Engineers | 3 | Full-time | Phases 3–7 | Node.js / NestJS or Go, microservice-friendly |
| AI/ML Engineer | 1 | Full-time during Phase 5, part-time afterwards | Months 4–8 | Gift Assistant, ranking, embeddings |
| DevOps / Platform Engineer | 1 | Full-time | Phases 3–7 | IaC, CI/CD, observability |
| QA Lead | 1 | Full-time | Phases 4–7 | Test strategy, automation framework |
| QA Engineers | 2 | Full-time | Phases 5–7 | Manual + Playwright, bilingual coverage |
| Security Engineer | 1 | Part-time (40 %) | From Phase 3 | Pen testing, OWASP, PCI scoping |
| **Total active FTEs (peak)** | **~15** | | | Plus 1 PM / 1 PO / 1 Sec part-time |

### 3.2 Lean MVP Team Variant

| Role | Headcount | Engagement |
|------|-----------|------------|
| Product Owner / PM (dual-hat) | 1 | Full-time |
| UI/UX Designer | 1 | Full-time |
| Full-stack Engineers | 3 | Full-time |
| Mobile Engineer | 1 | Full-time |
| QA Engineer | 1 | Full-time |
| DevOps (shared / fractional) | 1 | Part-time (40 %) |
| **Total** | **~7** | |

### 3.3 Enterprise V2 Team Variant

Scale to **~22–25 FTEs**: add a second AI engineer, data engineer, SRE, customer success engineer, dedicated mobile pod per platform (iOS + Android native), and an analytics engineer.

---

## 4. Module-wise Breakdown

Effort expressed in person-weeks (PW). Complexity reflects technical risk, not size alone.

| # | Module | Description | Complexity | Dependencies | Effort (PW) | Required Resources |
|---|--------|-------------|------------|--------------|-------------|--------------------|
| 1 | Authentication & Authorization | Email/password, phone+OTP (WhatsApp), Apple, Google. RBAC: customer, vendor, admin, ops. | High | — | 10 | 1 BE, 1 FE, 1 Sec |
| 2 | User Management & Profiles | Profile, addresses, preferences, language, GDPR controls. | Medium | Auth | 6 | 1 BE, 1 FE |
| 3 | Vendor Onboarding & Management | KYC document upload, approval workflow, store config, payout setup. | High | Auth, Document Mgmt | 14 | 1 BE, 1 FE, ops review |
| 4 | Catalog Management | Multi-vendor product CRUD, variants (color/size/scent), media, attribute taxonomy, bilingual content. | High | Vendor Mgmt | 16 | 1.5 BE, 1 FE |
| 5 | Inventory & Stock Management | Per-SKU, per-warehouse stock, reservations, low-stock alerts. | Medium | Catalog | 8 | 1 BE |
| 6 | Search & Filtering | OpenSearch index, faceted filters, typo tolerance, bilingual relevance, autocomplete. | High | Catalog | 10 | 1 BE, AI input |
| 7 | Cart & Wishlist | Persistent cart per user, vendor grouping, guest cart merge, wishlist sync. | Medium | Catalog, Auth | 6 | 1 BE, 1 FE, 1 Mobile |
| 8 | Checkout & Order Orchestration | Multi-step (address, schedule, payment, review), split-vendor orders, gift wrapping, message cards, scheduled delivery. | High | Cart, Payments, Shipping | 14 | 1.5 BE, 1 FE, 1 Mobile |
| 9 | Payment Integration | Thawani / Tap / PayTabs (local), Apple Pay, COD. Tokenization, 3DS, refunds, split payouts. | High | Checkout, Compliance | 12 | 1 BE, 1 Sec |
| 10 | Shipping & Delivery Scheduling | Carrier integration (Aramex / local), zone management, scheduled delivery windows, tracking webhooks. | High | Checkout | 10 | 1 BE |
| 11 | Promotions & Coupons | Coupon engine, stacking rules, vendor vs platform promos, scheduled campaigns. | Medium | Checkout | 6 | 1 BE, 1 FE |
| 12 | Notifications | Push (FCM/APNs), in-app, transactional email (SES/SendGrid), WhatsApp Business templates. | Medium | Auth, Orders | 8 | 1 BE, 1 Mobile |
| 13 | Gift AI Assistant | Guided flow (gender → age → budget → occasion → recommendations). LLM + product embedding hybrid ranking. | High | Catalog, Search | 12 | 1 AI/ML, 1 BE |
| 14 | Recommendation Engine | Collaborative filtering, "frequently bought together", category affinity. | High | Catalog, Orders | 10 | 1 AI/ML, 1 BE |
| 15 | Vendor Portal | Dashboard, products, orders, earnings, payouts, analytics. | High | Vendor Mgmt, Catalog | 18 | 1 BE, 1.5 FE |
| 16 | Admin / Ops Panel (CMS) | Vendor approvals, content moderation, banners, categories, dispute mgmt, refunds. | High | All core modules | 16 | 1 BE, 1 FE |
| 17 | Reporting & Analytics | GMV, AOV, vendor performance, cohort retention, funnel. Data warehouse + dashboards. | High | All transactional modules | 12 | 1 Data, 1 BE |
| 18 | Document Management | Vendor KYC, invoices, gift card designs, secure S3 storage with signed URLs. | Medium | Auth | 5 | 1 BE |
| 19 | Loyalty & Points | Points ledger, earn/redeem rules, tiering. | Medium | Orders, Payments | 8 | 1 BE, 1 FE |
| 20 | Customer Support & Disputes | Ticket flow, chat handoff (Zendesk/Intercom), refund processing. | Medium | Orders | 6 | 1 BE, 1 FE |
| 21 | Mobile Apps (iOS + Android) | Native shell or RN-shared, deep-linking, biometrics, push, offline cart. | High | All consumer APIs | 24 | 2 Mobile |
| 22 | Security & Compliance | OWASP, PCI scope reduction, GDPR + Oman PDPL, WAF rules, rate-limiting, secrets mgmt. | High | Cross-cutting | 10 (continuous) | 1 Sec, DevOps |
| 23 | DevOps & Platform | IaC (Terraform), CI/CD, environments, observability, on-call. | High | Cross-cutting | 14 | 1 DevOps |
| **Total** | | | | | **~253 PW** | |

---

## 5. Phase-wise Delivery Plan

### Phase 1 — Discovery & Planning · *Weeks 1–3*
- Stakeholder interviews, vendor persona workshops.
- Detailed functional + non-functional requirements register.
- Information architecture, ERD, service decomposition map.
- Cloud region & vendor selection (AWS me-central-1 / Bahrain).
- Compliance scoping: Oman PDPL, PCI-DSS SAQ scope, VAT rules.
- **Deliverables:** PRD, system architecture doc, ADRs (Architecture Decision Records), initial Jira backlog.

### Phase 2 — UI/UX Design · *Weeks 2–6 (overlapping Phase 1)*
- User research with 6–10 Omani consumers + 4–6 vendors.
- Wireframes → design system (typography, spacing, glassmorphism tokens, RTL pairs) → high-fidelity Figma screens.
- Interaction prototypes for checkout, Gift AI, send-as-gift.
- Accessibility audit (WCAG 2.2 AA targets).
- **Deliverables:** Figma library, design tokens JSON, motion specs, Lottie assets.

### Phase 3 — Backend Development · *Weeks 4–18*
- Postgres schema implementation, migrations (Flyway / Prisma Migrate).
- Service skeletons: auth, catalog, cart, order, payment, vendor.
- API contracts (OpenAPI 3.1), generated clients for FE/Mobile.
- Background workers (BullMQ / SQS) for emails, inventory updates, payouts.
- Integration with Thawani sandbox, Aramex test API.
- **Deliverables:** Versioned APIs, contract tests, seed data, staging env.

### Phase 4 — Frontend & Mobile Development · *Weeks 8–22*
- Component library on top of design system (Storybook).
- Web app (Next.js 14, App Router), PWA shell.
- Mobile app (RN with native modules, or fully native if budget allows).
- State management (TanStack Query + Zustand).
- i18n with full RTL support, locale-aware formatting (currency OMR, dates).
- **Deliverables:** Browsable web app + signed iOS/Android beta builds.

### Phase 5 — AI & Automation · *Weeks 14–24*
- Product embedding pipeline (OpenAI / Cohere embeddings → pgvector).
- Gift Assistant conversational flow with structured-output guarantees.
- Recommendation API: hybrid CF + content + business-rule boost.
- Promo automation: scheduled campaigns, expiring-cart nudges.
- Vendor inventory anomaly detection.
- **Deliverables:** AI service API, evaluation harness, A/B harness.

### Phase 6 — Testing & QA · *Weeks 16–28 (continuous)*
- Unit tests: ≥ 70 % coverage critical paths.
- Integration tests: Postman / Pact contract tests across services.
- E2E: Playwright (web) + Detox (mobile) for top 25 user journeys.
- Bilingual QA matrix (LTR + RTL × iOS + Android × Arabic + English).
- Performance: k6 load testing 5× expected peak.
- Security: SAST (Semgrep), DAST (ZAP), third-party pen test.
- UAT with pilot vendor cohort.
- **Deliverables:** Test reports, defect closure log, sign-off documents.

### Phase 7 — Deployment & DevOps · *Weeks 18–30 (continuous, hardened pre-launch)*
- IaC: Terraform modules per environment (dev, staging, prod).
- CI/CD: GitHub Actions → ECR → ECS Fargate / EKS, blue-green deploys.
- Observability stack: CloudWatch + Datadog or Grafana Cloud, OpenTelemetry traces.
- Logging: structured JSON to OpenSearch, retention policies.
- Backups: PITR for RDS, daily S3 versioning, cross-region replication for V2.
- Incident response runbooks, on-call rotation, status page.
- **Deliverables:** Production environment, runbooks, DR drill report.

---

## 6. Technical Architecture Recommendations

| Layer | Recommendation | Rationale |
|-------|----------------|-----------|
| **Frontend (Web)** | Next.js 14 (App Router) + TypeScript + Tailwind v4 + Framer Motion | SSR/ISR for SEO, mature i18n + RTL, existing prototype foundation |
| **Mobile** | React Native (Expo bare workflow) shared codebase, native modules for biometrics/Apple Pay | Single team, ~80 % code reuse, faster iteration. Switch to native Swift/Kotlin only if performance demands |
| **Backend** | Node.js (NestJS, TypeScript) microservices, or Go for hot paths (search, payment) | Type safety across stack, large hiring pool, fast iteration |
| **API Gateway / BFF** | AWS API Gateway + GraphQL BFF (Apollo) or REST + tRPC for internal | Tailors payloads per channel, simplifies mobile/web divergence |
| **Database** | PostgreSQL 16 on Amazon RDS (multi-AZ). pgvector for embeddings. | ACID for orders/payments, JSON for flexible product attributes, pgvector avoids second DB |
| **Caching** | Redis (ElastiCache) — sessions, cart, hot product, rate-limit tokens | Sub-ms latency, mature ecosystem |
| **Search** | OpenSearch (managed) with bilingual analyzers (Arabic + English ICU) | Faceted search, typo tolerance, RTL token handling |
| **Queue / Events** | Amazon SQS + EventBridge, optional Kafka in V2 for streaming analytics | Decouples checkout, notifications, payouts |
| **Object Storage** | Amazon S3 + CloudFront CDN | Product images, KYC docs, gift card art, signed URLs |
| **Cloud Infrastructure** | AWS me-central-1 (UAE) primary, eu-south-1 (Milan) DR. ECS Fargate or EKS. | Data residency for PDPL, low latency to Oman users |
| **CDN & Edge** | CloudFront + Lambda@Edge for locale rewrites | Image optimization, Arabic font subsetting |
| **Identity** | AWS Cognito or Auth0; WhatsApp Business API for OTP | Offload undifferentiated auth heavy-lifting |
| **Payments** | Thawani (primary OMR), Tap, Apple Pay, COD. Stripe Connect-style ledger for vendor payouts | Local rails first, international expansion later |
| **Monitoring & Observability** | Datadog (APM + logs + RUM) or Grafana Cloud (Loki + Tempo + Mimir) | Full-stack visibility, on-call efficiency |
| **Error Tracking** | Sentry (web + mobile + backend) | First-class RN + Next.js integration |
| **Feature Flags** | LaunchDarkly or open-source Unleash | Safe rollouts, vendor-segment targeting |
| **Analytics** | Segment → Snowflake/BigQuery → Looker / Metabase | Vendor self-serve dashboards, cohort analysis |
| **Secrets** | AWS Secrets Manager + Parameter Store, never `.env` in repo | Rotation, audit logging |
| **WAF / Security** | AWS WAF + Shield, Cloudflare optional, OWASP CRS rules | Bot protection, DDoS, OWASP top-10 mitigation |

---

## 7. Resource Cost Estimation

Figures in **USD**, blended monthly fully-loaded rates (salary + benefits + overhead). Geography-adjusted for regional realism. Infrastructure costs estimated at steady-state production.

### 7.1 Small Startup Team (Lean MVP)

| Item | Headcount | Monthly Cost | Duration | Subtotal |
|------|-----------|--------------|----------|----------|
| Dual-hat PM / PO | 1 | $5,000 | 4 mo | $20,000 |
| UI/UX Designer | 1 | $4,500 | 4 mo | $18,000 |
| Full-stack Engineers | 3 | $5,500 × 3 = $16,500 | 4 mo | $66,000 |
| Mobile Engineer | 1 | $5,500 | 4 mo | $22,000 |
| QA Engineer | 1 | $3,500 | 3 mo | $10,500 |
| DevOps (fractional) | 0.4 | $2,800 | 4 mo | $11,200 |
| **People subtotal** | | | | **$147,700** |
| Infrastructure (AWS, SaaS) | | $1,200 | 4 mo | $4,800 |
| Licenses, design tools, third-party APIs | | $700 | 4 mo | $2,800 |
| Contingency (15 %) | | | | $23,300 |
| **MVP total** | | | | **≈ $178,600** |

### 7.2 Mid-size Agency Team (V1 Production)

| Item | Headcount | Monthly Cost | Duration | Subtotal |
|------|-----------|--------------|----------|----------|
| PM + PO | 2 | $11,000 | 7 mo | $77,000 |
| Designers + UX Researcher | 2.5 | $11,500 | 7 mo | $80,500 |
| Frontend Engineers | 2 | $13,000 | 7 mo | $91,000 |
| Mobile Engineers | 2 | $13,000 | 7 mo | $91,000 |
| Backend Engineers | 3 | $19,500 | 7 mo | $136,500 |
| AI/ML Engineer | 1 | $7,500 | 5 mo | $37,500 |
| DevOps | 1 | $7,000 | 7 mo | $49,000 |
| QA (Lead + 2) | 3 | $14,500 | 6 mo | $87,000 |
| Security (part-time) | 0.4 | $3,200 | 6 mo | $19,200 |
| **People subtotal** | | | | **$668,700** |
| Infrastructure (AWS, search, SaaS) | | $3,500 | 7 mo | $24,500 |
| Third-party services (payments, WhatsApp, AI APIs) | | $2,500 | 7 mo | $17,500 |
| Penetration test, compliance audit | | | | $25,000 |
| Contingency (15 %) | | | | $110,400 |
| **V1 total** | | | | **≈ $846,100** |

### 7.3 Enterprise Team (V2 Scale)

| Item | Headcount | Monthly Cost | Duration | Subtotal |
|------|-----------|--------------|----------|----------|
| Leadership (CTO/VP Eng, PM, PO, Design Director) | 4 | $35,000 | 13 mo | $455,000 |
| Engineering (FE × 3, BE × 5, Mobile × 4, AI × 2, Data × 2, SRE × 2) | 18 | $135,000 | 13 mo | $1,755,000 |
| QA (Lead + 4) | 5 | $25,000 | 13 mo | $325,000 |
| Security (full-time + audits) | 1 | $9,500 | 13 mo | $123,500 |
| DevOps / Platform | 2 | $15,000 | 13 mo | $195,000 |
| **People subtotal** | | | | **$2,853,500** |
| Infrastructure (multi-region, HA) | | $12,000 | 13 mo | $156,000 |
| Third-party + AI API spend | | $9,000 | 13 mo | $117,000 |
| Compliance, pen tests, certifications (PCI, ISO 27001 prep) | | | | $120,000 |
| Contingency (15 %) | | | | $487,000 |
| **V2 total** | | | | **≈ $3,733,500** |

### 7.4 Summary

| Tier | Duration | Total Investment |
|------|----------|------------------|
| Lean MVP | 4 months | **$170–185 K** |
| V1 Production | 7 months | **$820–880 K** |
| V2 Enterprise | 13 months | **$3.6–3.9 M** |

---

## 8. Risk Analysis

### 8.1 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| RTL/Arabic edge cases in third-party libs | High | Medium | Bilingual QA matrix from sprint 1, dedicated RTL component reviews |
| Multi-vendor order split & partial-fulfillment complexity | High | High | Domain-driven design, saga pattern for orders, comprehensive contract tests |
| Payment gateway certification timelines (Thawani / Tap) | Medium | High | Begin integration & paperwork in Phase 1, sandbox-first, fallback to COD launch path |
| Mobile app store review delays (Apple) | Medium | Medium | Beta via TestFlight early, MetaData hygiene, screenshot pre-clearance |
| AI hallucinations / off-brand recommendations | Medium | Medium | Constrained generation, allow-list catalog grounding, human-in-loop curation |

### 8.2 Scalability Concerns

| Concern | Trigger Point | Mitigation |
|---------|---------------|------------|
| Database write contention on order spikes (Eid, Mother's Day) | > 100 orders/min | Read replicas, write sharding by vendor, idempotent order intake, queue-back-pressure |
| Search index latency under filter-heavy traffic | Catalog > 50K SKUs | OpenSearch capacity planning, query caching, denormalized facet store |
| Mobile push fan-out (campaigns) | > 100K devices | SQS-backed batch send, FCM/APNs rate-aware workers |
| Image bandwidth costs | High mobile traffic | Adaptive image CDN (CloudFront + Lambda@Edge), AVIF/WebP, responsive sizes |
| Vendor catalog import bursts | New vendor cohort onboarding | Async import pipeline with progress tracking, validation queue |

### 8.3 Security Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| PII exposure (Oman PDPL, GDPR) | Critical | Encryption at rest (KMS), in transit (TLS 1.3), field-level encryption for sensitive PII, audit logging |
| Payment data scope | Critical | Tokenization via PSP, no PAN storage, SAQ-A scope where possible |
| Account takeover (credential stuffing) | High | Rate limiting, device fingerprinting, MFA for vendors/admins, breached-password check |
| Vendor portal privilege escalation | High | Strict RBAC, per-vendor data isolation tests, tenant scoping in every query |
| Supply-chain (npm/PyPI) attacks | Medium | Dependabot, SBOM (CycloneDX), Snyk/Socket monitoring, signed images |
| Document upload abuse (malware in KYC) | Medium | Antivirus scan (ClamAV/Lambda), file-type validation, S3 isolation bucket |

### 8.4 Performance Bottlenecks

| Bottleneck | Symptom | Fix |
|------------|---------|-----|
| N+1 queries on product listing | Slow category pages | DataLoader / batched joins, denormalized read models |
| Cold-start on serverless functions | First-request latency | Provisioned concurrency for hot endpoints, or container-based ECS |
| Cart recomputation per render (mobile) | Janky cart UI | Memoized totals, optimistic updates, debounced sync |
| Large bundle on web (Framer Motion + i18n) | Slow LCP on 3G | Code-splitting, dynamic imports, Brotli, route-level prefetch |
| Synchronous payout calculations | Slow checkout confirmation | Async settlement, eventual ledger reconciliation |

---

## 9. Final Recommendation

### 9.1 Ideal Team Size

**Recommended:** **13–15 FTE for V1**, scaling to 22–25 for V2.
- Sweet spot balances velocity vs. coordination overhead.
- Two-pizza pods: Consumer Web/Mobile pod, Vendor Portal + Admin pod, Platform/AI pod.

### 9.2 Best Timeline for Delivery

**Recommended sequence (parallelized):**

| Milestone | Calendar Week | Outcome |
|-----------|---------------|---------|
| Kickoff + Discovery | W 0–3 | PRD, architecture frozen |
| Design + Backend foundations begin | W 4 | Figma library v1, API contracts |
| MVP private beta | W 16 | Pilot vendors transacting |
| V1 public launch (Oman) | W 30 | Marketing-ready, app stores live |
| V2 GCC expansion | W 52 | UAE, KSA, Bahrain coverage |

**Total: ~12 months from kickoff to V2-ready state with overlap.**

### 9.3 MVP Feature Set (Ship First)

**Must-have (in MVP):**
- Auth: phone+OTP, social login.
- Bilingual catalog (Arabic + English) with categories, search.
- Cart, wishlist, single-vendor + multi-vendor checkout.
- Address book, delivery scheduling (date + time slot).
- Single payment gateway (Thawani) + COD.
- Send-as-gift: message card, scheduled delivery, recipient details.
- Vendor portal: onboarding, product CRUD, order list, basic earnings.
- Order tracking, push + in-app notifications.
- Admin: vendor approvals, basic catalog moderation.
- Promo code engine (single-stack coupons).

### 9.4 Defer to V1 / V2

**Defer to V1:**
- Full Gift AI Assistant (rule-based simple version in MVP, LLM-powered in V1).
- Loyalty / points ledger.
- Advanced analytics dashboards.
- Recommendation engine v1.
- WhatsApp Business notifications.
- Multi-payment gateway redundancy.

**Defer to V2:**
- Multi-country expansion (UAE, KSA, Bahrain) with multi-currency, multi-warehouse.
- B2B corporate gifting portal (bulk orders, invoicing, custom branding).
- Subscription gifting / recurring deliveries.
- Advanced personalization with ML-driven home feeds.
- Vendor mobile app.
- Marketplace ads / sponsored placement.
- Live chat / video consultations with vendors.

### 9.5 Fastest Realistic Approach Without Quality Compromise

1. **Freeze MVP scope hard.** No additions without scope-swap. Use feature flags so half-done work doesn't block release.
2. **Parallelize Phase 2 (design) with Phase 3 (backend foundations).** Lose 4–6 weeks of calendar time.
3. **Adopt a monolith-modular backend first** (NestJS modules), extract microservices only when scaling forces it. Avoids premature distributed-systems tax.
4. **Use React Native** with high code reuse instead of dual native apps — saves ~3 months and 1.5 FTE.
5. **Buy, don't build, undifferentiated components:** Auth0/Cognito for identity, OpenSearch managed, Sentry for errors, Datadog for observability, Algolia or OpenSearch for search.
6. **Continuous deployment from day one.** Every PR deployable to staging; production deploys daily once V1 stabilizes.
7. **Vendor pilot cohort (10–15 vendors) running on MVP** while V1 features land — real-world feedback loop accelerates priority calibration.
8. **Dedicated bilingual QA from Phase 4.** Arabic/RTL bugs caught early cost 10× less than post-launch.
9. **Pre-book the third-party penetration test** at Week 24 so security findings land before public launch.
10. **Reserve 15 % capacity for unplanned work** — vendor requests, regulatory clarifications, payment gateway quirks. Past projects in this domain consistently consume this buffer.

**Bottom line:** A focused team of ~14 engineers + designers + PM delivers production-ready V1 in **~7 months** for ~**$850K**, with a clear runway to enterprise V2 over the following 6 months at ~$2.9M incremental investment.

---

*Document prepared for executive review. Detailed sprint-level backlog, capacity plan, and risk register available as appendices upon request.*
