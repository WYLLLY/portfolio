"""Build the one-page, seven-project bilingual CVs used by the portfolio."""
from pathlib import Path
from docx import Document
from docx.shared import Mm, Pt, RGBColor
from docx.enum.text import WD_TAB_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE as RT

ROOT = Path(__file__).parent
OUT = ROOT / 'output'
SITE = 'https://portfolio-wheat-five-66.vercel.app'
PROJECT_SLUGS = [
 'payment-ledger-system', 'ai-task-execution-platform',
 'fraud-detection-ml-service', 'workspace-saas-platform',
 'python-code-analyzer', 'security-log-analyzer', 'snapshot-backup-engine',
]
PUBLIC_REPOS = set(PROJECT_SLUGS[:3])
INK = '182420'
MUTED = '505B56'
ACCENT = '315B4B'
LINE = 'CFD7D1'

DATA = {'EN': {'role': 'Junior Python Developer',
        'sections': ['Technical Projects',
                     'Technical Skills',
                     'Professional Experience',
                     'Education',
                     'Interests'],
        'personal': 'Personal projects',
        'projects': [('Payment & Ledger System',
                      'Python, FastAPI, PostgreSQL, SQLAlchemy, Alembic',
                      ['Immutable double-entry ledger, atomic transfers and idempotent APIs with SQL '
                       'constraints.',
                       'Outbox workers and simulated-provider reconciliation; PostgreSQL concurrency and '
                       'recovery tests.']),
                     ('AI Task Execution Platform',
                      'Python, FastAPI, PostgreSQL, Redis, HTTPX',
                      ['Durable tasks with cancellation, worker leases, fencing and retained idempotency '
                       'responses.',
                       'Workflow costs and Server-Sent Events (SSE); PostgreSQL fallback, simulated providers.']),
                     ('Fraud Detection ML Service',
                      'Python, scikit-learn, PyTorch, FastAPI, NumPy',
                      ['Compared logistic regression and MLP on 60,000 synthetic rows; training-only '
                       'preprocessing.',
                       'Versioned inference API and read-only Payment scoring CLI. No validation on real '
                       'fraud data.']),
                     ('Python Code Analyzer',
                      'Python 3.14, ast, Typer, Rich',
                      ['Resolved imports, built graphs and found cycles with iterative Tarjan, without '
                       'running target code.',
                       'Coupling metrics and deterministic JSON; strict TDD, 682 passing tests and '
                       'independent review.'])],
        'skills': [('Languages and APIs', 'Python, SQL, FastAPI, Pydantic, REST APIs, asyncio'),
                   ('Databases', 'PostgreSQL, SQLAlchemy, Alembic, Redis'),
                   ('Testing and delivery',
                    'pytest, Ruff, mypy, Pyright, Docker, Docker Compose, Git, GitHub Actions'),
                   ('Machine learning', 'scikit-learn, PyTorch, NumPy, model evaluation, API inference')],
        'jobs': [('KILO Shop', 'Sales Assistant', '2023–2026'),
                 ('UNIQLO', 'Sales Assistant', '2021–2023'),
                 ('McDonald’s', 'Crew Member', '2018–2019')],
        'education': ['Bachelor’s degree in Philosophy (Licence), Sorbonne | 2021',
                      'Baccalauréat STMG | Lycée Clemenceau, Villemomble | 2018'],
        'interests': 'Philosophy, literature, music, boxing, weight training.'},
 'FR': {'role': 'Développeur Python junior',
        'sections': ['Projets techniques',
                     'Compétences techniques',
                     'Expérience professionnelle',
                     'Formation',
                     'Centres d’intérêt'],
        'personal': 'Projets personnels',
        'projects': [('Payment & Ledger System',
                      'Python, FastAPI, PostgreSQL, SQLAlchemy, Alembic',
                      ['Grand livre en partie double, transferts atomiques et API idempotentes avec '
                       'contraintes SQL.',
                       'Outbox et prestataire simulé ; tests de concurrence et de reprise sur '
                       'PostgreSQL.']),
                     ('AI Task Execution Platform',
                      'Python, FastAPI, PostgreSQL, Redis, HTTPX',
                      ['Tâches durables : annulation, baux de workers, contrôle des générations et '
                       'idempotence.',
                       'Workflows, coûts et Server-Sent Events (SSE) ; repli PostgreSQL. Fournisseurs '
                       'simulés.']),
                     ('Fraud Detection ML Service',
                      'Python, scikit-learn, PyTorch, FastAPI, NumPy',
                      ['Régression logistique et MLP sur 60 000 données synthétiques ; prétraitement sur '
                       'entraînement.',
                       'API d’inférence et CLI Payment en lecture seule ; résultats non validés sur des '
                       'fraudes réelles.']),
                     ('Python Code Analyzer',
                      'Python 3.14, ast, Typer, Rich',
                      ['Imports, graphes et cycles par Tarjan itératif, sans exécuter le code analysé.',
                       'Couplage et JSON déterministe ; TDD strict, 682 tests réussis et revue '
                       'indépendante.'])],
        'skills': [('Langages et API', 'Python, SQL, FastAPI, Pydantic, API REST, asyncio'),
                   ('Bases de données', 'PostgreSQL, SQLAlchemy, Alembic, Redis'),
                   ('Tests et livraison',
                    'pytest, Ruff, mypy, Pyright, Docker, Docker Compose, Git, GitHub Actions'),
                   ('Machine learning',
                    'scikit-learn, PyTorch, NumPy, évaluation de modèles, inférence API')],
        'jobs': [('KILO Shop', 'Vendeur', '2023–2026'),
                 ('UNIQLO', 'Vendeur', '2021–2023'),
                 ('McDonald’s', 'Équipier polyvalent', '2018–2019')],
        'education': ['Licence de philosophie, Sorbonne | 2021',
                      'Baccalauréat STMG | Lycée Clemenceau, Villemomble | 2018'],
        'interests': 'Philosophie, littérature, musique, boxe anglaise, musculation.'}}

