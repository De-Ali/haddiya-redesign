"""Haddiya Backend + ZID Integration Roadmap — DOCX builder."""
import os
from datetime import datetime
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.enum.table import WD_ALIGN_VERTICAL, WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

from backend_zid_content import (
    PLATFORM_DESCRIPTION, WHY_ZID, INTEGRATION_PRINCIPLES, BUSINESS_OBJECTIVES,
    SYSTEM_COMPONENTS, TIMEFRAME, MODULES, PHASES, ARCHITECTURE,
    TEAM_V1, TEAM_OPTIONS, RISKS_TECH, RISKS_SCALE, RISKS_SEC, RISKS_PERF,
    MVP_FEATURES, DEFER_V1, DEFER_V2, FAST_APPROACH, MILESTONES,
)

MAROON = RGBColor(0x7A, 0x1E, 0x2B)
MAROON_DARK = RGBColor(0x5A, 0x15, 0x20)
GOLD = RGBColor(0xD4, 0xAF, 0x37)
INK = RGBColor(0x1C, 0x1C, 0x1E)
MUTED = RGBColor(0x8E, 0x8E, 0x93)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
HEADER_BG = "7A1E2B"
ALT_ROW = "F5F0EA"

doc = Document()
section = doc.sections[0]
section.page_width = Cm(21.0); section.page_height = Cm(29.7)
section.top_margin = Cm(2.0); section.bottom_margin = Cm(2.0)
section.left_margin = Cm(2.0); section.right_margin = Cm(2.0)

normal = doc.styles['Normal']
normal.font.name = 'Calibri'; normal.font.size = Pt(11); normal.font.color.rgb = INK

def style_h(level, size, color, sb=12, sa=6):
    s = doc.styles[f'Heading {level}']
    s.font.name = 'Calibri'; s.font.size = Pt(size); s.font.color.rgb = color; s.font.bold = True
    s.paragraph_format.space_before = Pt(sb); s.paragraph_format.space_after = Pt(sa)
    s.paragraph_format.keep_with_next = True

style_h(1, 22, MAROON, sb=20, sa=10)
style_h(2, 16, MAROON_DARK, sb=14, sa=6)
style_h(3, 13, INK, sb=10, sa=4)

def shade(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear'); shd.set(qn('w:color'), 'auto'); shd.set(qn('w:fill'), hex_color)
    tcPr.append(shd)

def borders(cell, color="CCCCCC", size="4"):
    tcPr = cell._tc.get_or_add_tcPr()
    tb = OxmlElement('w:tcBorders')
    for edge in ('top','left','bottom','right'):
        b = OxmlElement(f'w:{edge}')
        b.set(qn('w:val'), 'single'); b.set(qn('w:sz'), size); b.set(qn('w:color'), color)
        tb.append(b)
    tcPr.append(tb)

def para(text, bold=False, italic=False, size=11, color=INK, align=None, sa=4):
    p = doc.add_paragraph()
    if align is not None: p.alignment = align
    r = p.add_run(text)
    r.font.name = 'Calibri'; r.font.size = Pt(size); r.font.color.rgb = color
    r.bold = bold; r.italic = italic
    p.paragraph_format.space_after = Pt(sa)
    return p

def bullets(items):
    for item in items:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.left_indent = Cm(0.5); p.paragraph_format.space_after = Pt(2)
        if isinstance(item, tuple):
            label, rest = item
            r1 = p.add_run(label); r1.bold = True
            p.add_run(rest)
        else:
            p.add_run(item)

def table(headers, rows, widths_cm=None, banded=True):
    t = doc.add_table(rows=1+len(rows), cols=len(headers))
    t.alignment = WD_TABLE_ALIGNMENT.CENTER; t.autofit = False
    if widths_cm:
        for i, w in enumerate(widths_cm):
            for row in t.rows:
                row.cells[i].width = Cm(w)
    hdr = t.rows[0].cells
    for i, h in enumerate(headers):
        hdr[i].text = ''; shade(hdr[i], HEADER_BG); borders(hdr[i])
        p = hdr[i].paragraphs[0]; p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        r = p.add_run(h); r.bold = True; r.font.color.rgb = WHITE; r.font.size = Pt(10.5); r.font.name='Calibri'
        hdr[i].vertical_alignment = WD_ALIGN_VERTICAL.CENTER
    for ri, row in enumerate(rows):
        cells = t.rows[ri+1].cells
        for ci, val in enumerate(row):
            cells[ci].text = ''; borders(cells[ci])
            if banded and ri % 2 == 1: shade(cells[ci], ALT_ROW)
            p = cells[ci].paragraphs[0]
            p.paragraph_format.space_before = Pt(2); p.paragraph_format.space_after = Pt(2)
            r = p.add_run(str(val)); r.font.size = Pt(9.5); r.font.name = 'Calibri'; r.font.color.rgb = INK
            cells[ci].vertical_alignment = WD_ALIGN_VERTICAL.CENTER
    return t

def page_break():
    doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)

