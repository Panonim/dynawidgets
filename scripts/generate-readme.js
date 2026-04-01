const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const widgetsDir = path.join(__dirname, '..', 'widgets');
const readmePath = path.join(__dirname, '..', 'readme.md');

const START_MARKER = '<!-- AUTO-GENERATED:START -->';
const END_MARKER = '<!-- AUTO-GENERATED:END -->';

function generateReadmeSection() {
  const entries = fs.readdirSync(widgetsDir, { withFileTypes: true })
    .filter(e => e.isDirectory());

  const groups = {};

  for (const entry of entries) {
    const metaPath = path.join(widgetsDir, entry.name, 'meta.yml');
    if (!fs.existsSync(metaPath)) continue;

    const meta = yaml.load(fs.readFileSync(metaPath, 'utf8'));
    if (!meta || !meta.title) continue;

    const letter = meta.title[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];

    groups[letter].push({
      title: meta.title,
      description: meta.description,
      author: meta.author
    });
  }

  const sortedLetters = Object.keys(groups).sort();

  // Sort entries within each group
  for (const letter of sortedLetters) {
    groups[letter].sort((a, b) => a.title.localeCompare(b.title));
  }

  // Build search line
  const lines = [];
  lines.push('## Search');
  lines.push(sortedLetters.map(l => `[${l}](#${l.toLowerCase()})`).join(' | '));
  lines.push('');

  // Build each letter section
  for (const letter of sortedLetters) {
    lines.push(`## ${letter}`);
    for (const widget of groups[letter]) {
      lines.push(`- **${widget.title}** — ${widget.description}`);
      lines.push(`  - Author: ${widget.author}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

function updateReadme() {
  let content = fs.readFileSync(readmePath, 'utf8');

  const section = generateReadmeSection();

  const startIdx = content.indexOf(START_MARKER);
  const endIdx = content.indexOf(END_MARKER);

  if (startIdx !== -1 && endIdx !== -1) {
    // Replace between markers
    content = content.substring(0, startIdx + START_MARKER.length) +
      '\n' + section +
      content.substring(endIdx);
  } else {
    console.error('AUTO-GENERATED markers not found in readme.md');
    process.exit(1);
  }

  fs.writeFileSync(readmePath, content);
  console.log('README widget section updated.');
}

updateReadme();
