// Add Event Listeners to the discord button
document.querySelector("#discordNameBtn").addEventListener("click", () => {
  // Copy the discord name/id to the clipboard
  navigator.clipboard.writeText("-|GOLD|-#5063");

  // Show the discord name/id copied message
  document.querySelector("#discordMsg").style.display = "block";

  // Hide the discord name/id copied message after 5 seconds
  setTimeout(() => {
    document.querySelector("#discordMsg").style.display = "none";
  }, 5000);
});
