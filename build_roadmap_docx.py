"""Build polished Haddiya Technical Roadmap DOCX from scratch.
Branded maroon/gold luxury theme, cover page, structured headings, tables.
"""
import os
from datetime import datetime
from docx import Document
from docx.shared import Pt, Cm, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.enum.table import WD_ALIGN_VERTICAL, WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn, nsmap
from docx.oxml import OxmlElement

# ── Brand palette ──
MAROON = RGBColor(0x7A, 0x1E, 0x2B)
MAROON_DARK = RGBColor(0x5A, 0x15, 0x20)
GOLD = RGBColor(0xD4, 0xAF, 0x37)
INK = RGBColor(0x1C, 0x1C, 0x1E)
MUTED = RGBColor(0x8E, 0x8E, 0x93)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
LIGHT_BG = "FAF8F5"
HEADER_BG = "7A1E2B"
ALT_ROW = "F5F0EA"

doc = Document()

# Page setup — A4, 2cm margins
section = doc.sections[0]
section.page_width = Cm(21.0)
section.page_height = Cm(29.7)
section.top_margin = Cm(2.0)
section.bottom_margin = Cm(2.0)
section.left_margin = Cm(2.0)
section.right_margin = Cm(2.0)

# Default style
normal = doc.styles['Normal']
normal.font.name = 'Calibri'
normal.font.size = Pt(11)
normal.font.color.rgb = INK

# Heading styles
def style_heading(level, size, color, bold=True, space_before=12, space_after=6):
    s = doc.styles[f'Heading {level}']
    s.font.name = 'Calibri'
    s.font.size = Pt(size)
    s.font.color.rgb = color
    s.font.bold = bold
    s.paragraph_format.space_before = Pt(space_before)
    s.paragraph_format.space_after = Pt(space_after)
    s.paragraph_format.keep_with_next = True

style_heading(1, 22, MAROON, space_before=20, space_after=10)
style_heading(2, 16, MAROON_DARK, space_before=14, space_after=6)
style_heading(3, 13, INK, space_before=10, space_after=4)

# ─────────────────────────────── helpers ───────────────────────────────

def set_cell_shading(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_color)
    tcPr.append(shd)

def set_cell_borders(cell, color="CCCCCC", size="4"):
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = OxmlElement('w:tcBorders')
    for edge in ('top','left','bottom','right'):
        b = OxmlElement(f'w:{edge}')
        b.set(qn('w:val'), 'single')
        b.set(qn('w:sz'), size)
        b.set(qn('w:color'), color)
        tcBorders.append(b)
    tcPr.append(tcBorders)

def add_para(text, bold=False, italic=False, size=11, color=INK, align=None, space_after=4):
    p = doc.add_paragraph()
    if align is not None:
        p.alignment = align
    r = p.add_run(text)
    r.font.name = 'Calibri'
    r.font.size = Pt(size)
    r.font.color.rgb = color
    r.bold = bold
    r.italic = italic
    p.paragraph_format.space_after = Pt(space_after)
    return p

def add_bullets(items, indent=0.5):
    for item in items:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.left_indent = Cm(indent)
        p.paragraph_format.space_after = Pt(2)
        if isinstance(item, tuple):
            label, rest = item
            r1 = p.add_run(label)
            r1.bold = True
            p.add_run(rest)
        else:
            p.add_run(item)

def add_table(headers, rows, col_widths=None, banded=True):
    """Create branded table with maroon header, alt-row banding, gray borders."""
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False

    if col_widths:
        # col_widths in cm
        for i, w in enumerate(col_widths):
            for row in table.rows:
                row.cells[i].width = Cm(w)

    # Header row
    hdr = table.rows[0].cells
    for i, h in enumerate(headers):
        hdr[i].text = ''
        set_cell_shading(hdr[i], HEADER_BG)
        set_cell_borders(hdr[i])
        p = hdr[i].paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        r = p.add_run(h)
        r.bold = True
        r.font.color.rgb = WHITE
        r.font.size = Pt(10.5)
        r.font.name = 'Calibri'
        hdr[i].vertical_alignment = WD_ALIGN_VERTICAL.CENTER

    # Body rows
    for ri, row in enumerate(rows):
        cells = table.rows[ri + 1].cells
        for ci, val in enumerate(row):
            cells[ci].text = ''
            set_cell_borders(cells[ci])
            if banded and ri % 2 == 1:
                set_cell_shading(cells[ci], ALT_ROW)
            p = cells[ci].paragraphs[0]
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(2)
            r = p.add_run(str(val))
            r.font.size = Pt(10)
            r.font.name = 'Calibri'
            r.font.color.rgb = INK
            cells[ci].vertical_alignment = WD_ALIGN_VERTICAL.CENTER
    return table

def page_break():
    doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)

def divider():
    p = doc.add_paragraph()
    pPr = p._p.get_or_add_pPr()
    pBdr = OxmlElement('w:pBdr')
    bottom = OxmlElement('w:bottom')
    bottom.set(qn('w:val'), 'single')
    bottom.set(qn('w:sz'), '6')
    bottom.set(qn('w:space'), '1')
    bottom.set(qn('w:color'), 'D4AF37')
    pBdr.append(bottom)
    pPr.append(pBdr)

# ═══════════════════════ COVER PAGE ═══════════════════════
for _ in range(3):
    doc.add_paragraph()

