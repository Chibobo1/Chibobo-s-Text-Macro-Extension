// Fetch all macros and listen for keydown events
chrome.storage.sync.get(["macros"], ({ macros }) => {
  document.addEventListener("keydown", (event) => {
    if (!macros) return;

    // Convert key event to match function keys like "F1" through "F12"
    const pressedKey = event.key.startsWith("F") ? event.key : event.key.toLowerCase();

    // Find the macro matching the pressed key (case-insensitive)
    const macro = macros.find(m => event.key.toLowerCase() === m.key.toLowerCase());
    if (macro) {
      event.preventDefault();

      const activeElement = document.activeElement;
      if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
        const start = activeElement.selectionStart;
        const end = activeElement.selectionEnd;
        const originalText = activeElement.value;

        activeElement.value = originalText.slice(0, start) + macro.text + originalText.slice(end);

        // Update cursor position
        activeElement.selectionStart = activeElement.selectionEnd = start + macro.text.length;
      }
    }
  });
});