def divider():
    p = doc.add_paragraph()
    pPr = p._p.get_or_add_pPr()
    pBdr = OxmlElement('w:pBdr')
    b = OxmlElement('w:bottom')
    b.set(qn('w:val'), 'single'); b.set(qn('w:sz'), '6'); b.set(qn('w:space'), '1'); b.set(qn('w:color'), 'D4AF37')
    pBdr.append(b); pPr.append(pBdr)

# ─── COVER ───
for _ in range(3): doc.add_paragraph()
p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run('HADDIYA'); r.font.size = Pt(46); r.font.color.rgb = MAROON; r.bold = True
p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run('BACKEND × ZID INTEGRATION'); r.font.size = Pt(11); r.font.color.rgb = GOLD; r.bold = True
doc.add_paragraph(); divider(); doc.add_paragraph()
p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run('Backend Development Roadmap'); r.font.size = Pt(26); r.bold = True; r.font.color.rgb = INK
p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run('Module-wise Integration Plan with ZID Platform'); r.font.size = Pt(13); r.italic = True; r.font.color.rgb = MUTED
for _ in range(4): doc.add_paragraph()
meta_t = doc.add_table(rows=5, cols=2); meta_t.alignment = WD_TABLE_ALIGNMENT.CENTER
meta_rows = [
    ('Document Scope', 'Backend Services + ZID Platform Integration'),
    ('Frontend Status', 'Already designed and built (out of scope here)'),
    ('Prepared for', 'Executive Leadership, Engineering, Stakeholders'),
    ('Version', '1.0'),
    ('Date', datetime.now().strftime('%B %Y')),
]
for i, (k, v) in enumerate(meta_rows):
    c0, c1 = meta_t.rows[i].cells; c0.text=''; c1.text=''; shade(c0, ALT_ROW)
    r = c0.paragraphs[0].add_run(k); r.bold=True; r.font.size=Pt(10); r.font.color.rgb=MAROON
    r = c1.paragraphs[0].add_run(v); r.font.size=Pt(10); r.font.color.rgb=INK
    c0.width = Cm(5); c1.width = Cm(10)
page_break()

# ─── TOC ───
doc.add_heading('Table of Contents', level=1)
toc = [
    '1. Project Scope & ZID Platform Overview',
    '2. Integration Architecture & Principles',
    '3. Backend Development Timeframe',
    '4. Team Composition (Backend-Only)',
    '5. Module-wise ZID Integration Plan',
    '6. Phase-wise Delivery Plan',
    '7. Technical Architecture Stack',
    '8. Risk Analysis',
    '9. Final Recommendation',
]
for item in toc:
    p = doc.add_paragraph(); p.paragraph_format.space_after = Pt(4)
    r = p.add_run(item); r.font.size = Pt(12); r.font.color.rgb = INK
