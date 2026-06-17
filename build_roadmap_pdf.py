"""Build polished Haddiya Technical Roadmap PDF. Brand: maroon/gold.
Matches DOCX content. No costs — timeframe + dev count only.
"""
import os
from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, ListFlowable, ListItem, HRFlowable, Image
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Brand palette ──
MAROON = colors.HexColor('#7A1E2B')
MAROON_DARK = colors.HexColor('#5A1520')
GOLD = colors.HexColor('#D4AF37')
INK = colors.HexColor('#1C1C1E')
MUTED = colors.HexColor('#8E8E93')
LIGHT_BG = colors.HexColor('#FAF8F5')
ALT_ROW = colors.HexColor('#F5F0EA')
WHITE = colors.white
BORDER = colors.HexColor('#CCCCCC')

# ── Styles ──
styles = getSampleStyleSheet()

style_body = ParagraphStyle(
    'Body', parent=styles['Normal'],
    fontName='Helvetica', fontSize=10, leading=14, textColor=INK,
    spaceAfter=4, alignment=TA_JUSTIFY,
)
style_body_left = ParagraphStyle(
    'BodyLeft', parent=style_body, alignment=TA_LEFT,
)
style_muted = ParagraphStyle(
    'Muted', parent=style_body, textColor=MUTED, fontName='Helvetica-Oblique', fontSize=9, alignment=TA_LEFT,
)
style_h1 = ParagraphStyle(
    'H1', parent=styles['Heading1'],
    fontName='Helvetica-Bold', fontSize=20, leading=26, textColor=MAROON,
    spaceBefore=14, spaceAfter=10,
)
style_h2 = ParagraphStyle(
    'H2', parent=styles['Heading2'],
    fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=MAROON_DARK,
    spaceBefore=12, spaceAfter=6,
)
style_h3 = ParagraphStyle(
    'H3', parent=styles['Heading3'],
    fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=INK,
    spaceBefore=8, spaceAfter=4,
)
style_bullet = ParagraphStyle(
    'Bullet', parent=style_body, leftIndent=14, bulletIndent=2,
    fontSize=10, leading=13, spaceAfter=2, alignment=TA_LEFT,
)
style_label = ParagraphStyle(
    'Label', parent=style_body, fontName='Helvetica-Bold', textColor=MAROON,
    fontSize=10.5, spaceBefore=4, spaceAfter=2,
)
style_cover_brand = ParagraphStyle(
    'CoverBrand', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=46, leading=52, textColor=MAROON,
    alignment=TA_CENTER, spaceAfter=4,
)
style_cover_tag = ParagraphStyle(
    'CoverTag', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=GOLD,
    alignment=TA_CENTER, spaceAfter=30,
)
style_cover_title = ParagraphStyle(
    'CoverTitle', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=26, leading=32, textColor=INK,
    alignment=TA_CENTER, spaceAfter=8,
)
style_cover_subtitle = ParagraphStyle(
    'CoverSub', parent=styles['Normal'],
    fontName='Helvetica-Oblique', fontSize=13, leading=16, textColor=MUTED,
    alignment=TA_CENTER, spaceAfter=20,
)
style_bottom_line = ParagraphStyle(
    'BottomLine', parent=style_body, fontName='Helvetica-Oblique',
    fontSize=11, leading=15, alignment=TA_JUSTIFY,
)

# ── Page templates: header + footer ──

def on_page(canvas, doc):
    canvas.saveState()
    # Top thin gold rule (skip cover, page 1)
    if doc.page > 1:
        canvas.setStrokeColor(GOLD)
        canvas.setLineWidth(0.5)
        canvas.line(2*cm, A4[1] - 1.2*cm, A4[0] - 2*cm, A4[1] - 1.2*cm)
        # Header text
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(MUTED)
        canvas.drawString(2*cm, A4[1] - 1.0*cm, 'HADDIYA — Technical Development Roadmap')
        canvas.drawRightString(A4[0] - 2*cm, A4[1] - 1.0*cm, 'Confidential')

    # Footer
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(0.5)
    canvas.line(2*cm, 1.3*cm, A4[0] - 2*cm, 1.3*cm)
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(A4[0]/2, 0.9*cm, f'Page {doc.page}')
    canvas.drawString(2*cm, 0.9*cm, 'Haddiya · Engineering & Product Delivery')
    canvas.drawRightString(A4[0] - 2*cm, 0.9*cm, datetime.now().strftime('%B %Y'))
    canvas.restoreState()


# ── helpers ──

def p(text, style=None):
    return Paragraph(text, style or style_body_left)

def bullets(items):
    flowables = []
    for it in items:
        if isinstance(it, tuple):
            label, rest = it
            flowables.append(Paragraph(f'<b>{label}</b> {rest}', style_bullet, bulletText='•'))
        else:
            flowables.append(Paragraph(it, style_bullet, bulletText='•'))
    return flowables

