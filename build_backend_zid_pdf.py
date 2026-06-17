"""Haddiya Backend + ZID Integration Roadmap — PDF builder."""
import os
from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable,
)

from backend_zid_content import (
    PLATFORM_DESCRIPTION, WHY_ZID, INTEGRATION_PRINCIPLES, BUSINESS_OBJECTIVES,
    SYSTEM_COMPONENTS, TIMEFRAME, MODULES, PHASES, ARCHITECTURE,
    TEAM_V1, TEAM_OPTIONS, RISKS_TECH, RISKS_SCALE, RISKS_SEC, RISKS_PERF,
    MVP_FEATURES, DEFER_V1, DEFER_V2, FAST_APPROACH, MILESTONES,
)

MAROON = colors.HexColor('#7A1E2B')
MAROON_DARK = colors.HexColor('#5A1520')
GOLD = colors.HexColor('#D4AF37')
INK = colors.HexColor('#1C1C1E')
MUTED = colors.HexColor('#8E8E93')
ALT_ROW = colors.HexColor('#F5F0EA')
WHITE = colors.white
BORDER = colors.HexColor('#CCCCCC')

styles = getSampleStyleSheet()
style_body = ParagraphStyle('Body', parent=styles['Normal'],
    fontName='Helvetica', fontSize=10, leading=14, textColor=INK,
    spaceAfter=4, alignment=TA_JUSTIFY)
style_body_left = ParagraphStyle('BL', parent=style_body, alignment=TA_LEFT)
style_muted = ParagraphStyle('Mu', parent=style_body, textColor=MUTED,
    fontName='Helvetica-Oblique', fontSize=9, alignment=TA_LEFT)
style_h1 = ParagraphStyle('H1', parent=styles['Heading1'],
    fontName='Helvetica-Bold', fontSize=20, leading=26, textColor=MAROON,
    spaceBefore=14, spaceAfter=10)
style_h2 = ParagraphStyle('H2', parent=styles['Heading2'],
    fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=MAROON_DARK,
    spaceBefore=12, spaceAfter=6)
style_bullet = ParagraphStyle('Bu', parent=style_body, leftIndent=14, bulletIndent=2,
    fontSize=10, leading=13, spaceAfter=2, alignment=TA_LEFT)
style_label = ParagraphStyle('La', parent=style_body, fontName='Helvetica-Bold',
    textColor=MAROON, fontSize=10.5, spaceBefore=4, spaceAfter=2)
style_cover_brand = ParagraphStyle('CB', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=46, leading=52, textColor=MAROON,
    alignment=TA_CENTER, spaceAfter=4)
style_cover_tag = ParagraphStyle('CT', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=GOLD,
    alignment=TA_CENTER, spaceAfter=30)
style_cover_title = ParagraphStyle('CTi', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=26, leading=32, textColor=INK,
    alignment=TA_CENTER, spaceAfter=8)
style_cover_sub = ParagraphStyle('CS', parent=styles['Normal'],
    fontName='Helvetica-Oblique', fontSize=13, leading=16, textColor=MUTED,
    alignment=TA_CENTER, spaceAfter=20)
style_bot = ParagraphStyle('Bot', parent=style_body, fontName='Helvetica-Oblique',
    fontSize=11, leading=15, alignment=TA_JUSTIFY)

def on_page(canvas, doc):
    canvas.saveState()
    if doc.page > 1:
        canvas.setStrokeColor(GOLD); canvas.setLineWidth(0.5)
        canvas.line(2*cm, A4[1] - 1.2*cm, A4[0] - 2*cm, A4[1] - 1.2*cm)
        canvas.setFont('Helvetica', 8); canvas.setFillColor(MUTED)
        canvas.drawString(2*cm, A4[1] - 1.0*cm, 'HADDIYA — Backend × ZID Integration Roadmap')
        canvas.drawRightString(A4[0] - 2*cm, A4[1] - 1.0*cm, 'Confidential')
    canvas.setStrokeColor(GOLD); canvas.setLineWidth(0.5)
    canvas.line(2*cm, 1.3*cm, A4[0] - 2*cm, 1.3*cm)
    canvas.setFont('Helvetica', 8); canvas.setFillColor(MUTED)
    canvas.drawCentredString(A4[0]/2, 0.9*cm, f'Page {doc.page}')
    canvas.drawString(2*cm, 0.9*cm, 'Haddiya · Backend & Integration')
    canvas.drawRightString(A4[0] - 2*cm, 0.9*cm, datetime.now().strftime('%B %Y'))
    canvas.restoreState()

