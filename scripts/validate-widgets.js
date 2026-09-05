const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const widgetsDir = path.join(__dirname, '..', 'widgets');
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);

function validateYamlBlock(source, block, errors) {
  try {
    yaml.load(block);
  } catch (e) {
    errors.push(`${source}: invalid YAML — ${e.message}`);
  }

  for (const [index, line] of block.split('\n').entries()) {
    const match = line.match(/^\s*[A-Za-z0-9_-]+:\s+(https?:\/\/\S*&\S*)\s*$/);
    if (match) {
      errors.push(`${source}: unquoted URL with query string on line ${index + 1}`);
    }
  }
}

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

    const templatePath = path.join(widgetPath, 'template.txt');
    if (fs.existsSync(templatePath)) {
      const template = fs.readFileSync(templatePath, 'utf8');
      const requiredMatch = template.match(/(?:^|\n)required: \|\n([\s\S]*)$/);
      if (requiredMatch) {
        validateYamlBlock('template.txt: required YAML', requiredMatch[1], errors);
      }
    }

    // contributing.md requires at least one preview image under images/
    const imagesDir = path.join(widgetPath, 'images');
    if (!fs.existsSync(imagesDir)) {
      errors.push('Missing images/ directory (at least one preview image is required)');
    } else {
      const hasImage = fs.readdirSync(imagesDir)
        .some(f => imageExtensions.has(path.extname(f).toLowerCase()));
      if (!hasImage) {
        errors.push('images/: no preview image found (at least one is required)');
      }
    }

    const widgetDocPath = path.join(widgetPath, 'widget.md');
    if (fs.existsSync(widgetDocPath)) {
      const widgetDoc = fs.readFileSync(widgetDocPath, 'utf8');
      const yamlBlocks = widgetDoc.matchAll(/```ya?ml\n([\s\S]*?)\n```/g);
      let blockIndex = 0;
      for (const block of yamlBlocks) {
        blockIndex += 1;
        validateYamlBlock(`widget.md: YAML code block #${blockIndex}`, block[1], errors);
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