# This revision keeps the source CV's identity, employment, education and
# restrained layout. Project descriptions are short enough for one A4 page.
DATA['EN']['role'] = 'Junior Software Engineer · Backend'
DATA['FR']['role'] = 'Développeur logiciel junior · backend'
DATA['EN']['skills'] = [
 ('Languages and APIs', 'Python, Java, SQL, FastAPI, Spring Boot, REST APIs'),
 ('Data and async', 'PostgreSQL, SQLAlchemy, Redis, SQLite, SSE, asynchronous processing'),
 ('Testing and delivery', 'pytest, JUnit, Ruff, mypy, Pyright, Docker, GitHub Actions'),
 ('ML and tooling', 'scikit-learn, PyTorch, AST, Typer, Git'),
]
DATA['FR']['skills'] = [
 ('Langages et API', 'Python, Java, SQL, FastAPI, Spring Boot, API REST'),
 ('Données et asynchrone', 'PostgreSQL, SQLAlchemy, Redis, SQLite, SSE, traitements asynchrones'),
 ('Tests et livraison', 'pytest, JUnit, Ruff, mypy, Pyright, Docker, GitHub Actions'),
 ('ML et outils', 'scikit-learn, PyTorch, AST, Typer, Git'),
]
DATA['EN']['projects'] = [
 ('Payment & Ledger System', 'Double-entry ledger, idempotent transfers and recoverable payments; PostgreSQL concurrency tests.'),
 ('AI Task Execution Platform', 'Durable AI workflows with worker recovery, SSE, bounded tools and cost reconciliation; simulated providers.'),
 ('Fraud Detection ML Service', 'Synthetic-risk model evaluation and local inference; read-only Payment scoring, no real-fraud validation.'),
 ('Workspace — Multi-Tenant SaaS Platform', 'Java/Spring Boot SaaS with PostgreSQL tenant isolation, versioned tasks, secure sessions and recovery tests.'),
 ('Python Code Analyzer', 'Static import graphs and deterministic reports; analyzed code is never executed.'),
 ('Security Log Analyzer', 'In development: offline SSH-log alerts; later reporting remains under review.'),
 ('Snapshot Backup Engine', 'Deduplicated local backups with SQLite manifests and tested interruption recovery.'),
]
DATA['FR']['projects'] = [
 ('Payment & Ledger System', 'Grand livre en partie double, transferts idempotents et paiements récupérables ; tests concurrents PostgreSQL.'),
 ('AI Task Execution Platform', 'Workflows IA durables, reprise des workers, SSE, outils bornés et suivi des coûts ; fournisseurs simulés.'),
 ('Fraud Detection ML Service', 'Évaluation sur données synthétiques et inférence locale ; score Payment en lecture seule, sans validation sur fraude réelle.'),
 ('Workspace — Multi-Tenant SaaS Platform', 'SaaS Java/Spring Boot : isolation PostgreSQL des organisations, tâches versionnées, sessions et tests de reprise.'),
 ('Python Code Analyzer', 'Graphes d’imports et rapports déterministes, sans exécuter le code analysé.'),
 ('Security Log Analyzer', 'En développement : alertes hors ligne sur logs SSH ; rapports avancés encore en revue.'),
 ('Snapshot Backup Engine', 'Sauvegardes locales dédupliquées, manifestes SQLite et reprise après interruption.'),
]

