document
  .getElementById("film-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const filmLists = JSON.parse(document.getElementById("film-lists").value);

    try {
      const response = await fetch("/get-top-films", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ filmLists }),
      });

      if (response.ok) {
        const scores = await response.json();
        displayResults(scores);
      } else {
        alert(
          "Invalid data format. Please ensure your data is formatted correctly."
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

function displayResults(scores) {
  try {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");
    const filmHeader = document.createElement("th");
    const scoreHeader = document.createElement("th");
    filmHeader.textContent = "Film";
    scoreHeader.textContent = "Score";
    headerRow.appendChild(filmHeader);
    headerRow.appendChild(scoreHeader);
    thead.appendChild(headerRow);

    scores.forEach(([film, score]) => {
      const row = document.createElement("tr");
      const filmCell = document.createElement("td");
      const scoreCell = document.createElement("td");
      filmCell.textContent = film;
      scoreCell.textContent = score.toFixed(2);
      row.appendChild(filmCell);
      row.appendChild(scoreCell);
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    resultsDiv.appendChild(table);
  } catch (error) {
    console.error("Error displaying results:", error);
  }
}