# Brand badge
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run('HADDIYA')
r.font.size = Pt(48)
r.font.name = 'Calibri'
r.font.color.rgb = MAROON
r.bold = True

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run('LUXURY GIFT MARKETPLACE · OMAN')
r.font.size = Pt(11)
r.font.color.rgb = GOLD
r.bold = True
r.font.name = 'Calibri'

doc.add_paragraph()
divider()
doc.add_paragraph()

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run('Technical Development Roadmap')
r.font.size = Pt(28)
r.font.color.rgb = INK
r.bold = True
r.font.name = 'Calibri'

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run('Engineering & Product Delivery Plan')
r.font.size = Pt(13)
r.font.color.rgb = MUTED
r.italic = True

for _ in range(4):
    doc.add_paragraph()

# Meta box
meta_table = doc.add_table(rows=4, cols=2)
meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
meta_rows = [
    ('Prepared for', 'Executive Leadership, Investors, Stakeholders'),
    ('Document version', '1.0'),
    ('Date', datetime.now().strftime('%B %Y')),
    ('Prepared by', 'Engineering & Product Delivery'),
]
for i, (k, v) in enumerate(meta_rows):
    c0, c1 = meta_table.rows[i].cells
    c0.text = ''
    c1.text = ''
    set_cell_shading(c0, ALT_ROW)
    p = c0.paragraphs[0]
    r = p.add_run(k)
    r.bold = True
    r.font.size = Pt(10)
    r.font.color.rgb = MAROON
    p = c1.paragraphs[0]
    r = p.add_run(v)
    r.font.size = Pt(10)
    r.font.color.rgb = INK
    c0.width = Cm(5)
    c1.width = Cm(10)

page_break()

# ═══════════════════════ TABLE OF CONTENTS ═══════════════════════
doc.add_heading('Table of Contents', level=1)
toc_items = [
    '1. Project Overview',
    '2. Development Timeframe Estimation',
    '3. Team Composition',
    '4. Module-wise Breakdown',
    '5. Phase-wise Delivery Plan',
    '6. Technical Architecture Recommendations',
    '7. Timeframe & Team Size Summary',
    '8. Risk Analysis',
    '9. Final Recommendation',
]
for item in toc_items:
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run(item)
    r.font.size = Pt(12)
    r.font.color.rgb = INK
page_break()

# ═══════════════════════ 1. PROJECT OVERVIEW ═══════════════════════
doc.add_heading('1. Project Overview', level=1)

doc.add_heading('1.1 Platform Description', level=2)
add_para(
    'Haddiya is a luxury multi-vendor gift e-commerce platform headquartered in the Sultanate of Oman. '
    'The platform unifies premium gifting categories — perfumes, fine jewelry, watches, flowers, handbags, '
    'heritage items, chocolates, and children’s products — into a single mobile-first, bilingual '
    '(Arabic / English, RTL-aware) marketplace.'
)
add_para(
    'Haddiya differentiates itself from generic marketplaces by combining a glassmorphism luxury UI, an '
    'AI-powered Gift Assistant (audience → occasion → budget recommendation flow), curated send-as-gift '
    'workflows (message cards, scheduled delivery, gift wrapping), and a comprehensive vendor self-service portal.'
)

doc.add_heading('1.2 Business Objectives', level=2)
add_table(
    ['#', 'Objective', 'KPI'],
    [
        ['1', 'Capture share of GCC premium gifting market', 'GMV growth ≥ 20% QoQ'],
        ['2', 'Onboard curated vendor base', '150 vendors Y1, 500 Y2'],
        ['3', 'Drive repeat purchase via personalization', 'Repeat-buyer rate ≥ 35%'],
        ['4', 'Enable cross-border GCC delivery by V2', 'International GMV ≥ 25%'],
        ['5', 'Maintain luxury brand perception', 'NPS ≥ 60, app rating ≥ 4.7'],
    ],
    col_widths=[1.2, 8, 6.5],
)

doc.add_heading('1.3 Target Users & Stakeholders', level=2)
add_para('Primary user segments', bold=True, color=MAROON, size=11)
add_bullets([
    'Affluent consumers (25–55 yrs) gifting for family, corporate, social occasions.',
    'Expatriate professionals in GCC sending gifts to local recipients.',
    'SMB corporate buyers (bulk gifting for events, employee recognition).',
])
add_para('Vendor segment', bold=True, color=MAROON, size=11)
add_bullets([
    'Boutique luxury retailers, florists, perfumers, jewelers, artisanal producers.',
    'Single-vendor and multi-branch operations.',
])
add_para('Internal stakeholders', bold=True, color=MAROON, size=11)
add_bullets([
    'Platform Operations (catalog quality, vendor onboarding, dispute resolution).',
    'Marketing & Growth (campaigns, promo codes, segmentation).',
    'Finance (settlement, commission, payouts).',
    'Customer Success (order tracking, refunds, gift-card support).',
])