page_break()

# ─── 1. SCOPE ───
doc.add_heading('1. Project Scope & ZID Platform Overview', level=1)

doc.add_heading('1.1 Backend Scope', level=2)
para(PLATFORM_DESCRIPTION)

doc.add_heading('1.2 Why ZID?', level=2)
para(WHY_ZID)

doc.add_heading('1.3 Business Objectives', level=2)
table(['#', 'Objective', 'Target'], BUSINESS_OBJECTIVES, widths_cm=[1.2, 9, 6.5])

doc.add_heading('1.4 Backend System Components', level=2)
table(['Component', 'Description'], SYSTEM_COMPONENTS, widths_cm=[5, 11.7])
page_break()

# ─── 2. INTEGRATION ARCHITECTURE ───
doc.add_heading('2. Integration Architecture & Principles', level=1)
para(
    'Haddiya backend sits between the consumer apps and ZID. ZID is the system-of-record for all '
    'commerce primitives; Haddiya extends with marketplace, AI, and gifting logic. Six principles '
    'guide every integration decision:'
)
table(['Principle', 'Description'], INTEGRATION_PRINCIPLES, widths_cm=[5, 11.7])

doc.add_heading('2.1 High-level Data Flow', level=2)
para('Consumer App  →  Haddiya BFF  →  Haddiya Services  ↔  ZID Connector  ↔  ZID Platform', bold=True, color=MAROON_DARK)
bullets([
    'Reads: Mobile/web → BFF → Haddiya cache (Postgres + OpenSearch); cache hydrated from ZID via webhooks.',
    'Writes: Checkout, refunds, customer updates → Haddiya services → ZID API (with idempotency keys).',
    'Events: ZID webhooks → ingestion service → SQS → consumer workers (cache, ledger, notifications).',
    'Cron / safety net: Periodic reconciliation jobs catch any webhook misses.',
])
page_break()

# ─── 3. TIMEFRAME ───
doc.add_heading('3. Backend Development Timeframe', level=1)
para(
    'Frontend is already designed and built. These estimates cover backend services + ZID integration only. '
    'Buffer (~15%) included.', italic=True, color=MUTED
)
table(['Release', 'Scope', 'Weeks', 'Months', 'Notes'], TIMEFRAME, widths_cm=[3.5, 6, 1.5, 1.7, 4])
doc.add_paragraph()
para('Total cumulative duration (sequential): ~24 weeks / 6 months.', bold=True)
para('With parallel pods: ~22 weeks / 5 months to V1 production.', italic=True, color=MUTED)
page_break()

# ─── 4. TEAM ───
doc.add_heading('4. Team Composition (Backend-Only)', level=1)

doc.add_heading('4.1 Recommended V1 Backend Team', level=2)
table(['Role', 'HC', 'Engagement', 'Duration', 'Notes'], TEAM_V1, widths_cm=[4.5, 1.5, 3.5, 2.5, 4.7])

doc.add_heading('4.2 Three Team Size Options', level=2)
para(
    'Backend can ship with a smaller team over a longer timeline. Three viable configurations:'
)
table(['Option', 'Team Size', 'V1 Timeline', 'Composition', 'Tradeoff'], TEAM_OPTIONS, widths_cm=[3, 2, 2.5, 4.5, 4.7])

para('Honest take:', bold=True, color=MAROON)
para(
    '9–10 FTE is right-sized for delivering full backend V1 in 5 months with parallel pods. If budget '
    'or hiring is constrained, the Lean 5–6 FTE option ships the same scope in 7–8 months by removing '
    'parallelism and deferring AI/Data work to later phases.'
)
page_break()