def branded_table(headers, rows, col_widths_cm, banded=True, header_align='LEFT'):
    # Wrap every cell in Paragraph so long text reflows inside its column.
    cell_style = ParagraphStyle(
        'cell', fontName='Helvetica', fontSize=8.8, leading=11,
        textColor=INK, alignment=TA_LEFT, spaceBefore=0, spaceAfter=0,
    )
    head_style = ParagraphStyle(
        'head', fontName='Helvetica-Bold', fontSize=9.5, leading=12,
        textColor=WHITE, alignment=TA_LEFT, spaceBefore=0, spaceAfter=0,
    )
    def wrap_head(v):
        return Paragraph(str(v), head_style)
    def wrap_cell(v):
        return Paragraph(str(v).replace('\n', '<br/>'), cell_style)
    head_row = [wrap_head(h) for h in headers]
    body_rows = [[wrap_cell(c) for c in row] for row in rows]
    data = [head_row] + body_rows
    col_widths = [w * cm for w in col_widths_cm]
    t = Table(data, colWidths=col_widths, repeatRows=1)
    style = [
        # Header
        ('BACKGROUND', (0,0), (-1,0), MAROON),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 9.5),
        ('ALIGN', (0,0), (-1,0), header_align),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,0), 6),
        ('BOTTOMPADDING', (0,0), (-1,0), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        # Body
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,1), (-1,-1), 8.8),
        ('TEXTCOLOR', (0,1), (-1,-1), INK),
        ('TOPPADDING', (0,1), (-1,-1), 4),
        ('BOTTOMPADDING', (0,1), (-1,-1), 4),
        ('VALIGN', (0,1), (-1,-1), 'TOP'),
        # Borders
        ('GRID', (0,0), (-1,-1), 0.4, BORDER),
        ('LINEBELOW', (0,0), (-1,0), 1.0, MAROON_DARK),
    ]
    if banded:
        for i in range(1, len(rows)+1):
            if i % 2 == 0:
                style.append(('BACKGROUND', (0,i), (-1,i), ALT_ROW))
    t.setStyle(TableStyle(style))
    return t

def divider():
    return HRFlowable(width="100%", thickness=0.7, color=GOLD, spaceBefore=6, spaceAfter=8)


# ════════════════════════════════════════════════════════════════════
# Build content
# ════════════════════════════════════════════════════════════════════
story = []

# ─────── COVER PAGE ───────
story.append(Spacer(1, 3.5*cm))
story.append(Paragraph('HADDIYA', style_cover_brand))
story.append(Paragraph('LUXURY GIFT MARKETPLACE · OMAN', style_cover_tag))
story.append(divider())
story.append(Spacer(1, 0.5*cm))
story.append(Paragraph('Technical Development Roadmap', style_cover_title))
story.append(Paragraph('Engineering &amp; Product Delivery Plan', style_cover_subtitle))
story.append(Spacer(1, 3*cm))

cover_meta = [
    ['Prepared for', 'Executive Leadership, Investors, Stakeholders'],
    ['Document version', '1.0'],
    ['Date', datetime.now().strftime('%B %Y')],
    ['Prepared by', 'Engineering & Product Delivery'],
]
meta_tbl = Table(cover_meta, colWidths=[5*cm, 10*cm])
meta_tbl.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (0,-1), ALT_ROW),
    ('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'),
    ('TEXTCOLOR', (0,0), (0,-1), MAROON),
    ('FONTNAME', (1,0), (1,-1), 'Helvetica'),
    ('TEXTCOLOR', (1,0), (1,-1), INK),
    ('FONTSIZE', (0,0), (-1,-1), 9.5),
    ('TOPPADDING', (0,0), (-1,-1), 7),
    ('BOTTOMPADDING', (0,0), (-1,-1), 7),
    ('LEFTPADDING', (0,0), (-1,-1), 10),
    ('GRID', (0,0), (-1,-1), 0.3, BORDER),
]))
story.append(meta_tbl)
story.append(PageBreak())

# ─────── TOC ───────
story.append(Paragraph('Table of Contents', style_h1))
toc_items = [
    '1. Project Overview',
    '2. Development Timeframe Estimation',
    '3. Team Composition',
    '4. Module-wise Breakdown',
    '5. Phase-wise Delivery Plan',
    '6. Technical Architecture Recommendations',
    '7. Timeframe &amp; Team Size Summary',
    '8. Risk Analysis',
    '9. Final Recommendation',
]
for item in toc_items:
    story.append(Paragraph(item, ParagraphStyle('toc', parent=style_body, fontSize=11.5, leading=18, spaceAfter=3)))
story.append(PageBreak())

# ─────── 1. PROJECT OVERVIEW ───────
story.append(Paragraph('1. Project Overview', style_h1))

story.append(Paragraph('1.1 Platform Description', style_h2))
story.append(p(
    'Haddiya is a luxury multi-vendor gift e-commerce platform headquartered in the Sultanate of Oman. '
    'The platform unifies premium gifting categories — perfumes, fine jewelry, watches, flowers, handbags, '
    'heritage items, chocolates, and children&#8217;s products — into a single mobile-first, bilingual '
    '(Arabic / English, RTL-aware) marketplace.'
))
story.append(p(
    'Haddiya differentiates itself from generic marketplaces by combining a glassmorphism luxury UI, an '
    'AI-powered Gift Assistant (audience → occasion → budget recommendation flow), curated send-as-gift '
    'workflows (message cards, scheduled delivery, gift wrapping), and a comprehensive vendor self-service portal.'
))