doc.add_heading('1.4 Major System Components', level=2)
add_table(
    ['Layer', 'Components'],
    [
        ['Consumer Channels', 'iOS App, Android App, Mobile Web (PWA), Desktop Web'],
        ['API Gateway / BFF', 'Auth, rate-limiting, localization, routing'],
        ['Core Commerce', 'Catalog, cart, pricing, orders, payments, shipping, wishlist, checkout'],
        ['Vendor Portal', 'Onboarding, inventory, orders, earnings'],
        ['Admin CMS', 'Ops, catalog moderation, reports, vendor management'],
        ['Intelligence Layer', 'Gift AI Assistant, recommendations, search ranking, promotion engine'],
        ['Platform Foundation', 'PostgreSQL, Redis, OpenSearch, S3, SQS, CDN, WAF'],
    ],
    col_widths=[4, 11.7],
)
page_break()

# ═══════════════════════ 2. TIMEFRAME ═══════════════════════
doc.add_heading('2. Development Timeframe Estimation', level=1)
add_para(
    'Estimates assume a dedicated, co-located product team with stable scope. All durations expressed in calendar weeks and months. Buffer (~15%) included.'
)
add_table(
    ['Release', 'Scope', 'Weeks', 'Months', 'Notes'],
    [
        ['MVP', 'Core consumer flow, single payment gateway, 1 language, basic vendor portal', '14–16', '3.5–4', 'Launch-ready in Oman, 20–30 pilot vendors'],
        ['V1 Production', 'Full bilingual, multi-payment, Gift AI v1, vendor portal, admin CMS, push', '26–30', '6.5–7.5', 'Public launch, marketing-ready'],
        ['V2 Enterprise', 'Multi-country GCC, advanced AI, loyalty, B2B gifting, analytics, multi-warehouse', '44–52', '11–13', 'Regional expansion, enterprise SLAs'],
    ],
    col_widths=[2.5, 6, 1.5, 1.7, 4],
)
doc.add_paragraph()
add_para('Total cumulative duration (sequential): ~52 weeks / 12–13 months.', bold=True)
add_para('Recommended parallelization: MVP → V1 overlap saves 6–8 weeks.', italic=True, color=MUTED)
add_para('End-to-end calendar with overlap: ~10–11 months to V2-ready state.', italic=True, color=MUTED)
page_break()

# ═══════════════════════ 3. TEAM ═══════════════════════
doc.add_heading('3. Team Composition', level=1)

doc.add_heading('3.1 Recommended Team (V1 Production Build)', level=2)
add_table(
    ['Role', 'HC', 'Engagement', 'Duration', 'Notes'],
    [
        ['Product Manager / Product Owner', '1', 'Full-time', 'Full project', 'Roadmap, vendor liaison, prioritization'],
        ['Project Manager / Scrum Master', '1', 'Full-time', 'Full project', 'Ceremonies, delivery, risk register'],
        ['UX Researcher', '1', 'Part-time (50%)', 'Phases 1–2', 'Bilingual user testing'],
        ['UI/UX Designer', '2', 'Full-time', 'Phases 1–4', 'One lead, one product designer'],
        ['Frontend Engineers (Web)', '2', 'Full-time', 'Phases 3–7', 'React/Next.js, RTL/i18n expertise'],
        ['Mobile Engineers', '2', 'Full-time', 'Phases 3–7', 'React Native or native iOS + Android'],
        ['Backend Engineers', '3', 'Full-time', 'Phases 3–7', 'Node.js/NestJS or Go, microservice-friendly'],
        ['AI/ML Engineer', '1', 'Full-time Ph5, part later', 'Months 4–8', 'Gift Assistant, ranking, embeddings'],
        ['DevOps / Platform', '1', 'Full-time', 'Phases 3–7', 'IaC, CI/CD, observability'],
        ['QA Lead', '1', 'Full-time', 'Phases 4–7', 'Test strategy, automation framework'],
        ['QA Engineers', '2', 'Full-time', 'Phases 5–7', 'Manual + Playwright, bilingual coverage'],
        ['Security Engineer', '1', 'Part-time (40%)', 'From Ph3', 'Pen testing, OWASP, PCI scoping'],
        ['Total active FTEs (peak)', '~15', '—', '—', 'Plus part-time PM/PO/Sec'],
    ],
    col_widths=[4.7, 1.2, 3, 2.5, 4.3],
)

doc.add_heading('3.2 Lean MVP Team Variant', level=2)
add_table(
    ['Role', 'HC', 'Engagement'],
    [
        ['Product Owner / PM (dual-hat)', '1', 'Full-time'],
        ['UI/UX Designer', '1', 'Full-time'],
        ['Full-stack Engineers', '3', 'Full-time'],
        ['Mobile Engineer', '1', 'Full-time'],
        ['QA Engineer', '1', 'Full-time'],
        ['DevOps (shared/fractional)', '1', 'Part-time (40%)'],
        ['Total', '~7', '—'],
    ],
    col_widths=[7, 2, 6.7],
)

doc.add_heading('3.3 Enterprise V2 Team Variant', level=2)
add_para(
    'Scale to ~22–25 FTEs: add a second AI engineer, data engineer, SRE, customer success engineer, '
    'dedicated mobile pod per platform (iOS + Android native), and an analytics engineer.'
)
page_break()

