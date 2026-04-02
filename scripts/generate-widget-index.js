const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const widgetsDir = path.join(__dirname, '..', 'widgets');
const databaseDir = path.join(__dirname, '..', 'database');

const TEMPLATE_URL_BASE = 'https://raw.githubusercontent.com/Panonim/dynawidgets/refs/heads/main/widgets';

function generateIndex() {
  if (!fs.existsSync(databaseDir)) {
    fs.mkdirSync(databaseDir, { recursive: true });
  }

  // Clear existing list-*.json files
  const existing = fs.readdirSync(databaseDir).filter(f => /^list-[a-z]\.json$/.test(f));
  for (const file of existing) {
    fs.unlinkSync(path.join(databaseDir, file));
  }

  const entries = fs.readdirSync(widgetsDir, { withFileTypes: true })
    .filter(e => e.isDirectory());

  const groups = {};

  for (const entry of entries) {
    const metaPath = path.join(widgetsDir, entry.name, 'meta.yml');
    if (!fs.existsSync(metaPath)) continue;

    const meta = yaml.load(fs.readFileSync(metaPath, 'utf8'));
    if (!meta || !meta.title) continue;

    const letter = entry.name[0].toLowerCase();
    if (!groups[letter]) groups[letter] = [];

    groups[letter].push({
      title: meta.title,
      description: meta.description,
      author: meta.author,
      slug: entry.name,
      template: `${TEMPLATE_URL_BASE}/${entry.name}/template.txt`
    });
  }

  // Sort entries within each group by title
  for (const letter of Object.keys(groups)) {
    groups[letter].sort((a, b) => a.title.localeCompare(b.title));
    const outPath = path.join(databaseDir, `list-${letter}.json`);
    fs.writeFileSync(outPath, JSON.stringify(groups[letter], null, 2) + '\n');
    console.log(`Generated ${outPath}`);
  }

  console.log(`Done. ${Object.keys(groups).length} database file(s) written.`);
}

generateIndex();
