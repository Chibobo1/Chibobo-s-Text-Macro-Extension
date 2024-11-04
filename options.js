// Load the saved values when options.html is opened
document.addEventListener("DOMContentLoaded", () => {
  // Load existing macros
  chrome.storage.sync.get(["macros"], (data) => {
    const macros = data.macros || [];
    macros.forEach((macro, index) => {
      document.getElementById(`key${index + 1}`).value = macro.key;
      document.getElementById(`text${index + 1}`).value = macro.text;
    });
  });

  // Save the settings when the "Save" button is clicked
  document.getElementById("save").addEventListener("click", () => {
    const macros = [];
    for (let i = 1; i <= 5; i++) {
      const key = document.getElementById(`key${i}`).value;
      const text = document.getElementById(`text${i}`).value;
      if (key && text) {
        macros.push({ key, text });
      }
    }
    chrome.storage.sync.set({ macros }, () => {
      alert("Macros saved!");
    });
  });
});