# ═══════════════════════ 4. MODULES ═══════════════════════
doc.add_heading('4. Module-wise Breakdown', level=1)
add_para(
    'Effort expressed in person-weeks (PW). Complexity reflects technical risk, not size alone.', italic=True, color=MUTED
)
modules = [
    ['1', 'Authentication & Authorization', 'Email/password, phone+OTP (WhatsApp), Apple, Google. RBAC.', 'High', '—', '10', '1 BE, 1 FE, 1 Sec'],
    ['2', 'User Management & Profiles', 'Profile, addresses, preferences, language, GDPR controls.', 'Medium', 'Auth', '6', '1 BE, 1 FE'],
    ['3', 'Vendor Onboarding & Mgmt', 'KYC upload, approval, store config, payout setup.', 'High', 'Auth, Doc Mgmt', '14', '1 BE, 1 FE, ops'],
    ['4', 'Catalog Management', 'Multi-vendor CRUD, variants, media, attributes, bilingual content.', 'High', 'Vendor Mgmt', '16', '1.5 BE, 1 FE'],
    ['5', 'Inventory & Stock', 'Per-SKU, per-warehouse stock, reservations, low-stock alerts.', 'Medium', 'Catalog', '8', '1 BE'],
    ['6', 'Search & Filtering', 'OpenSearch, facets, typo tolerance, bilingual relevance, autocomplete.', 'High', 'Catalog', '10', '1 BE, AI input'],
    ['7', 'Cart & Wishlist', 'Persistent cart, vendor grouping, guest merge, wishlist sync.', 'Medium', 'Catalog, Auth', '6', '1 BE, 1 FE, 1 Mob'],
    ['8', 'Checkout & Orders', 'Multi-step (address, schedule, payment, review), split orders, gift wrapping.', 'High', 'Cart, Payment, Ship', '14', '1.5 BE, 1 FE, 1 Mob'],
    ['9', 'Payment Integration', 'Thawani/Tap/PayTabs, Apple Pay, COD. Tokenization, 3DS, refunds, splits.', 'High', 'Checkout', '12', '1 BE, 1 Sec'],
    ['10', 'Shipping & Delivery Scheduling', 'Carrier integration, zone mgmt, scheduled windows, webhooks.', 'High', 'Checkout', '10', '1 BE'],
    ['11', 'Promotions & Coupons', 'Coupon engine, stacking rules, vendor vs platform promos, campaigns.', 'Medium', 'Checkout', '6', '1 BE, 1 FE'],
    ['12', 'Notifications', 'Push (FCM/APNs), in-app, email (SES), WhatsApp Business templates.', 'Medium', 'Auth, Orders', '8', '1 BE, 1 Mob'],
    ['13', 'Gift AI Assistant', 'Guided flow + LLM + product embedding hybrid ranking.', 'High', 'Catalog, Search', '12', '1 AI/ML, 1 BE'],
    ['14', 'Recommendation Engine', 'Collaborative filtering, "frequently bought together", category affinity.', 'High', 'Catalog, Orders', '10', '1 AI/ML, 1 BE'],
    ['15', 'Vendor Portal', 'Dashboard, products, orders, earnings, payouts, analytics.', 'High', 'Vendor Mgmt', '18', '1 BE, 1.5 FE'],
    ['16', 'Admin / Ops Panel (CMS)', 'Vendor approvals, moderation, banners, categories, disputes, refunds.', 'High', 'All core', '16', '1 BE, 1 FE'],
    ['17', 'Reporting & Analytics', 'GMV, AOV, vendor performance, cohort retention, funnel. DW + dashboards.', 'High', 'All transactional', '12', '1 Data, 1 BE'],
    ['18', 'Document Management', 'Vendor KYC, invoices, gift card designs, S3 with signed URLs.', 'Medium', 'Auth', '5', '1 BE'],
    ['19', 'Loyalty & Points', 'Points ledger, earn/redeem rules, tiering.', 'Medium', 'Orders, Payments', '8', '1 BE, 1 FE'],
    ['20', 'Customer Support & Disputes', 'Ticket flow, chat handoff, refund processing.', 'Medium', 'Orders', '6', '1 BE, 1 FE'],
    ['21', 'Mobile Apps (iOS + Android)', 'RN-shared, deep-linking, biometrics, push, offline cart.', 'High', 'All consumer APIs', '24', '2 Mobile'],
    ['22', 'Security & Compliance', 'OWASP, PCI scope reduction, GDPR + Oman PDPL, WAF, rate-limit, secrets.', 'High', 'Cross-cutting', '10', '1 Sec, DevOps'],
    ['23', 'DevOps & Platform', 'IaC (Terraform), CI/CD, environments, observability, on-call.', 'High', 'Cross-cutting', '14', '1 DevOps'],
]
add_table(
    ['#', 'Module', 'Description', 'Complex.', 'Deps', 'PW', 'Resources'],
    modules,
    col_widths=[0.7, 3.5, 5.5, 1.4, 1.5, 0.8, 2.3],
)
add_para('Total: ~253 person-weeks.', bold=True, color=MAROON)
page_break()

# ═══════════════════════ 5. PHASES ═══════════════════════
doc.add_heading('5. Phase-wise Delivery Plan', level=1)

