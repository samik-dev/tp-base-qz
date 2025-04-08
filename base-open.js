  const options = document.querySelectorAll('.option');
  const attemptedCount = document.getElementById('attemptedCount');
  const correctCount = document.getElementById('correctCount');
  const wrongCount = document.getElementById('wrongCount');
  const resetButton = document.getElementById('resetButton');
  const message = document.getElementById('message');
  const modeToggle = document.getElementById('modeToggle');
  const reportCard = document.getElementById('reportCard');
  let totalQuestions = 0;
  let correctAnswers = 0;
  // Function to update the report card message
  function updateMessage() {
    const percentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
    if (percentage === 100) {
      message.textContent = "Excellent work!";
      message.style.color = "green";
    } else if (percentage >= 70) {
      message.textContent = "Good job!";
      message.style.color = "blue";
    } else {
      message.textContent = "Keep Practicing!";
      message.style.color = "#007acc";
    }
  }
  // Function to show all correct answers
  function showAllAnswers() {
    options.forEach(option => {
      const questionId = option.getAttribute('data-question');
      const isCorrect = option.getAttribute('data-correct') === 'true';
      const explanationId = 'explanation' + questionId.replace('question', '');
      if (isCorrect) {
        option.classList.add('correct');
      }
      // Disable all options
      option.style.pointerEvents = 'none';
    });
    // Show all explanations
    const explanations = document.querySelectorAll('.explanation');
    explanations.forEach(exp => {
      exp.style.display = 'block';
    });
    // Hide the report card
    reportCard.style.display = 'none';
    // Update report card counts based on correct answers
    const allCorrect = document.querySelectorAll('.option[data-correct="true"]').length;
    const allQuestions = document.querySelectorAll('.question').length;
    attemptedCount.textContent = allQuestions;
    correctCount.textContent = allCorrect;
    wrongCount.textContent = allQuestions - allCorrect;
    // Update the message
    if (allCorrect === allQuestions) {
      message.textContent = "Excellent work!";
      message.style.color = "green";
    } else if ((allCorrect / allQuestions) * 100 >= 70) {
      message.textContent = "Good job!";
      message.style.color = "blue";
    } else {
      message.textContent = "Keep Practicing!";
      message.style.color = "#007acc";
    }
  }
  // Function to switch to Practice mode
  function switchToPractice() {
    options.forEach(option => {
      option.style.pointerEvents = 'auto';
      // Reset classes
      option.classList.remove('correct', 'wrong', 'selected');
      // Hide explanations
      const questionId = option.getAttribute('data-question');
      const explanationId = 'explanation' + questionId.replace('question', '');
      const explanationDiv = document.getElementById(explanationId);
      if (explanationDiv) {
        explanationDiv.style.display = 'none';
      }
    });
    // Show the report card
    reportCard.style.display = 'block';
    // Reset counts and message
    attemptedCount.textContent = totalQuestions;
    correctCount.textContent = correctAnswers;
    wrongCount.textContent = totalQuestions - correctAnswers;
    updateMessage();
  }
  options.forEach(option => {
    option.addEventListener('click', () => {
      if (modeToggle.checked) {
        // If in Show All Answers mode, do nothing
        return;
      }
      const questionId = option.getAttribute('data-question');
      const isCorrect = option.getAttribute('data-correct') === 'true';
      const explanationId = 'explanation' + questionId.replace('question', '');
      // Check if any option for this question is already selected
      const previouslySelected = document.querySelector(`.option.selected[data-question="${questionId}"]`);
      if (!previouslySelected) {
        totalQuestions++;
        if (isCorrect) {
          correctAnswers++;
        }
        // Disable all options for the current question
        options.forEach(o => {
          if (o.getAttribute('data-question') === questionId) {
            o.style.pointerEvents = 'none'; // Disables further clicks
          }
        });
      }
      // Remove any previous selections and apply correct/wrong classes
      options.forEach(o => {
        if (o.getAttribute('data-question') === questionId) {
          o.classList.remove('selected', 'correct', 'wrong');
          if (o === option) {
            o.classList.add('selected');
            if (isCorrect) {
              o.classList.add('correct');
            } else {
              o.classList.add('wrong');
            }
          }
        }
      });
      // Highlight the correct answer if the selected option is wrong
      if (!isCorrect) {
        options.forEach(o => {
          if (o.getAttribute('data-question') === questionId && o.getAttribute('data-correct') === 'true') {
            o.classList.add('correct');
          }
        });
      }
      // Show the explanation
      const explanationDiv = document.getElementById(explanationId);
      if (explanationDiv) {
        explanationDiv.style.display = 'block';
      }
      // Update the counts
      attemptedCount.textContent = totalQuestions;
      correctCount.textContent = correctAnswers;
      wrongCount.textContent = totalQuestions - correctAnswers;
      // Update the message based on performance
      updateMessage();
    });
  });
  // Reset button logic
  resetButton.addEventListener('click', () => {
    totalQuestions = 0;
    correctAnswers = 0;
    // Reset all options and counts
    options.forEach(option => {
      option.classList.remove('selected', 'correct', 'wrong');
      option.style.pointerEvents = 'auto'; // Re-enable clicking for all options
    });
    // Hide all explanations
    const explanations = document.querySelectorAll('.explanation');
    explanations.forEach(exp => {
      exp.style.display = 'none';
    });
    attemptedCount.textContent = '0';
    correctCount.textContent = '0';
    wrongCount.textContent = '0';
    message.textContent = 'Keep Practicing!';
    message.style.color = "#007acc";
    // Reset toggle to Practice mode if it was in Show All Answers mode
    if (modeToggle.checked) {
      modeToggle.checked = false;
      switchToPractice();
    }
  });
  // Toggle switch logic
  modeToggle.addEventListener('change', () => {
    if (modeToggle.checked) {
      // Switch to Show All Answers mode
      showAllAnswers();
    } else {
      // Switch to Practice mode
      switchToPractice();
    }
  });
