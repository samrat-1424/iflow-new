const { Client } = require('pg');

async function main() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'ltflow'
  });
  await client.connect();

  const res = await client.query("SELECT id, document_id, title, slug, published_at FROM solutions WHERE title ILIKE '%bre%' OR slug ILIKE '%bre%'");
  console.log('BRE match in solutions:', res.rows);

  const allSolutions = await client.query("SELECT id, document_id, title, slug, published_at FROM solutions");
  console.log('All solutions count:', allSolutions.rows.length);
  for (const r of allSolutions.rows) {
    console.log(`  id=${r.id} doc_id=${r.document_id} title="${r.title}" slug="${r.slug}" pub=${r.published_at}`);
  }

  // Check all tables in schema
  const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
  console.log('Tables:', tables.rows.map(t => t.table_name));

  await client.end();
}

main().catch(console.error);