phases = [
    ('Phase 1 — Discovery & Planning · Weeks 1–3', [
        'Stakeholder interviews, vendor persona workshops.',
        'Detailed functional + non-functional requirements register.',
        'Information architecture, ERD, service decomposition map.',
        'Cloud region & vendor selection (AWS me-central-1 / Bahrain).',
        'Compliance scoping: Oman PDPL, PCI-DSS SAQ scope, VAT rules.',
    ], 'Deliverables: PRD, system architecture doc, ADRs, initial Jira backlog.'),
    ('Phase 2 — UI/UX Design · Weeks 2–6 (overlapping)', [
        'User research with 6–10 Omani consumers + 4–6 vendors.',
        'Wireframes → design system → high-fidelity Figma screens.',
        'Interaction prototypes for checkout, Gift AI, send-as-gift.',
        'Accessibility audit (WCAG 2.2 AA targets).',
    ], 'Deliverables: Figma library, design tokens JSON, motion specs, Lottie assets.'),
    ('Phase 3 — Backend Development · Weeks 4–18', [
        'Postgres schema implementation, migrations (Prisma Migrate / Flyway).',
        'Service skeletons: auth, catalog, cart, order, payment, vendor.',
        'API contracts (OpenAPI 3.1), generated FE/Mobile clients.',
        'Background workers (BullMQ / SQS) for emails, inventory, payouts.',
        'Integration with Thawani sandbox, Aramex test API.',
    ], 'Deliverables: Versioned APIs, contract tests, seed data, staging environment.'),
    ('Phase 4 — Frontend & Mobile Development · Weeks 8–22', [
        'Component library on top of design system (Storybook).',
        'Web app (Next.js 14 App Router), PWA shell.',
        'Mobile app (React Native with native modules).',
        'State management (TanStack Query + Zustand).',
        'i18n with full RTL support, locale-aware OMR currency + dates.',
    ], 'Deliverables: Browsable web app + signed iOS/Android beta builds.'),
    ('Phase 5 — AI & Automation · Weeks 14–24', [
        'Product embedding pipeline (OpenAI/Cohere embeddings → pgvector).',
        'Gift Assistant conversational flow with structured-output guarantees.',
        'Recommendation API: hybrid CF + content + business-rule boost.',
        'Promo automation, expiring-cart nudges.',
        'Vendor inventory anomaly detection.',
    ], 'Deliverables: AI service API, evaluation harness, A/B harness.'),
    ('Phase 6 — Testing & QA · Weeks 16–28 (continuous)', [
        'Unit tests: ≥ 70% coverage critical paths.',
        'Integration tests: Postman/Pact contract tests across services.',
        'E2E: Playwright (web) + Detox (mobile) for top 25 user journeys.',
        'Bilingual QA matrix (LTR + RTL × iOS + Android × AR + EN).',
        'Performance: k6 load testing 5× expected peak.',
        'Security: SAST (Semgrep), DAST (ZAP), third-party pen test.',
        'UAT with pilot vendor cohort.',
    ], 'Deliverables: Test reports, defect closure log, sign-off documents.'),
    ('Phase 7 — Deployment & DevOps · Weeks 18–30 (continuous)', [
        'IaC: Terraform modules per environment (dev, staging, prod).',
        'CI/CD: GitHub Actions → ECR → ECS Fargate / EKS, blue-green deploys.',
        'Observability: CloudWatch + Datadog or Grafana Cloud, OpenTelemetry.',
        'Logging: structured JSON to OpenSearch, retention policies.',
        'Backups: PITR for RDS, daily S3 versioning, cross-region replication.',
        'Incident response runbooks, on-call rotation, status page.',
    ], 'Deliverables: Production environment, runbooks, DR drill report.'),
]
for title, items, deliv in phases:
    doc.add_heading(title, level=2)
    add_bullets(items)
    add_para(deliv, italic=True, color=MAROON_DARK, size=10.5, space_after=10)

page_break()

# ═══════════════════════ 6. ARCHITECTURE ═══════════════════════
doc.add_heading('6. Technical Architecture Recommendations', level=1)
arch = [
    ['Frontend (Web)', 'Next.js 14 (App Router) + TypeScript + Tailwind v4 + Framer Motion', 'SSR/ISR for SEO, mature i18n + RTL'],
    ['Mobile', 'React Native (Expo bare), native modules for biometrics/Apple Pay', 'Single team, ~80% code reuse'],
    ['Backend', 'Node.js (NestJS, TS) microservices; Go for hot paths', 'Type-safe full stack, large hiring pool'],
    ['API Gateway / BFF', 'AWS API Gateway + GraphQL BFF or REST + tRPC', 'Tailors payloads per channel'],
    ['Database', 'PostgreSQL 16 on Amazon RDS (multi-AZ). pgvector for embeddings.', 'ACID for orders, JSON for attributes'],
    ['Caching', 'Redis (ElastiCache)', 'Sub-ms latency, sessions/cart/rate-limit'],
    ['Search', 'OpenSearch with Arabic + English ICU analyzers', 'Faceted search, typo tolerance, RTL'],
    ['Queue / Events', 'Amazon SQS + EventBridge (Kafka optional in V2)', 'Decouples checkout, notifications, payouts'],
    ['Object Storage', 'Amazon S3 + CloudFront CDN', 'Images, KYC, gift card art, signed URLs'],
    ['Cloud Region', 'AWS me-central-1 (UAE) primary, eu-south-1 DR', 'Data residency for PDPL, low latency'],
    ['CDN & Edge', 'CloudFront + Lambda@Edge', 'Image optimization, Arabic font subsetting'],
    ['Identity', 'AWS Cognito or Auth0; WhatsApp Business OTP', 'Offload undifferentiated auth'],
    ['Payments', 'Thawani (OMR), Tap, Apple Pay, COD', 'Local rails first, expand later'],
    ['Observability', 'Datadog (APM + logs + RUM) or Grafana Cloud', 'Full-stack visibility'],
    ['Error Tracking', 'Sentry (web + mobile + backend)', 'First-class RN + Next.js integration'],
    ['Feature Flags', 'LaunchDarkly or Unleash (OSS)', 'Safe rollouts, vendor-segment targeting'],
    ['Analytics', 'Segment → Snowflake/BigQuery → Looker / Metabase', 'Vendor dashboards, cohort analysis'],
    ['Secrets', 'AWS Secrets Manager + Parameter Store', 'Rotation, audit logging'],
    ['WAF / Security', 'AWS WAF + Shield, Cloudflare optional', 'Bot protection, DDoS, OWASP top-10'],
]
add_table(['Layer', 'Recommendation', 'Rationale'], arch, col_widths=[3.5, 6.7, 5.5])
page_break()