def font(run, size=11, bold=False, color=INK, family='Arial'):
 run.font.name = family
 run.font.size = Pt(size)
 run.font.bold = bold
 run.font.color.rgb = RGBColor.from_string(color)
 return run

def para(doc, before=0, after=0, line=13.4, keep=False):
 p = doc.add_paragraph()
 fmt = p.paragraph_format
 fmt.space_before = Pt(before)
 fmt.space_after = Pt(after)
 fmt.line_spacing = Pt(line)
 fmt.keep_with_next = keep
 fmt.widow_control = True
 return p

def link(p, label, url, size=9.5, color=MUTED):
 h = OxmlElement('w:hyperlink')
 h.set(qn('r:id'), p.part.relate_to(url, RT.HYPERLINK, is_external=True))
 r = OxmlElement('w:r'); pr = OxmlElement('w:rPr')
 for name, value in [('rFonts', None), ('color', color), ('sz', str(int(size*2)))]:
  e = OxmlElement('w:'+name)
  if name == 'rFonts':
   e.set(qn('w:ascii'), 'Arial'); e.set(qn('w:hAnsi'), 'Arial')
  else: e.set(qn('w:val'), value)
  pr.append(e)
 u = OxmlElement('w:u'); u.set(qn('w:val'), 'single'); pr.append(u)
 r.append(pr); t = OxmlElement('w:t'); t.text = label; r.append(t)
 h.append(r); p._p.append(h)

def right_tab(p):
 p.paragraph_format.tab_stops.add_tab_stop(Mm(174), WD_TAB_ALIGNMENT.RIGHT)

def heading(doc, label):
 p = para(doc, before=10, after=6, line=12, keep=True)
 p.style = 'Heading 1'
 r = font(p.add_run(label.upper()), 9, True, ACCENT)
 spacing = OxmlElement('w:spacing'); spacing.set(qn('w:val'), '20')
 r._element.get_or_add_rPr().append(spacing)
 borders = OxmlElement('w:pBdr'); bottom = OxmlElement('w:bottom')
 for key, val in [('val','single'), ('sz','4'), ('space','5'), ('color',LINE)]:
  bottom.set(qn('w:'+key), val)
 borders.append(bottom); p._p.get_or_add_pPr().append(borders)