story.append(Paragraph('1.2 Business Objectives', style_h2))
story.append(branded_table(
    ['#', 'Objective', 'KPI'],
    [
        ['1', 'Capture share of GCC premium gifting market', 'GMV growth ≥ 20% QoQ'],
        ['2', 'Onboard curated vendor base', '150 vendors Y1, 500 Y2'],
        ['3', 'Drive repeat purchase via personalization', 'Repeat-buyer rate ≥ 35%'],
        ['4', 'Enable cross-border GCC delivery by V2', 'International GMV ≥ 25%'],
        ['5', 'Maintain luxury brand perception', 'NPS ≥ 60, app rating ≥ 4.7'],
    ],
    [1, 8.5, 7.5],
))

story.append(Paragraph('1.3 Target Users &amp; Stakeholders', style_h2))
story.append(Paragraph('Primary user segments', style_label))
story.extend(bullets([
    'Affluent consumers (25–55 yrs) gifting for family, corporate, social occasions.',
    'Expatriate professionals in GCC sending gifts to local recipients.',
    'SMB corporate buyers (bulk gifting for events, employee recognition).',
]))
story.append(Paragraph('Vendor segment', style_label))
story.extend(bullets([
    'Boutique luxury retailers, florists, perfumers, jewelers, artisanal producers.',
    'Single-vendor and multi-branch operations.',
]))
story.append(Paragraph('Internal stakeholders', style_label))
story.extend(bullets([
    'Platform Operations (catalog quality, vendor onboarding, dispute resolution).',
    'Marketing &amp; Growth (campaigns, promo codes, segmentation).',
    'Finance (settlement, commission, payouts).',
    'Customer Success (order tracking, refunds, gift-card support).',
]))

story.append(Paragraph('1.4 Major System Components', style_h2))
story.append(branded_table(
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
    [4, 13],
))
story.append(PageBreak())

# ─────── 2. TIMEFRAME ───────
story.append(Paragraph('2. Development Timeframe Estimation', style_h1))
story.append(p(
    'Estimates assume a dedicated, co-located product team with stable scope. All durations expressed in '
    'calendar weeks and months. Buffer (~15%) included.'
))
story.append(branded_table(
    ['Release', 'Scope', 'Weeks', 'Months', 'Notes'],
    [
        ['MVP', 'Core consumer flow, single payment gateway, 1 language, basic vendor portal', '14–16', '3.5–4', 'Launch-ready in Oman, 20–30 pilot vendors'],
        ['V1 Production', 'Full bilingual, multi-payment, Gift AI v1, vendor portal, admin CMS, push', '26–30', '6.5–7.5', 'Public launch, marketing-ready'],
        ['V2 Enterprise', 'Multi-country GCC, advanced AI, loyalty, B2B gifting, analytics, multi-warehouse', '44–52', '11–13', 'Regional expansion, enterprise SLAs'],
    ],
    [2.5, 6, 1.5, 1.8, 4.7],
))
story.append(Spacer(1, 8))
story.append(Paragraph('<b>Total cumulative duration (sequential):</b> ~52 weeks / 12–13 months.', style_body_left))
story.append(Paragraph('Recommended parallelization: MVP → V1 overlap saves 6–8 weeks.', style_muted))
story.append(Paragraph('End-to-end calendar with overlap: ~10–11 months to V2-ready state.', style_muted))
story.append(PageBreak())

# ─────── 3. TEAM ───────
story.append(Paragraph('3. Team Composition', style_h1))

story.append(Paragraph('3.1 Recommended Team (V1 Production Build)', style_h2))
story.append(branded_table(
    ['Role', 'HC', 'Engagement', 'Duration', 'Notes'],
    [
        ['Product Manager / Product Owner', '1', 'Full-time', 'Full project', 'Roadmap, vendor liaison'],
        ['Project Manager / Scrum Master', '1', 'Full-time', 'Full project', 'Ceremonies, delivery, risk'],
        ['UX Researcher', '1', 'Part-time (50%)', 'Phases 1–2', 'Bilingual user testing'],
        ['UI/UX Designer', '2', 'Full-time', 'Phases 1–4', 'Lead + product designer'],
        ['Frontend Engineers (Web)', '2', 'Full-time', 'Phases 3–7', 'React/Next.js, RTL/i18n'],
        ['Mobile Engineers', '2', 'Full-time', 'Phases 3–7', 'React Native / native'],
        ['Backend Engineers', '3', 'Full-time', 'Phases 3–7', 'NestJS or Go'],
        ['AI/ML Engineer', '1', 'FT Ph5, PT after', 'Months 4–8', 'Gift Assistant, embeddings'],
        ['DevOps / Platform', '1', 'Full-time', 'Phases 3–7', 'IaC, CI/CD, observability'],
        ['QA Lead', '1', 'Full-time', 'Phases 4–7', 'Test strategy, automation'],
        ['QA Engineers', '2', 'Full-time', 'Phases 5–7', 'Manual + Playwright, bilingual'],
        ['Security Engineer', '1', 'Part-time (40%)', 'From Ph3', 'Pen testing, OWASP, PCI'],
        ['Total active FTEs (peak)', '~15', '—', '—', 'Plus part-time PM/PO/Sec'],
    ],
    [4.5, 1.2, 3.2, 2.6, 5.5],
))