# ═══════════════════════ 7. TIMEFRAME & TEAM SIZE SUMMARY ═══════════════════════
doc.add_heading('7. Timeframe & Team Size Summary', level=1)
add_para(
    'Consolidated view of delivery duration and developer headcount required to complete each release tier of the Haddiya platform.',
    italic=True, color=MUTED,
)

doc.add_heading('7.1 Delivery Timeframe', level=2)
add_table(
    ['Tier', 'Duration (Weeks)', 'Duration (Months)', 'Outcome'],
    [
        ['Lean MVP', '14–16 weeks', '3.5–4 months', 'Launch-ready in Oman with 20–30 pilot vendors'],
        ['V1 Production', '26–30 weeks', '6.5–7.5 months', 'Public launch, full bilingual, marketing-ready'],
        ['V2 Enterprise', '44–52 weeks', '11–13 months', 'GCC expansion, multi-currency, enterprise SLAs'],
        ['End-to-end (overlapped)', '~44 weeks', '~10–11 months', 'Kickoff → V2-ready with parallel phases'],
    ],
    col_widths=[4, 3.5, 3.5, 4.7],
)

doc.add_heading('7.2 Developers Required per Tier', level=2)
add_table(
    ['Tier', 'Total HC', 'Engineers', 'Designers', 'QA', 'PM / PO', 'DevOps / Sec'],
    [
        ['Lean MVP', '~7', '4 (3 FS + 1 Mobile)', '1', '1', '1 (dual-hat)', '0.4 (fractional)'],
        ['V1 Production', '~13–15', '8 (3 BE + 2 FE + 2 Mob + 1 AI)', '2 + 0.5 UX', '3 (Lead + 2)', '2 (PM + PO)', '1 DevOps + 0.4 Sec'],
        ['V2 Enterprise', '~22–25', '18 (5 BE + 3 FE + 4 Mob + 2 AI + 2 Data + 2 SRE)', '3', '5 (Lead + 4)', '4 (CTO, PM, PO, Design Dir)', '2 DevOps + 1 Sec'],
    ],
    col_widths=[2.8, 1.6, 4.5, 2, 1.7, 2, 2.7],
)

doc.add_heading('7.3 Detailed V1 Engineering Breakdown', level=2)
add_table(
    ['Role', 'Number of Developers', 'Engagement', 'Duration'],
    [
        ['Backend Engineers', '3', 'Full-time', '7 months'],
        ['Frontend Web Engineers', '2', 'Full-time', '7 months'],
        ['Mobile Engineers (React Native)', '2', 'Full-time', '7 months'],
        ['AI / ML Engineer', '1', 'Full-time Phase 5, part later', '5 months'],
        ['DevOps / Platform Engineer', '1', 'Full-time', '7 months'],
        ['QA Lead', '1', 'Full-time', '6 months'],
        ['QA Engineers', '2', 'Full-time', '6 months'],
        ['UI / UX Designers', '2', 'Full-time Ph 1–4, part later', '6 months'],
        ['UX Researcher', '1', 'Part-time (50%)', '2 months'],
        ['Product Manager', '1', 'Full-time', '7 months'],
        ['Project Manager / Scrum Master', '1', 'Full-time', '7 months'],
        ['Security Engineer', '1', 'Part-time (40%)', '5 months'],
        ['Peak Total Headcount', '~15 FTE', '—', '7 months'],
    ],
    col_widths=[5.5, 3.5, 3.7, 3],
)

doc.add_heading('7.4 Recommended Pod Structure (V1)', level=2)
add_bullets([
    ('Consumer Pod — ', '2 FE + 2 Mobile + 1 BE + 1 Designer. Owns web, mobile, checkout, search.'),
    ('Marketplace Pod — ', '2 BE + 1 FE + 1 Designer. Owns vendor portal, admin CMS, catalog.'),
    ('Platform Pod — ', '1 AI/ML + 1 DevOps + 1 Sec (PT). Owns Gift AI, infra, security.'),
    ('QA Pod — ', '1 Lead + 2 QA. Bilingual coverage across all pods.'),
])
page_break()

# ═══════════════════════ 8. RISKS ═══════════════════════
doc.add_heading('8. Risk Analysis', level=1)

