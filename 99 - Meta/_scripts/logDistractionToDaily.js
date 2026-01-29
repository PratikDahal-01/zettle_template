// _quickadd/scripts/logDistractionToDaily.js
module.exports = async function logDistractionToDaily(params) {
  const { app, quickAddApi } = params;

  // -------------------------------------------------
  // 1. Get current time (editable)
  // -------------------------------------------------
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const time = await quickAddApi.inputPrompt("Time (HH:MM)", timeStr) || timeStr;

  // -------------------------------------------------
  // 2. What did you feel like doing?
  // -------------------------------------------------
  const action = await quickAddApi.inputPrompt(
    "What did you feel like doing? (e.g. watch YouTube, check phone)"
  );
  if (!action) return;

  // -------------------------------------------------
  // 3. Internal triggers — MULTI-SELECT (starts empty)
  // -------------------------------------------------
  const allTriggers = [
    "Afraid", "Frustrated", "Bored", "Excited",
    "Worried", "Angry", "Nervous", "Insecure",
    "Overwhelmed", "Hungry", "Sad", "Anxious",
    "Lonely", "Embarrassed", "Guilty", "Pressured",
    "Jealous", "Tired", "Confused", "Resentful",
    "Other"
  ];

  const selected = [];

  // Loop: Keep showing suggester until user picks "DONE"
  while (true) {
    const remaining = allTriggers.filter(t => !selected.includes(t));
    if (remaining.length === 0) break;

    const choice = await quickAddApi.suggester(
      [...remaining, "---DONE — Finish selection---"],
      [...remaining, "DONE"]
    );

    if (!choice || choice === "DONE") break;
    if (choice === "Other") {
      const other = await quickAddApi.inputPrompt("Specify other feeling:");
      if (other) selected.push(other.trim());
    } else {
      selected.push(choice);
    }
  }

  if (selected.length === 0) return;

  const triggerText = selected.join(", ");

  // -------------------------------------------------
  // 4. Optional reflection
  // -------------------------------------------------
  const reflection = await quickAddApi.inputPrompt("Reflection (optional)", "");

  // -------------------------------------------------
  // 5. Build the final line
  // -------------------------------------------------
  const line = `- ${time} : I felt like ${action}, because I was ${triggerText}` +
               (reflection ? `, *Reflection: ${reflection}*` : "");

  // -------------------------------------------------
  // 6. Find or create today's daily note
  // -------------------------------------------------
  const today = window.moment().format("YYYY-MM-DD");
  const year = today.split("-")[0];
  const month = today.split("-")[1];

  const folderPath = `06 - Calendar/01 - Daily/${year}/${month}`;
  const filePath = `${folderPath}/${today}.md`;

  let file = app.vault.getAbstractFileByPath(filePath);
  if (!file) {
    await app.vault.createFolder(folderPath).catch(() => {});
    file = await app.vault.create(filePath, `# ${today}\n\n## Distractions\n`);
  }

  // -------------------------------------------------
  // 7. Append the bullet line
  // -------------------------------------------------
  await app.vault.append(file, "\n" + line);
  new Notice("Distraction logged!");
};