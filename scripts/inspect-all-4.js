const https = require('https');

const slugs = ['bnpl-product-suite', 'collection', 'on-boarding-journey', 'dsa'];

const populateParams =
  "populate[0]=banner&populate[1]=sections&populate[2]=sections.models&populate[3]=sections.models.diagram&populate[4]=sections.stats&populate[5]=sections.image&populate[6]=sections.cards&populate[7]=sections.cards.icon&populate[8]=sections.cards.image&populate[9]=sections.left_features&populate[10]=sections.right_features&populate[11]=sections.image&populate[12]=feature_cards&populate[13]=feature_cards.icon&populate[14]=faq_section&populate[15]=faq_section.faqs&populate[16]=sections.items&populate[17]=sections.items.icon&populate[18]=sections.steps&populate[19]=sections.steps.icon&populate[20]=sections.companyLogo&populate[21]=sections.left_items&populate[22]=sections.left_items.icon&populate[23]=sections.right_items&populate[24]=sections.right_items.icon&populate[25]=sections.center_icon";

async function fetchSolution(slug) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'cms.ltflow.com',
      path: `/api/solutions?filters[slug][$eq]=${slug}&${populateParams}&status=draft`,
      headers: {
        Authorization: 'Bearer 5e7bc1eb16ae4f312c1c2f976c687115ad5d82989c717409d3bf9f7f1c864e069b9db1c9c03a21c806c227e0c60968bac50e365a1bc17ca56f5bde9fc44e8447fc0ecaf20a600a1cbb07c8ca793d3271e26ada8a52f78c1214ce6c98a60575fca35d5448d5d5be30693c2342a28e13a00855eec494dabb5a45ddbcb5335d85bb'
      }
    };
    https.get(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.data?.[0]);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const slug of slugs) {
    const sol = await fetchSolution(slug);
    if (!sol) {
      console.log(`=== ${slug}: NOT FOUND ===`);
      continue;
    }
    console.log(`\n========================================`);
    console.log(`SLUG: ${slug} | TITLE: ${sol.title} (ID: ${sol.id})`);
    console.log(`feature_cards_heading: ${sol.feature_cards_heading}`);
    console.log(`feature_cards count: ${sol.feature_cards?.length}`);
    console.log(`faq_section: ${sol.faq_section ? (sol.faq_section.title || 'Has FAQs') + ` (${sol.faq_section.faqs?.length} faqs)` : 'None'}`);
    console.log(`SECTIONS (${sol.sections?.length}):`);
    sol.sections?.forEach((s, i) => {
      console.log(`  [${i}] ID: ${s.id} | Component: ${s.__component}`);
      console.log(`      Title: ${s.title}`);
      console.log(`      Badge: ${s.badge}`);
      console.log(`      Description: ${s.description ? s.description.slice(0, 80) : null}`);
      if (s.cards) console.log(`      Cards: ${s.cards.length} cards (e.g. ${s.cards[0]?.title})`);
      if (s.models || s.model) console.log(`      Models: ${(s.models || s.model).length}`);
      if (s.stats) console.log(`      Stats: ${s.stats.length}`);
      if (s.features) console.log(`      Features: ${typeof s.features === 'string' ? s.features.slice(0, 60).replace(/\n/g, ' ') : s.features.length}`);
      if (s.left_features || s.right_features) console.log(`      Left/Right: left=${s.left_features?.length || 0}, right=${s.right_features?.length || 0}`);
    });
  }
}

run();