doc.add_heading('8.1 Technical Risks', level=2)
add_table(
    ['Risk', 'Likelihood', 'Impact', 'Mitigation'],
    [
        ['RTL/Arabic edge cases in third-party libs', 'High', 'Medium', 'Bilingual QA matrix from sprint 1, RTL component reviews'],
        ['Multi-vendor order split complexity', 'High', 'High', 'DDD, saga pattern for orders, contract tests'],
        ['Payment gateway certification timelines', 'Medium', 'High', 'Begin integration Phase 1, sandbox-first, COD fallback'],
        ['Mobile app store review delays', 'Medium', 'Medium', 'TestFlight early, metadata hygiene, screenshot pre-clearance'],
        ['AI hallucinations / off-brand recommendations', 'Medium', 'Medium', 'Constrained generation, catalog grounding, human-in-loop'],
    ],
    col_widths=[5.5, 2, 2, 6.2],
)

doc.add_heading('8.2 Scalability Concerns', level=2)
add_table(
    ['Concern', 'Trigger Point', 'Mitigation'],
    [
        ['Database write contention on order spikes', '> 100 orders/min', 'Read replicas, write sharding, idempotent intake, back-pressure'],
        ['Search index latency under filter-heavy traffic', 'Catalog > 50K SKUs', 'OpenSearch capacity, query caching, denormalized facet store'],
        ['Mobile push fan-out (campaigns)', '> 100K devices', 'SQS-backed batch send, FCM/APNs rate-aware workers'],
        ['Image bandwidth costs', 'High mobile traffic', 'Adaptive image CDN, AVIF/WebP, responsive sizes'],
        ['Vendor catalog import bursts', 'New vendor cohort onboarding', 'Async import pipeline, validation queue'],
    ],
    col_widths=[5, 3.5, 7.2],
)

doc.add_heading('8.3 Security Risks', level=2)
add_table(
    ['Risk', 'Severity', 'Mitigation'],
    [
        ['PII exposure (Oman PDPL, GDPR)', 'Critical', 'Encryption at rest (KMS) + TLS 1.3, field-level PII enc, audit logs'],
        ['Payment data scope', 'Critical', 'Tokenization via PSP, no PAN storage, SAQ-A scope'],
        ['Account takeover (credential stuffing)', 'High', 'Rate limiting, device fingerprinting, MFA, breached-password check'],
        ['Vendor portal privilege escalation', 'High', 'Strict RBAC, per-vendor isolation tests, tenant scoping everywhere'],
        ['Supply-chain (npm/PyPI) attacks', 'Medium', 'Dependabot, SBOM (CycloneDX), Snyk/Socket monitoring, signed images'],
        ['Document upload abuse (malware in KYC)', 'Medium', 'AV scan (ClamAV/Lambda), file-type validation, S3 isolation bucket'],
    ],
    col_widths=[5.5, 2, 8.2],
)

doc.add_heading('8.4 Performance Bottlenecks', level=2)
add_table(
    ['Bottleneck', 'Symptom', 'Fix'],
    [
        ['N+1 queries on product listing', 'Slow category pages', 'DataLoader/batched joins, denormalized read models'],
        ['Cold-start on serverless', 'First-request latency', 'Provisioned concurrency for hot endpoints, or ECS containers'],
        ['Cart recomputation per render (mobile)', 'Janky cart UI', 'Memoized totals, optimistic updates, debounced sync'],
        ['Large bundle on web', 'Slow LCP on 3G', 'Code-splitting, dynamic imports, Brotli, route-level prefetch'],
        ['Synchronous payout calculations', 'Slow checkout confirmation', 'Async settlement, eventual ledger reconciliation'],
    ],
    col_widths=[5, 4, 6.7],
)
page_break()

# ═══════════════════════ 9. FINAL RECOMMENDATION ═══════════════════════
doc.add_heading('9. Final Recommendation', level=1)

doc.add_heading('9.1 Ideal Team Size — Three Options', level=2)
add_para(
    'Team size scales with delivery speed. Same V1 scope can be delivered with a smaller team over a '
    'longer timeline, or a larger team over a shorter one. Three viable configurations:'
)
add_table(
    ['Option', 'Team Size', 'V1 Timeline', 'Best For', 'Tradeoff'],
    [
        ['Lean (Startup)', '8–9 FTE', '8–9 months', 'Budget-conscious founders, single-product focus', 'Sequential phases, no parallel pods, founders wear multiple hats'],
        ['Standard (Recommended)', '13–15 FTE', '6.5–7.5 months', 'Funded company targeting on-time public launch', 'Balanced velocity vs. coordination; full feature parity'],
        ['Aggressive', '20+ FTE', '5–6 months', 'Race-to-market situations, well-funded', 'Diminishing returns; coordination tax; higher onboarding cost'],
    ],
    col_widths=[3, 2, 2.5, 4.5, 4.5],
)
add_para('Honest take:', bold=True, color=MAROON)
add_para(
    '14 FTE feels large only if compared to MVP-only scope. For full V1 — bilingual web + iOS + Android '
    '+ vendor portal + admin CMS + payment integrations + Gift AI — it is right-sized. If budget is the '
    'constraint, the Lean 8–9 FTE option ships the same scope in 8–9 months instead of 7.'
)
add_bullets([
    ('Pod structure (Standard option): ', 'Consumer Web/Mobile · Vendor Portal + Admin · Platform/AI · QA.'),
    ('Pod structure (Lean option): ', 'Single full-stack pod + 1 designer + 1 QA + fractional DevOps.'),
])