# ─── 5. MODULES ───
doc.add_heading('5. Module-wise ZID Integration Plan', level=1)
para(
    'Each module shows what ZID provides natively, where Haddiya adds custom logic, and the effort in '
    'person-weeks (PW). Complexity reflects integration risk, not raw size.', italic=True, color=MUTED
)
table(
    ['#', 'Module', 'Description', 'ZID Coverage', 'Custom Effort', 'PW', 'Resources'],
    MODULES,
    widths_cm=[0.7, 3.0, 4.0, 2.7, 2.8, 0.7, 2.8],
)
doc.add_paragraph()
para('Total: ~273 person-weeks across 32 modules.', bold=True, color=MAROON)
page_break()

# ─── 6. PHASES ───
doc.add_heading('6. Phase-wise Delivery Plan', level=1)
for title, items, deliv in PHASES:
    doc.add_heading(title, level=2)
    bullets(items)
    para(deliv, italic=True, color=MAROON_DARK, size=10.5, sa=10)
page_break()

# ─── 7. ARCHITECTURE ───
doc.add_heading('7. Technical Architecture Stack', level=1)
table(['Layer', 'Recommendation', 'Rationale'], ARCHITECTURE, widths_cm=[3.5, 6.7, 6.5])
page_break()

# ─── 8. RISKS ───
doc.add_heading('8. Risk Analysis', level=1)

doc.add_heading('8.1 Technical & ZID-Specific Risks', level=2)
table(['Risk', 'Likelihood', 'Impact', 'Mitigation'], RISKS_TECH, widths_cm=[5.5, 2, 2, 6.2])

doc.add_heading('8.2 Scalability Concerns', level=2)
table(['Concern', 'Trigger', 'Mitigation'], RISKS_SCALE, widths_cm=[5, 4, 6.7])

doc.add_heading('8.3 Security Risks', level=2)
table(['Risk', 'Severity', 'Mitigation'], RISKS_SEC, widths_cm=[5.5, 2, 8.2])

doc.add_heading('8.4 Performance Bottlenecks', level=2)
table(['Bottleneck', 'Symptom', 'Fix'], RISKS_PERF, widths_cm=[5, 4, 6.7])
page_break()

# ─── 9. FINAL ───
doc.add_heading('9. Final Recommendation', level=1)

doc.add_heading('9.1 Backend MVP Feature Set', level=2)
para('Ship first:', bold=True)
bullets(MVP_FEATURES)

doc.add_heading('9.2 Defer to V1 / V2', level=2)
para('Defer to V1:', bold=True, color=MAROON)
bullets(DEFER_V1)
para('Defer to V2:', bold=True, color=MAROON)
bullets(DEFER_V2)

doc.add_heading('9.3 Best Timeline & Milestones', level=2)
table(['Milestone', 'Calendar Week', 'Outcome'], MILESTONES, widths_cm=[6, 3, 7.7])

doc.add_heading('9.4 Fastest Realistic Approach', level=2)
bullets(FAST_APPROACH)

doc.add_paragraph(); divider()
para('Bottom line:', bold=True, color=MAROON, size=12)
para(
    'A focused backend team of 9–10 FTE delivers production-ready ZID-integrated backend V1 in '
    '~5 months. ZID provides the commerce engine; Haddiya engineers build the marketplace, AI, and '
    'gifting differentiators on top. Backend launches alongside the already-completed frontend.',
    italic=True, size=11,
)

doc.add_paragraph(); divider()
p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run('Document prepared for executive review.\nAPI specifications, sprint backlog, and ZID partner contract details available as appendices.')
r.italic = True; r.font.size = Pt(10); r.font.color.rgb = MUTED

# Footer
fp = section.footer.paragraphs[0]; fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
fr = fp.add_run('Haddiya — Backend × ZID Integration Roadmap   •   Confidential')
fr.font.size = Pt(8); fr.font.color.rgb = MUTED

out = '/Users/alihassan/Desktop/haddiya-redesign/Haddiya_Backend_ZID_Integration.docx'
doc.save(out)
print('OK', out, os.path.getsize(out), 'bytes')