def p(text, style=None): return Paragraph(text, style or style_body_left)

def bullets(items):
    out = []
    for it in items:
        if isinstance(it, tuple):
            label, rest = it
            out.append(Paragraph(f'<b>{label}</b> {rest}', style_bullet, bulletText='•'))
        else:
            out.append(Paragraph(it, style_bullet, bulletText='•'))
    return out

def tbl(headers, rows, widths_cm, banded=True):
    cell_style = ParagraphStyle('c', fontName='Helvetica', fontSize=8.6, leading=11,
        textColor=INK, alignment=TA_LEFT)
    head_style = ParagraphStyle('h', fontName='Helvetica-Bold', fontSize=9.4, leading=12,
        textColor=WHITE, alignment=TA_LEFT)
    head = [Paragraph(str(h), head_style) for h in headers]
    body = [[Paragraph(str(c).replace('\n','<br/>'), cell_style) for c in r] for r in rows]
    data = [head] + body
    t = Table(data, colWidths=[w*cm for w in widths_cm], repeatRows=1)
    style = [
        ('BACKGROUND', (0,0), (-1,0), MAROON),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,0), 6),
        ('BOTTOMPADDING', (0,0), (-1,0), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('TOPPADDING', (0,1), (-1,-1), 4),
        ('BOTTOMPADDING', (0,1), (-1,-1), 4),
        ('GRID', (0,0), (-1,-1), 0.4, BORDER),
        ('LINEBELOW', (0,0), (-1,0), 1.0, MAROON_DARK),
    ]
    if banded:
        for i in range(1, len(rows)+1):
            if i % 2 == 0:
                style.append(('BACKGROUND', (0,i), (-1,i), ALT_ROW))
    t.setStyle(TableStyle(style))
    return t

def divider(): return HRFlowable(width="100%", thickness=0.7, color=GOLD, spaceBefore=6, spaceAfter=8)

story = []

# ─── COVER ───
story.append(Spacer(1, 3.5*cm))
story.append(Paragraph('HADDIYA', style_cover_brand))
story.append(Paragraph('BACKEND × ZID INTEGRATION', style_cover_tag))
story.append(divider())
story.append(Spacer(1, 0.5*cm))
story.append(Paragraph('Backend Development Roadmap', style_cover_title))
story.append(Paragraph('Module-wise Integration Plan with ZID Platform', style_cover_sub))
story.append(Spacer(1, 3*cm))