doc.add_heading('9.2 Best Timeline for Delivery', level=2)
add_table(
    ['Milestone', 'Calendar Week', 'Outcome'],
    [
        ['Kickoff + Discovery', 'W 0–3', 'PRD, architecture frozen'],
        ['Design + Backend foundations begin', 'W 4', 'Figma library v1, API contracts'],
        ['MVP private beta', 'W 16', 'Pilot vendors transacting'],
        ['V1 public launch (Oman)', 'W 30', 'Marketing-ready, app stores live'],
        ['V2 GCC expansion', 'W 52', 'UAE, KSA, Bahrain coverage'],
    ],
    col_widths=[5, 4, 6.7],
)
add_para('Total: ~12 months from kickoff to V2-ready state with overlap.', bold=True, color=MAROON)

doc.add_heading('9.3 MVP Feature Set (Ship First)', level=2)
add_para('Must-have in MVP:', bold=True)
add_bullets([
    'Auth: phone+OTP, social login.',
    'Bilingual catalog (AR + EN) with categories, search.',
    'Cart, wishlist, single-vendor + multi-vendor checkout.',
    'Address book, delivery scheduling (date + time slot).',
    'Single payment gateway (Thawani) + COD.',
    'Send-as-gift: message card, scheduled delivery, recipient details.',
    'Vendor portal: onboarding, product CRUD, order list, basic earnings.',
    'Order tracking, push + in-app notifications.',
    'Admin: vendor approvals, basic catalog moderation.',
    'Promo code engine (single-stack coupons).',
])

doc.add_heading('9.4 Defer to V1 / V2', level=2)
add_para('Defer to V1:', bold=True, color=MAROON)
add_bullets([
    'Full Gift AI Assistant (rule-based simple in MVP, LLM-powered in V1).',
    'Loyalty / points ledger.',
    'Advanced analytics dashboards.',
    'Recommendation engine v1.',
    'WhatsApp Business notifications.',
    'Multi-payment gateway redundancy.',
])
add_para('Defer to V2:', bold=True, color=MAROON)
add_bullets([
    'Multi-country expansion (UAE, KSA, Bahrain) with multi-currency, multi-warehouse.',
    'B2B corporate gifting portal (bulk orders, invoicing, custom branding).',
    'Subscription gifting / recurring deliveries.',
    'Advanced ML personalization (home feeds).',
    'Vendor mobile app.',
    'Marketplace ads / sponsored placement.',
    'Live chat / video consultations with vendors.',
])

doc.add_heading('9.5 Fastest Realistic Approach (Without Quality Compromise)', level=2)
add_bullets([
    ('Freeze MVP scope hard. ', 'No additions without scope-swap. Feature flags so half-done work doesn’t block release.'),
    ('Parallelize Phase 2 (design) with Phase 3 (backend foundations). ', 'Saves 4–6 weeks of calendar time.'),
    ('Adopt monolith-modular backend first ', '(NestJS modules), extract microservices only when scaling forces it.'),
    ('Use React Native ', 'with high code reuse instead of dual native apps — saves ~3 months and 1.5 FTE.'),
    ('Buy, don’t build, undifferentiated components: ', 'Auth0/Cognito, OpenSearch managed, Sentry, Datadog, Algolia or OpenSearch.'),
    ('Continuous deployment from day one. ', 'Every PR deployable to staging; production deploys daily once V1 stabilizes.'),
    ('Vendor pilot cohort (10–15 vendors) on MVP ', 'while V1 features land — real-world feedback loop.'),
    ('Dedicated bilingual QA from Phase 4. ', 'Arabic/RTL bugs caught early cost 10× less than post-launch.'),
    ('Pre-book third-party penetration test ', 'at Week 24 so findings land before public launch.'),
    ('Reserve 15% capacity for unplanned work. ', 'Vendor requests, regulatory clarifications, payment gateway quirks.'),
])

divider()
add_para('Bottom line:', bold=True, color=MAROON, size=12)
add_para(
    'A focused team of ~14 engineers, designers, QA, and product staff delivers production-ready V1 in '
    '~7 months. Alternatively, a lean 8–9 FTE team ships the same V1 scope in ~8–9 months — the right '
    'choice for budget-conscious startups. Either path scales to enterprise V2 over the following ~6 '
    'months by growing the team to ~22–25 FTE.',
    italic=True, size=11,
)

doc.add_paragraph()
divider()
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run('Document prepared for executive review.\nDetailed sprint-level backlog, capacity plan, and risk register available as appendices upon request.')
r.italic = True
r.font.size = Pt(10)
r.font.color.rgb = MUTED

# ─── Footer with page numbers ───
footer = section.footer
fp = footer.paragraphs[0]
fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
fr = fp.add_run('Haddiya — Technical Development Roadmap   •   Confidential')
fr.font.size = Pt(8)
fr.font.color.rgb = MUTED

# ─── Save ───
out_path = '/Users/alihassan/Desktop/haddiya-redesign/Haddiya_Technical_Roadmap.docx'
doc.save(out_path)
print('OK', out_path, os.path.getsize(out_path), 'bytes')