story.append(Paragraph('3.2 Lean MVP Team Variant', style_h2))
story.append(branded_table(
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
    [7, 2, 8],
))

story.append(Paragraph('3.3 Enterprise V2 Team Variant', style_h2))
story.append(p(
    'Scale to ~22–25 FTEs: add a second AI engineer, data engineer, SRE, customer success engineer, '
    'dedicated mobile pod per platform (iOS + Android native), and an analytics engineer.'
))
story.append(PageBreak())

# ─────── 4. MODULES ───────
story.append(Paragraph('4. Module-wise Breakdown', style_h1))
story.append(Paragraph(
    'Effort expressed in person-weeks (PW). Complexity reflects technical risk, not size alone.', style_muted
))
modules = [
    ['1', 'Authentication & Authorization', 'Email/password, phone+OTP, Apple, Google. RBAC.', 'High', '—', '10', '1 BE, 1 FE, 1 Sec'],
    ['2', 'User Management & Profiles', 'Profile, addresses, preferences, GDPR controls.', 'Medium', 'Auth', '6', '1 BE, 1 FE'],
    ['3', 'Vendor Onboarding & Mgmt', 'KYC upload, approval, store config, payout setup.', 'High', 'Auth, Doc', '14', '1 BE, 1 FE, ops'],
    ['4', 'Catalog Management', 'Multi-vendor CRUD, variants, media, bilingual content.', 'High', 'Vendor Mgmt', '16', '1.5 BE, 1 FE'],
    ['5', 'Inventory & Stock', 'Per-SKU, per-warehouse stock, reservations, alerts.', 'Medium', 'Catalog', '8', '1 BE'],
    ['6', 'Search & Filtering', 'OpenSearch, facets, typo tolerance, bilingual relevance.', 'High', 'Catalog', '10', '1 BE, AI input'],
    ['7', 'Cart & Wishlist', 'Persistent cart, vendor grouping, guest merge, sync.', 'Medium', 'Catalog, Auth', '6', '1 BE, 1 FE, 1 Mob'],
    ['8', 'Checkout & Orders', 'Multi-step, split orders, gift wrapping, scheduling.', 'High', 'Cart, Pay, Ship', '14', '1.5 BE, 1 FE, 1 Mob'],
    ['9', 'Payment Integration', 'Thawani/Tap, Apple Pay, COD. Tokenization, 3DS, refunds.', 'High', 'Checkout', '12', '1 BE, 1 Sec'],
    ['10', 'Shipping & Scheduling', 'Carrier integration, zones, time windows, webhooks.', 'High', 'Checkout', '10', '1 BE'],
    ['11', 'Promotions & Coupons', 'Coupon engine, stacking rules, vendor vs platform.', 'Medium', 'Checkout', '6', '1 BE, 1 FE'],
    ['12', 'Notifications', 'Push (FCM/APNs), in-app, email, WhatsApp templates.', 'Medium', 'Auth, Orders', '8', '1 BE, 1 Mob'],
    ['13', 'Gift AI Assistant', 'Guided flow + LLM + embeddings hybrid ranking.', 'High', 'Catalog, Search', '12', '1 AI, 1 BE'],
    ['14', 'Recommendation Engine', 'Collaborative filtering, FBT, category affinity.', 'High', 'Catalog, Orders', '10', '1 AI, 1 BE'],
    ['15', 'Vendor Portal', 'Dashboard, products, orders, earnings, payouts.', 'High', 'Vendor Mgmt', '18', '1 BE, 1.5 FE'],
    ['16', 'Admin / Ops Panel', 'Approvals, moderation, banners, disputes, refunds.', 'High', 'All core', '16', '1 BE, 1 FE'],
    ['17', 'Reporting & Analytics', 'GMV, AOV, cohort retention, funnel. DW + dashboards.', 'High', 'All transactional', '12', '1 Data, 1 BE'],
    ['18', 'Document Management', 'Vendor KYC, invoices, gift card art, S3 signed URLs.', 'Medium', 'Auth', '5', '1 BE'],
    ['19', 'Loyalty & Points', 'Points ledger, earn/redeem rules, tiering.', 'Medium', 'Orders, Pay', '8', '1 BE, 1 FE'],
    ['20', 'Customer Support', 'Ticket flow, chat handoff, refund processing.', 'Medium', 'Orders', '6', '1 BE, 1 FE'],
    ['21', 'Mobile Apps', 'RN-shared, deep-linking, biometrics, push, offline cart.', 'High', 'All consumer APIs', '24', '2 Mobile'],
    ['22', 'Security & Compliance', 'OWASP, PCI, PDPL, WAF, rate-limit, secrets.', 'High', 'Cross-cutting', '10', '1 Sec, DevOps'],
    ['23', 'DevOps & Platform', 'IaC, CI/CD, environments, observability, on-call.', 'High', 'Cross-cutting', '14', '1 DevOps'],
]
story.append(branded_table(
    ['#', 'Module', 'Description', 'Cmplx', 'Deps', 'PW', 'Resources'],
    modules,
    [0.7, 3.2, 4.7, 1.5, 1.8, 0.8, 2.3],
))
story.append(Spacer(1, 6))
story.append(Paragraph('<b><font color="#7A1E2B">Total: ~253 person-weeks.</font></b>', style_body_left))
story.append(PageBreak())

