  let categorySlides = [], questionSlides = [];
  let currentCatSlide = 0, currentQuestion = 0;
  let countdownInterval, currentQuestions = [], userAnswers = [];

  const renderCategorySlides = (categories) => {
    const allCats = Object.keys(categories);
    const chunks = Array.from({ length: Math.ceil(allCats.length / 6) }, (_, i) => allCats.slice(i * 6, i * 6 + 6));
    $('#category-slides').empty();
    chunks.forEach((chunk, index) => {
      const categoryHTML = chunk.map(cat =>
        `<div class="categories" data-category="${cat}">${cat}</div>`).join('');

      const bubblesHTML = chunks.map((_, i) =>
        `<span class="bubble ${i === index ? 'active' : ''}" data-index="${i}"></span>`).join('');

      const slideHTML = `
        <div class="slide ${index === 0 ? 'slide_active' : ''}">
          <div class="category_alignment">${categoryHTML}</div>
          <div class="bubble_div">${bubblesHTML}</div>
        </div>
      `;

      $('#category-slides').append(slideHTML);
    });

    categorySlides = $('.slide');
  };

  const showCatSlide = (index) => {
    categorySlides.removeClass('slide_active').eq(index).addClass('slide_active');
  };

  const renderQuestions = (category, questions) => {
    currentQuestions = questions;
    userAnswers = [];
    $('#question-slides').empty();

    questions.forEach((q, idx) => {
      const allOptions = [...q.incorrectAnswers, q.correctAnswer].sort(() => Math.random() - 0.5);
      const optionsHTML = allOptions.map((opt, i) => {
        const inputId = `q${idx}_opt${i}`;
        return `
          <li>
            <input type="radio" name="q${idx}" id="${inputId}" value="${opt}">
            <label class="option_button" for="${inputId}">${opt}</label>
          </li>`;
      }).join('');

      const questionHTML = `
        <div class="question-slide ${idx === 0 ? 'question-active' : ''}">
          <div class="question_number">${idx + 1}</div>
          <div class="timer" id="timer-${idx}">30s</div>
          <h3 style="width: 100%;background-color: #007791;color: white;border: 2px solid #007bff;padding: 10px;border-radius: 8px;text-align: center;font-weight:normal;
    ">${q.question}</h3>
          <ul class="option_alignment">${optionsHTML}</ul>
          <div class="restBtn_position"><button class="resetBtn">Reset</button></div>
        </div>
      `;

      $('#question-slides').append(questionHTML);
    });

    questionSlides = $('.question-slide');
    currentQuestion = 0;
    startTimer(currentQuestion);
  };

  const showQuestionSlide = (index) => {
    if (index >= questionSlides.length) return showResults();

    questionSlides.removeClass('question-active').eq(index).addClass('question-active');
    startTimer(index);
  };

  const startTimer = (index) => {
    clearInterval(countdownInterval);
    let timeLeft = 30;
    const $timer = $(`#timer-${index}`);
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };
    $timer.text(formatTime(timeLeft));
    countdownInterval = setInterval(() => {
      timeLeft--;
      $timer.text(formatTime(timeLeft));
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        if (!userAnswers[index]) userAnswers[index] = null;
        goToNextQuestion();
      }
    }, 1000);
  };

  const goToNextQuestion = () => {
    clearInterval(countdownInterval);
    currentQuestion++;
    showQuestionSlide(currentQuestion);
  };

  const showResults = () => {
    $('#question-slides').hide();
    $('#results-wrapper').show();

    let correctCount = 0;
    const resultHTML = currentQuestions.map((q, idx) => {
      const userAns = userAnswers[idx] || "Answer Missed";
      const isCorrect = userAns === q.correctAnswer;
      if (isCorrect) correctCount++;

return `
  <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 20px;">
    <div style="
      width: 65%;
      background-color: #007791;
      color: white;
      border: 2px solid #007bff;
      padding: 10px;
      border-radius: 8px;
      text-align: center;
    ">
      ${q.question}
    </div>
    <div style="
      width: 20%;
      background-color: #007791;
      color: white;
      border: 2px solid #007bff;
      padding: 10px;
      border-radius: 8px;
      text-align: center;
    ">
      ${q.correctAnswer}
    </div>
  </div>
`;

    }).join('');

    const percentage = (correctCount / currentQuestions.length) * 100;
    const gradeLabel = percentage >= 60 ? 'Winner' : percentage >= 40 ? 'Better' : 'Failed';

    const gradeHTML = `
      <hr>
      <div style="margin-bottom: 20px; display: flex; justify-content: center;">
        <button class="option_button" style="
          background-color: #007791;
          color: white;
          border: 2px solid #007bff;
          padding: 6px 12px;
          border-radius: 8px;
          margin-top: 5px;
          width: 40%;
        ">${gradeLabel}</button>
      </div>
    `;

    $('#results-content').html(resultHTML + gradeHTML);
  };

  $(document).ready(() => {
    const loadCategories = () => {
      $.get('/quiz/categories', (data) => {
        renderCategorySlides(data);
        showCatSlide(0);
        $('#category-wrapper').show();
        $('#question-slides, #results-wrapper').hide();
        $('.online_quiz_header').show();
      }).fail(() => {
        $('#category-slides').html('<p>Something went wrong.</p>');
      });
    };

    loadCategories();

    $(document)
      .on('click', '.bubble', function () {
        showCatSlide($(this).data('index'));
      })
      .on('click', '.categories', function () {
        const category = $(this).data('category');
        $.get(`/quiz/fetch/${encodeURIComponent(category)}`, (data) => {
          const questions = data[category];
          if (questions?.length) {
            $('#category-wrapper, .online_quiz_header').hide();
            renderQuestions(category, questions);
            $('#question-slides').show();
          } else {
            alert('Questions are not available in this category.');
          }
        }).fail(() => {
          alert('Something went wrong.');
        });
      })
      .on('change', 'input[type=radio]', function () {
        userAnswers[currentQuestion] = $(this).val();
        goToNextQuestion();
      })
      .on('click', '.resetBtn, #restartBtn', () => {
        clearInterval(countdownInterval);
        window.scrollTo(0, 0);
        loadCategories();
      });
  });