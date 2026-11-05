const { fetchSolution } = require('../ltflow/services/solutionsService');

async function test() {
  try {
    const sol = await fetchSolution('distribution');
    console.log('Sections:', sol.sections.map(s => ({ id: s.id, comp: s.__component, title: s.title, typeOfId: typeof s.id })));
    const secWorkflow = sol.sections.find(
      (s) =>
        s.__component === "solution.bnpl-workflow-section" ||
        s.__component === "solution.workflow-section" ||
        String(s.title || "").toLowerCase().includes("partner lifecycle") ||
        Boolean(s.left_features || s.right_features)
    );
    console.log('secWorkflow:', secWorkflow ? { id: secWorkflow.id, title: secWorkflow.title, typeOfId: typeof secWorkflow.id } : null);
    const handledIds = new Set([secWorkflow?.id].filter(Boolean));
    console.log('handledIds has 64?:', handledIds.has(64), 'has "64"?:', handledIds.has("64"));
    const additional = sol.sections.filter(s => s && (!s.id || !handledIds.has(s.id)));
    console.log('additional:', additional.map(a => ({ id: a.id, title: a.title })));
  } catch (e) {
    console.error(e);
  }
}
test();