# ─────── 5. PHASES ───────
story.append(Paragraph('5. Phase-wise Delivery Plan', style_h1))

phases = [
    ('Phase 1 — Discovery &amp; Planning · Weeks 1–3', [
        'Stakeholder interviews, vendor persona workshops.',
        'Functional + non-functional requirements register.',
        'Information architecture, ERD, service decomposition map.',
        'Cloud region &amp; vendor selection (AWS me-central-1 / Bahrain).',
        'Compliance scoping: Oman PDPL, PCI-DSS SAQ scope, VAT rules.',
    ], 'Deliverables: PRD, system architecture doc, ADRs, initial Jira backlog.'),
    ('Phase 2 — UI/UX Design · Weeks 2–6 (overlapping)', [
        'User research with 6–10 Omani consumers + 4–6 vendors.',
        'Wireframes → design system → high-fidelity Figma screens.',
        'Interaction prototypes for checkout, Gift AI, send-as-gift.',
        'Accessibility audit (WCAG 2.2 AA targets).',
    ], 'Deliverables: Figma library, design tokens JSON, motion specs, Lottie assets.'),
    ('Phase 3 — Backend Development · Weeks 4–18', [
        'Postgres schema implementation, migrations.',
        'Service skeletons: auth, catalog, cart, order, payment, vendor.',
        'API contracts (OpenAPI 3.1), generated FE/Mobile clients.',
        'Background workers (BullMQ / SQS) for emails, inventory, payouts.',
        'Integration with Thawani sandbox, Aramex test API.',
    ], 'Deliverables: Versioned APIs, contract tests, seed data, staging environment.'),
    ('Phase 4 — Frontend &amp; Mobile · Weeks 8–22', [
        'Component library on top of design system (Storybook).',
        'Web app (Next.js 14 App Router), PWA shell.',
        'Mobile app (React Native with native modules).',
        'State management (TanStack Query + Zustand).',
        'i18n with full RTL support, OMR currency + Arabic dates.',
    ], 'Deliverables: Browsable web app + signed iOS/Android beta builds.'),
    ('Phase 5 — AI &amp; Automation · Weeks 14–24', [
        'Product embedding pipeline (OpenAI/Cohere → pgvector).',
        'Gift Assistant conversational flow with structured-output guarantees.',
        'Recommendation API: hybrid CF + content + business-rule boost.',
        'Promo automation, expiring-cart nudges.',
        'Vendor inventory anomaly detection.',
    ], 'Deliverables: AI service API, evaluation harness, A/B harness.'),
    ('Phase 6 — Testing &amp; QA · Weeks 16–28 (continuous)', [
        'Unit tests: ≥ 70% coverage critical paths.',
        'Integration tests: Postman/Pact contract tests across services.',
        'E2E: Playwright (web) + Detox (mobile) for top 25 journeys.',
        'Bilingual QA matrix (LTR + RTL × iOS + Android × AR + EN).',
        'Performance: k6 load testing 5× expected peak.',
        'Security: SAST (Semgrep), DAST (ZAP), third-party pen test.',
        'UAT with pilot vendor cohort.',
    ], 'Deliverables: Test reports, defect closure log, sign-off documents.'),
    ('Phase 7 — Deployment &amp; DevOps · Weeks 18–30', [
        'IaC: Terraform modules per environment (dev, staging, prod).',
        'CI/CD: GitHub Actions → ECR → ECS Fargate / EKS, blue-green.',
        'Observability: CloudWatch + Datadog or Grafana, OpenTelemetry.',
        'Logging: structured JSON to OpenSearch, retention policies.',
        'Backups: PITR for RDS, daily S3 versioning, cross-region.',
        'Incident response runbooks, on-call rotation, status page.',
    ], 'Deliverables: Production environment, runbooks, DR drill report.'),
]
for title, items, deliv in phases:
    story.append(Paragraph(title, style_h2))
    story.extend(bullets(items))
    story.append(Paragraph(f'<i><font color="#5A1520">{deliv}</font></i>', style_body_left))
    story.append(Spacer(1, 6))

story.append(PageBreak())

