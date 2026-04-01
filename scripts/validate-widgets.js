const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const widgetsDir = path.join(__dirname, '..', 'widgets');

function validateWidgets() {
  if (!fs.existsSync(widgetsDir)) {
    console.error('widgets/ directory not found');
    process.exit(1);
  }

  const entries = fs.readdirSync(widgetsDir, { withFileTypes: true })
    .filter(e => e.isDirectory());

  if (entries.length === 0) {
    console.log('No widgets found, nothing to validate.');
    return;
  }

  let hasErrors = false;

  for (const entry of entries) {
    const widgetPath = path.join(widgetsDir, entry.name);
    const errors = [];

    const required = ['template.txt', 'widget.md', 'meta.yml'];
    for (const file of required) {
      if (!fs.existsSync(path.join(widgetPath, file))) {
        errors.push(`Missing ${file}`);
      }
    }


    const metaPath = path.join(widgetPath, 'meta.yml');
    if (fs.existsSync(metaPath)) {
      try {
        const meta = yaml.load(fs.readFileSync(metaPath, 'utf8'));
        for (const field of ['title', 'description', 'author']) {
          if (!meta || !meta[field] || typeof meta[field] !== 'string' || meta[field].trim() === '') {
            errors.push(`meta.yml: missing or empty "${field}"`);
          }
        }
      } catch (e) {
        errors.push(`meta.yml: invalid YAML — ${e.message}`);
      }
    }

    if (errors.length > 0) {
      hasErrors = true;
      console.error(`\n❌ ${entry.name}/`);
      errors.forEach(err => console.error(`   - ${err}`));
    } else {
      console.log(`✔ ${entry.name}/`);
    }
  }

  if (hasErrors) {
    console.error('\nValidation failed.');
    process.exit(1);
  }

  console.log('\nAll widgets valid.');
}

validateWidgets();