cover_meta = [
    ['Document Scope', 'Backend Services + ZID Platform Integration'],
    ['Frontend Status', 'Already designed and built (out of scope here)'],
    ['Prepared for', 'Executive Leadership, Engineering, Stakeholders'],
    ['Version', '1.0'],
    ['Date', datetime.now().strftime('%B %Y')],
]
mt = Table(cover_meta, colWidths=[5*cm, 10*cm])
mt.setStyle(TableStyle([
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
story.append(mt)
story.append(PageBreak())

# ─── TOC ───
story.append(Paragraph('Table of Contents', style_h1))
toc = [
    '1. Project Scope &amp; ZID Platform Overview',
    '2. Integration Architecture &amp; Principles',
    '3. Backend Development Timeframe',
    '4. Team Composition (Backend-Only)',
    '5. Module-wise ZID Integration Plan',
    '6. Phase-wise Delivery Plan',
    '7. Technical Architecture Stack',
    '8. Risk Analysis',
    '9. Final Recommendation',
]
for item in toc:
    story.append(Paragraph(item, ParagraphStyle('toc', parent=style_body,
        fontSize=11.5, leading=18, spaceAfter=3)))
story.append(PageBreak())

# ─── 1 ───
story.append(Paragraph('1. Project Scope &amp; ZID Platform Overview', style_h1))
story.append(Paragraph('1.1 Backend Scope', style_h2))
story.append(p(PLATFORM_DESCRIPTION))
story.append(Paragraph('1.2 Why ZID?', style_h2))
story.append(p(WHY_ZID))
story.append(Paragraph('1.3 Business Objectives', style_h2))
story.append(tbl(['#', 'Objective', 'Target'], BUSINESS_OBJECTIVES, [1, 9, 7]))
story.append(Paragraph('1.4 Backend System Components', style_h2))
story.append(tbl(['Component', 'Description'], SYSTEM_COMPONENTS, [4.5, 12.5]))
story.append(PageBreak())

# ─── 2 ───
story.append(Paragraph('2. Integration Architecture &amp; Principles', style_h1))
story.append(p(
    'Haddiya backend sits between the consumer apps and ZID. ZID is the system-of-record for all '
    'commerce primitives; Haddiya extends with marketplace, AI, and gifting logic. Six principles '
    'guide every integration decision:'
))
story.append(tbl(['Principle', 'Description'], INTEGRATION_PRINCIPLES, [5, 12]))
story.append(Paragraph('2.1 High-level Data Flow', style_h2))
story.append(Paragraph(
    '<b><font color="#5A1520">Consumer App → Haddiya BFF → Haddiya Services ↔ ZID Connector ↔ ZID Platform</font></b>',
    style_body_left,
))
story.extend(bullets([
    'Reads: Mobile/web → BFF → Haddiya cache (Postgres + OpenSearch); cache hydrated from ZID via webhooks.',
    'Writes: Checkout, refunds, customer updates → Haddiya services → ZID API (with idempotency keys).',
    'Events: ZID webhooks → ingestion service → SQS → consumer workers (cache, ledger, notifications).',
    'Cron / safety net: Periodic reconciliation jobs catch any webhook misses.',
]))
story.append(PageBreak())

# ─── 3 ───
story.append(Paragraph('3. Backend Development Timeframe', style_h1))
story.append(Paragraph(
    'Frontend is already designed and built. These estimates cover backend services + ZID integration '
    'only. Buffer (~15%) included.', style_muted
))
story.append(tbl(['Release', 'Scope', 'Weeks', 'Months', 'Notes'], TIMEFRAME, [3, 6, 1.5, 1.7, 4.5]))
story.append(Spacer(1, 6))
story.append(Paragraph('<b>Total cumulative duration (sequential):</b> ~24 weeks / 6 months.', style_body_left))
story.append(Paragraph('With parallel pods: ~22 weeks / 5 months to V1 production.', style_muted))
story.append(PageBreak())

# ─── 4 ───
story.append(Paragraph('4. Team Composition (Backend-Only)', style_h1))
story.append(Paragraph('4.1 Recommended V1 Backend Team', style_h2))
story.append(tbl(['Role', 'HC', 'Engagement', 'Duration', 'Notes'],
                 TEAM_V1, [4.5, 1.3, 3.3, 2.7, 5.0]))
story.append(Paragraph('4.2 Three Team Size Options', style_h2))
story.append(p('Backend can ship with a smaller team over a longer timeline. Three viable configurations:'))
story.append(tbl(['Option', 'Team Size', 'V1 Timeline', 'Composition', 'Tradeoff'],
                 TEAM_OPTIONS, [3, 2, 2.5, 4.5, 4.7]))
story.append(Paragraph('<b><font color="#7A1E2B">Honest take:</font></b>', style_body_left))
story.append(p(
    '9–10 FTE is right-sized for delivering full backend V1 in 5 months with parallel pods. If budget '
    'or hiring is constrained, the Lean 5–6 FTE option ships the same scope in 7–8 months by removing '
    'parallelism and deferring AI/Data work to later phases.'
))
story.append(PageBreak())

# ─── 5 ───
story.append(Paragraph('5. Module-wise ZID Integration Plan', style_h1))
story.append(Paragraph(
    'Each module shows what ZID provides natively, where Haddiya adds custom logic, and the effort in '
    'person-weeks (PW).', style_muted
))
story.append(tbl(
    ['#', 'Module', 'Description', 'ZID Coverage', 'Custom Effort', 'PW', 'Resources'],
    MODULES,
    [0.6, 2.7, 3.8, 2.6, 2.6, 0.7, 2.8],
))
story.append(Spacer(1, 6))
story.append(Paragraph('<b><font color="#7A1E2B">Total: ~273 person-weeks across 32 modules.</font></b>', style_body_left))
story.append(PageBreak())

# ─── 6 ───
story.append(Paragraph('6. Phase-wise Delivery Plan', style_h1))
for title, items, deliv in PHASES:
    story.append(Paragraph(title, style_h2))
    story.extend(bullets(items))
    story.append(Paragraph(f'<i><font color="#5A1520">{deliv}</font></i>', style_body_left))
    story.append(Spacer(1, 6))
story.append(PageBreak())

# ─── 7 ───
story.append(Paragraph('7. Technical Architecture Stack', style_h1))
story.append(tbl(['Layer', 'Recommendation', 'Rationale'], ARCHITECTURE, [3.5, 6.8, 6.7]))
story.append(PageBreak())

# ─── 8 ───
story.append(Paragraph('8. Risk Analysis', style_h1))
story.append(Paragraph('8.1 Technical &amp; ZID-Specific Risks', style_h2))
story.append(tbl(['Risk', 'Likelihood', 'Impact', 'Mitigation'], RISKS_TECH, [5.5, 1.8, 1.8, 7.9]))
story.append(Paragraph('8.2 Scalability Concerns', style_h2))
story.append(tbl(['Concern', 'Trigger', 'Mitigation'], RISKS_SCALE, [5, 3.5, 8.5]))
story.append(Paragraph('8.3 Security Risks', style_h2))
story.append(tbl(['Risk', 'Severity', 'Mitigation'], RISKS_SEC, [5.5, 2, 9.5]))
story.append(Paragraph('8.4 Performance Bottlenecks', style_h2))
story.append(tbl(['Bottleneck', 'Symptom', 'Fix'], RISKS_PERF, [5, 4, 8]))
story.append(PageBreak())

# ─── 9 ───
story.append(Paragraph('9. Final Recommendation', style_h1))
story.append(Paragraph('9.1 Backend MVP Feature Set', style_h2))
story.append(Paragraph('Ship first:', style_label))
story.extend(bullets(MVP_FEATURES))
story.append(Paragraph('9.2 Defer to V1 / V2', style_h2))
story.append(Paragraph('<font color="#7A1E2B"><b>Defer to V1:</b></font>', style_body_left))
story.extend(bullets(DEFER_V1))
story.append(Paragraph('<font color="#7A1E2B"><b>Defer to V2:</b></font>', style_body_left))
story.extend(bullets(DEFER_V2))
story.append(Paragraph('9.3 Best Timeline &amp; Milestones', style_h2))
story.append(tbl(['Milestone', 'Calendar Week', 'Outcome'], MILESTONES, [6, 3, 8]))
story.append(Paragraph('9.4 Fastest Realistic Approach', style_h2))
story.extend(bullets(FAST_APPROACH))

story.append(Spacer(1, 8))
story.append(divider())
story.append(Paragraph('<b><font color="#7A1E2B">Bottom line:</font></b>', style_body_left))
story.append(Paragraph(
    '<i>A focused backend team of 9–10 FTE delivers production-ready ZID-integrated backend V1 in '
    '~5 months. ZID provides the commerce engine; Haddiya engineers build the marketplace, AI, and '
    'gifting differentiators on top. Backend launches alongside the already-completed frontend.</i>',
    style_bot,
))
story.append(Spacer(1, 12))
story.append(divider())
story.append(Paragraph(
    '<i><font color="#8E8E93">Document prepared for executive review. API specifications, sprint '
    'backlog, and ZID partner contract details available as appendices.</font></i>',
    ParagraphStyle('end', parent=style_body, alignment=TA_CENTER, fontSize=9),
))

out = '/Users/alihassan/Desktop/haddiya-redesign/Haddiya_Backend_ZID_Integration.pdf'
doc = SimpleDocTemplate(out, pagesize=A4,
    leftMargin=2*cm, rightMargin=2*cm, topMargin=2*cm, bottomMargin=2*cm,
    title='Haddiya Backend × ZID Integration Roadmap',
    author='Haddiya Engineering',
)
doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
print('OK', out, os.path.getsize(out), 'bytes')
