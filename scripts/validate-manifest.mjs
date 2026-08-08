import Ajv2020 from 'ajv/dist/2020.js';
import { readFile } from 'node:fs/promises';

const schemaUrl = 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json';
const schemaResponse = await fetch(schemaUrl);

if (!schemaResponse.ok) {
  throw new Error(`Could not fetch the plugin schema: ${schemaResponse.status} ${schemaResponse.statusText}`);
}

const schema = await schemaResponse.json();
const plugin = JSON.parse(await readFile(new URL('../plugin.json', import.meta.url), 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strict: true });
const validate = ajv.compile(schema);

if (!validate(plugin)) {
  console.error(ajv.errorsText(validate.errors, { separator: '\n' }));
  process.exitCode = 1;
} else {
  console.log('plugin.json valid');
}