def build(lang, data):
 doc = Document(); sec = doc.sections[0]
 sec.page_width = Mm(210); sec.page_height = Mm(297)
 sec.top_margin = Mm(16); sec.bottom_margin = Mm(15)
 sec.left_margin = Mm(18); sec.right_margin = Mm(18)
 normal = doc.styles['Normal']
 normal.font.name = 'Arial'; normal.font.size = Pt(11)
 normal.font.color.rgb = RGBColor.from_string(INK)
 normal.paragraph_format.widow_control = True
 for style_name in ['Title', 'Heading 1']:
  style = doc.styles[style_name]
  for border in list(style.element.iter(qn('w:pBdr'))):
   border.getparent().remove(border)
 p = para(doc, after=6, line=35, keep=True); p.style = 'Title'
 font(p.add_run('William Decatoire'), 30, False, '111A16', 'Georgia')
 p = para(doc, after=7, line=15, keep=True)
 font(p.add_run(data['role']), 12, False, ACCENT)
 p = para(doc, after=3, line=12, keep=True)
 font(p.add_run('Paris, France   /   '), 9.5, color=MUTED)
 link(p, '+33 6 58 67 59 90', 'tel:+33658675990')
 font(p.add_run('   /   '), 9.5, color=MUTED)
 link(p, 'willdec93250@gmail.com', 'mailto:willdec93250@gmail.com')
 p = para(doc, after=0, line=12, keep=True)
 link(p, 'github.com/WYLLLY', 'https://github.com/WYLLLY')
 font(p.add_run('   /   '), 9.5, color=MUTED)
 link(p, 'Portfolio', SITE+'/')

 heading(doc, data['sections'][1])
 for label, value in data['skills']:
  p = para(doc, after=2, line=13.4)
  font(p.add_run(label+'  '), 10.5, True)
  font(p.add_run(value), 10.5)

 heading(doc, 'Personal projects' if lang=='EN' else 'Projets personnels')
 for i, (title, description) in enumerate(data['projects'][:4]):
  p = para(doc, before=6 if i else 0, after=2, line=14.5, keep=True)
  font(p.add_run(title), 11.5, True)
  right_tab(p); font(p.add_run('\t'), 9)
  slug = PROJECT_SLUGS[i]
  url = ('https://github.com/WYLLLY/'+slug) if slug in PUBLIC_REPOS else (SITE+'/projects/'+slug)
  link(p, 'GitHub' if slug in PUBLIC_REPOS else ('Case study' if lang=='EN' else 'Présentation'), url, 9, ACCENT)
  p = para(doc, after=1, line=13.2)
  font(p.add_run(description), 10.5)

 p = para(doc, before=8, after=4, line=11, keep=True)
 font(p.add_run('ADDITIONAL PROJECTS' if lang == 'EN' else 'AUTRES PROJETS'), 9, True, ACCENT)
 for i, (title, description) in enumerate(data['projects'][4:], start=4):
  p = para(doc, before=3, after=1, line=13.2)
  link(p, title, SITE+'/projects/'+PROJECT_SLUGS[i], 10.5, ACCENT)
  font(p.add_run(' — '+description), 10.5)

 heading(doc, 'Certification goals' if lang=='EN' else 'Certifications visées')
 for code, title in [('GH-200','GitHub Actions'), ('GH-600','Agentic AI Developer')]:
  p = para(doc, after=3, line=13.4); right_tab(p)
  font(p.add_run(code+'  '), 11, True); font(p.add_run(title), 11)
  font(p.add_run('\t'+('Not yet earned' if lang=='EN' else 'Non obtenue')), 9.5, color=MUTED)

 heading(doc, data['sections'][2])
 for company, role, dates in data['jobs']:
  p = para(doc, after=3, line=13.4); right_tab(p)
  font(p.add_run(company+'  '), 11, True); font(p.add_run(role), 11)
  font(p.add_run('\t'+dates), 10, color=MUTED)

 heading(doc, data['sections'][3])
 for item in data['education']:
  label, year = item.rsplit(' | ', 1)
  label = label.replace(' | ', ', ')
  p = para(doc, after=3, line=13.4); right_tab(p)
  font(p.add_run(label), 11)
  font(p.add_run('\t'+year), 10, color=MUTED)

 doc.core_properties.author = 'William Decatoire'
 doc.core_properties.title = 'William Decatoire CV '+lang
 doc.core_properties.subject = data['role']
 doc.core_properties.language = 'en-GB' if lang=='EN' else 'fr-FR'
 OUT.mkdir(exist_ok=True)
 doc.save(OUT/f'William_Decatoire_CV_{lang}.docx')

if __name__ == '__main__':
 for lang, data in DATA.items():
  build(lang, data)
