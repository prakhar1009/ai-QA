async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }
  
  // Event listener for the button
  document.getElementById("queryButton").addEventListener("click", async () => {
    const context = document.getElementById("context").value.trim();
    const question = document.getElementById("question").value.trim();
  
    if (!context || !question) {
      alert("Please provide both context and a question.");
      return;
    }
  
    document.getElementById("responseText").textContent = "Fetching response...";
  
    try {
      const response = await query({
        inputs: {
          question: question,
          context: context,
        },
      });
  
      document.getElementById("responseText").textContent = response.answer
        ? response.answer
        : "No answer found.";
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("responseText").textContent =
        "An error occurred while fetching the response.";
    }
  });
  