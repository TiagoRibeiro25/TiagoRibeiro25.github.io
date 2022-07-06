// Add Event Listeners to the discord button
document.querySelector("#discordNameBtn").addEventListener("click", () => {
  navigator.clipboard.writeText("-|GOLD|-#5063");
  document.querySelector("#discordMsg").style.display = "block";

  setTimeout(() => {
    document.querySelector("#discordMsg").style.display = "none";
  }, 5000);
});