# ─────── 6. ARCHITECTURE ───────
story.append(Paragraph('6. Technical Architecture Recommendations', style_h1))
arch = [
    ['Frontend (Web)', 'Next.js 14 (App Router) + TypeScript + Tailwind v4', 'SSR/ISR for SEO, mature i18n + RTL'],
    ['Mobile', 'React Native (Expo bare), native modules for biometrics', 'Single team, ~80% code reuse'],
    ['Backend', 'Node.js (NestJS, TS); Go for hot paths', 'Type-safe full stack, large hiring pool'],
    ['API Gateway / BFF', 'AWS API Gateway + GraphQL BFF or REST + tRPC', 'Tailored payloads per channel'],
    ['Database', 'PostgreSQL 16 on RDS (multi-AZ). pgvector for embeddings.', 'ACID for orders, JSON for attributes'],
    ['Caching', 'Redis (ElastiCache)', 'Sub-ms latency, sessions/cart/rate-limit'],
    ['Search', 'OpenSearch with Arabic + English ICU analyzers', 'Faceted, typo-tolerant, RTL'],
    ['Queue / Events', 'Amazon SQS + EventBridge (Kafka V2 optional)', 'Decouples checkout, notifications, payouts'],
    ['Object Storage', 'Amazon S3 + CloudFront CDN', 'Images, KYC, gift card art, signed URLs'],
    ['Cloud Region', 'AWS me-central-1 (UAE) primary, eu-south-1 DR', 'Data residency for PDPL'],
    ['CDN &amp; Edge', 'CloudFront + Lambda@Edge', 'Image optimization, Arabic font subsetting'],
    ['Identity', 'AWS Cognito or Auth0; WhatsApp Business OTP', 'Offload undifferentiated auth'],
    ['Payments', 'Thawani (OMR), Tap, Apple Pay, COD', 'Local rails first, expand later'],
    ['Observability', 'Datadog (APM + logs + RUM) or Grafana Cloud', 'Full-stack visibility'],
    ['Error Tracking', 'Sentry (web + mobile + backend)', 'First-class RN + Next.js integration'],
    ['Feature Flags', 'LaunchDarkly or Unleash (OSS)', 'Safe rollouts, vendor segment targeting'],
    ['Analytics', 'Segment → Snowflake/BigQuery → Looker / Metabase', 'Vendor dashboards, cohort analysis'],
    ['Secrets', 'AWS Secrets Manager + Parameter Store', 'Rotation, audit logging'],
    ['WAF / Security', 'AWS WAF + Shield, Cloudflare optional', 'Bot, DDoS, OWASP top-10'],
]
story.append(branded_table(['Layer', 'Recommendation', 'Rationale'], arch, [3.5, 7, 6.5]))
story.append(PageBreak())

# ─────── 7. TIMEFRAME & TEAM SIZE SUMMARY ───────
story.append(Paragraph('7. Timeframe &amp; Team Size Summary', style_h1))
story.append(Paragraph(
    'Consolidated view of delivery duration and developer headcount required to complete each release '
    'tier of the Haddiya platform.', style_muted,
))

story.append(Paragraph('7.1 Delivery Timeframe', style_h2))
story.append(branded_table(
    ['Tier', 'Weeks', 'Months', 'Outcome'],
    [
        ['Lean MVP', '14–16 weeks', '3.5–4 months', 'Launch-ready in Oman with 20–30 pilot vendors'],
        ['V1 Production', '26–30 weeks', '6.5–7.5 months', 'Public launch, bilingual, marketing-ready'],
        ['V2 Enterprise', '44–52 weeks', '11–13 months', 'GCC expansion, enterprise SLAs'],
        ['End-to-end (overlapped)', '~44 weeks', '~10–11 months', 'Kickoff → V2-ready with parallel phases'],
    ],
    [4, 3.2, 3.2, 6.6],
))

story.append(Paragraph('7.2 Developers Required per Tier', style_h2))
story.append(branded_table(
    ['Tier', 'Total HC', 'Engineers', 'Designers', 'QA', 'PM/PO', 'DevOps/Sec'],
    [
        ['Lean MVP', '~7', '4 (3 FS + 1 Mob)', '1', '1', '1 dual-hat', '0.4'],
        ['V1 Production', '~13–15', '8 (3 BE + 2 FE + 2 Mob + 1 AI)', '2 + 0.5 UX', '3 (Lead + 2)', '2', '1 + 0.4 Sec'],
        ['V2 Enterprise', '~22–25', '18 (5 BE + 3 FE + 4 Mob + 2 AI + 2 Data + 2 SRE)', '3', '5 (Lead + 4)', '4', '2 + 1 Sec'],
    ],
    [2.8, 1.6, 4.7, 1.8, 1.8, 1.5, 2.8],
))

story.append(Paragraph('7.3 Detailed V1 Engineering Breakdown', style_h2))
story.append(branded_table(
    ['Role', 'Developers', 'Engagement', 'Duration'],
    [
        ['Backend Engineers', '3', 'Full-time', '7 months'],
        ['Frontend Web Engineers', '2', 'Full-time', '7 months'],
        ['Mobile Engineers (React Native)', '2', 'Full-time', '7 months'],
        ['AI / ML Engineer', '1', 'Full-time Ph5, part later', '5 months'],
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
    [5.5, 3.2, 4.5, 3.8],
))

story.append(Paragraph('7.4 Recommended Pod Structure (V1)', style_h2))
story.extend(bullets([
    ('Consumer Pod — ', '2 FE + 2 Mobile + 1 BE + 1 Designer. Owns web, mobile, checkout, search.'),
    ('Marketplace Pod — ', '2 BE + 1 FE + 1 Designer. Owns vendor portal, admin CMS, catalog.'),
    ('Platform Pod — ', '1 AI/ML + 1 DevOps + 1 Sec (PT). Owns Gift AI, infra, security.'),
    ('QA Pod — ', '1 Lead + 2 QA. Bilingual coverage across all pods.'),
]))
story.append(PageBreak())

# ─────── 8. RISKS ───────
story.append(Paragraph('8. Risk Analysis', style_h1))

story.append(Paragraph('8.1 Technical Risks', style_h2))
story.append(branded_table(
    ['Risk', 'Likelihood', 'Impact', 'Mitigation'],
    [
        ['RTL/Arabic edge cases in third-party libs', 'High', 'Medium', 'Bilingual QA matrix from sprint 1'],
        ['Multi-vendor order split complexity', 'High', 'High', 'DDD, saga pattern, contract tests'],
        ['Payment gateway certification timelines', 'Medium', 'High', 'Phase 1 start, sandbox-first, COD fallback'],
        ['Mobile app store review delays', 'Medium', 'Medium', 'TestFlight early, metadata hygiene'],
        ['AI hallucinations / off-brand recs', 'Medium', 'Medium', 'Constrained generation, catalog grounding'],
    ],
    [5.5, 2, 2, 7.5],
))

story.append(Paragraph('8.2 Scalability Concerns', style_h2))
story.append(branded_table(
    ['Concern', 'Trigger', 'Mitigation'],
    [
        ['Database write contention on order spikes', '> 100 orders/min', 'Read replicas, sharding, back-pressure'],
        ['Search index latency under filter-heavy load', 'Catalog > 50K SKUs', 'OpenSearch capacity, query caching'],
        ['Mobile push fan-out (campaigns)', '> 100K devices', 'SQS-backed batch, rate-aware workers'],
        ['Image bandwidth load', 'High mobile traffic', 'Adaptive CDN, AVIF/WebP, responsive sizes'],
        ['Vendor catalog import bursts', 'New vendor cohort', 'Async import pipeline, validation queue'],
    ],
    [5, 3.5, 8.5],
))

story.append(Paragraph('8.3 Security Risks', style_h2))
story.append(branded_table(
    ['Risk', 'Severity', 'Mitigation'],
    [
        ['PII exposure (Oman PDPL, GDPR)', 'Critical', 'Encryption at rest (KMS) + TLS 1.3, field-level enc'],
        ['Payment data scope', 'Critical', 'Tokenization via PSP, no PAN storage, SAQ-A scope'],
        ['Account takeover (credential stuffing)', 'High', 'Rate limiting, fingerprinting, MFA, breach check'],
        ['Vendor portal privilege escalation', 'High', 'Strict RBAC, per-vendor isolation, tenant scoping'],
        ['Supply-chain (npm/PyPI) attacks', 'Medium', 'Dependabot, SBOM, Snyk/Socket, signed images'],
        ['Document upload abuse (KYC malware)', 'Medium', 'AV scan, file-type validation, S3 isolation'],
    ],
    [5.5, 2, 9.5],
))

story.append(Paragraph('8.4 Performance Bottlenecks', style_h2))
story.append(branded_table(
    ['Bottleneck', 'Symptom', 'Fix'],
    [
        ['N+1 queries on product listing', 'Slow category pages', 'DataLoader/batched joins, read models'],
        ['Cold-start on serverless', 'First-request latency', 'Provisioned concurrency or ECS containers'],
        ['Cart recompute per render (mobile)', 'Janky cart UI', 'Memoized totals, optimistic updates'],
        ['Large bundle on web', 'Slow LCP on 3G', 'Code-splitting, dynamic imports, Brotli'],
        ['Synchronous payout calculations', 'Slow checkout confirmation', 'Async settlement, eventual reconciliation'],
    ],
    [5, 4, 8],
))
story.append(PageBreak())

# ─────── 9. FINAL RECOMMENDATION ───────
story.append(Paragraph('9. Final Recommendation', style_h1))

story.append(Paragraph('9.1 Ideal Team Size — Three Options', style_h2))
story.append(Paragraph(
    'Team size scales with delivery speed. Same V1 scope can be delivered with a smaller team over a '
    'longer timeline, or a larger team over a shorter one. Three viable configurations:',
    style_body_left,
))
story.append(Spacer(1, 6))
story.append(branded_table(
    ['Option', 'Team Size', 'V1 Timeline', 'Best For', 'Tradeoff'],
    [
        ['Lean (Startup)', '8–9 FTE', '8–9 months', 'Budget-conscious founders, single-product focus', 'Sequential phases, no parallel pods, founders wear multiple hats'],
        ['Standard (Recommended)', '13–15 FTE', '6.5–7.5 months', 'Funded company targeting on-time public launch', 'Balanced velocity vs. coordination overhead; full feature parity'],
        ['Aggressive', '20+ FTE', '5–6 months', 'Race-to-market situations, well-funded', 'Diminishing returns; coordination tax; higher onboarding cost'],
    ],
    [3, 2, 2.5, 4.5, 4.5],
))
story.append(Spacer(1, 6))
story.append(Paragraph(
    '<b><font color="#7A1E2B">Honest take:</font></b> 14 FTE feels large only if compared to MVP-only '
    'scope. For full V1 — bilingual web + iOS + Android + vendor portal + admin CMS + payment integrations '
    '+ Gift AI — it is right-sized. If budget is the constraint, the Lean 8–9 FTE option ships the same '
    'scope in 8–9 months instead of 7.',
    style_body_left,
))
story.extend(bullets([
    ('Pod structure (Standard option): ', 'Consumer Web/Mobile · Vendor Portal + Admin · Platform/AI · QA.'),
    ('Pod structure (Lean option): ', 'Single full-stack pod + 1 designer + 1 QA + fractional DevOps.'),
]))

story.append(Paragraph('9.2 Best Timeline for Delivery', style_h2))
story.append(branded_table(
    ['Milestone', 'Calendar Week', 'Outcome'],
    [
        ['Kickoff + Discovery', 'W 0–3', 'PRD, architecture frozen'],
        ['Design + Backend foundations begin', 'W 4', 'Figma library v1, API contracts'],
        ['MVP private beta', 'W 16', 'Pilot vendors transacting'],
        ['V1 public launch (Oman)', 'W 30', 'Marketing-ready, app stores live'],
        ['V2 GCC expansion', 'W 52', 'UAE, KSA, Bahrain coverage'],
    ],
    [5, 4, 8],
))
story.append(Paragraph(
    '<b><font color="#7A1E2B">Total: ~12 months from kickoff to V2-ready state with overlap.</font></b>',
    style_body_left,
))

story.append(Paragraph('9.3 MVP Feature Set (Ship First)', style_h2))
story.append(Paragraph('Must-have in MVP:', style_label))
story.extend(bullets([
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
]))

story.append(Paragraph('9.4 Defer to V1 / V2', style_h2))
story.append(Paragraph('<font color="#7A1E2B"><b>Defer to V1:</b></font>', style_body_left))
story.extend(bullets([
    'Full Gift AI Assistant (rule-based simple in MVP, LLM-powered in V1).',
    'Loyalty / points ledger.',
    'Advanced analytics dashboards.',
    'Recommendation engine v1.',
    'WhatsApp Business notifications.',
    'Multi-payment gateway redundancy.',
]))
story.append(Paragraph('<font color="#7A1E2B"><b>Defer to V2:</b></font>', style_body_left))
story.extend(bullets([
    'Multi-country expansion (UAE, KSA, Bahrain) with multi-currency, multi-warehouse.',
    'B2B corporate gifting portal (bulk orders, invoicing, custom branding).',
    'Subscription gifting / recurring deliveries.',
    'Advanced ML personalization (home feeds).',
    'Vendor mobile app.',
    'Marketplace ads / sponsored placement.',
    'Live chat / video consultations with vendors.',
]))

story.append(Paragraph('9.5 Fastest Realistic Approach (Without Quality Compromise)', style_h2))
story.extend(bullets([
    ('Freeze MVP scope hard. ', 'No additions without scope-swap. Feature flags so half-done work doesn&#8217;t block release.'),
    ('Parallelize Phase 2 (design) with Phase 3 (backend foundations). ', 'Saves 4–6 weeks of calendar time.'),
    ('Adopt monolith-modular backend first ', '(NestJS modules), extract microservices only when scaling forces it.'),
    ('Use React Native ', 'with high code reuse instead of dual native apps — saves ~3 months and 1.5 FTE.'),
    ('Buy, don&#8217;t build, undifferentiated components: ', 'Auth0/Cognito, OpenSearch managed, Sentry, Datadog.'),
    ('Continuous deployment from day one. ', 'Every PR deployable to staging; production deploys daily once V1 stabilizes.'),
    ('Vendor pilot cohort (10–15 vendors) on MVP ', 'while V1 features land — real-world feedback loop.'),
    ('Dedicated bilingual QA from Phase 4. ', 'Arabic/RTL bugs caught early cost 10× less than post-launch.'),
    ('Pre-book third-party penetration test ', 'at Week 24 so findings land before public launch.'),
    ('Reserve 15% capacity for unplanned work. ', 'Vendor requests, regulatory clarifications, payment quirks.'),
]))

story.append(Spacer(1, 8))
story.append(divider())
story.append(Paragraph('<b><font color="#7A1E2B">Bottom line:</font></b>', style_body_left))
story.append(Paragraph(
    '<i>A focused team of ~14 engineers, designers, QA, and product staff delivers production-ready V1 in '
    '~7 months. Alternatively, a lean 8–9 FTE team ships the same V1 scope in ~8–9 months — the right '
    'choice for budget-conscious startups. Either path scales to enterprise V2 over the following ~6 '
    'months by growing the team to ~22–25 FTE.</i>',
    style_bottom_line,
))
story.append(Spacer(1, 12))
story.append(divider())
story.append(Paragraph(
    '<i><font color="#8E8E93">Document prepared for executive review. Detailed sprint-level backlog, '
    'capacity plan, and risk register available as appendices upon request.</font></i>',
    ParagraphStyle('end', parent=style_body, alignment=TA_CENTER, fontSize=9),
))

# ── Build ──
out = '/Users/alihassan/Desktop/haddiya-redesign/Haddiya_Technical_Roadmap.pdf'
doc = SimpleDocTemplate(
    out, pagesize=A4,
    leftMargin=2*cm, rightMargin=2*cm,
    topMargin=2*cm, bottomMargin=2*cm,
    title='Haddiya Technical Development Roadmap',
    author='Haddiya Engineering & Product Delivery',
)
doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
print('OK', out, os.path.getsize(out), 'bytes')
