import { computeResult, getVisibleQuestions } from './engine.js';

function formatText(template, replacements) {
  return Object.entries(replacements).reduce(
    (value, [key, replacement]) => value.replaceAll(`{${key}}`, String(replacement)),
    template
  );
}

function shuffle(list) {
  const next = [...list];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }
  return next;
}

const pageData = JSON.parse(document.getElementById('sbti-page-data').textContent);

const state = {
  answers: {},
  shuffledQuestions: [],
};

const screens = {
  intro: document.getElementById('intro'),
  result: document.getElementById('result'),
  test: document.getElementById('test'),
};

const questionList = document.getElementById('questionList');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const submitButton = document.getElementById('submitBtn');
const testHint = document.getElementById('testHint');

function showScreen(name) {
  for (const [key, element] of Object.entries(screens)) {
    element.classList.toggle('active', key === name);
  }
  window.scrollTo({ behavior: 'smooth', top: 0 });
}

function getQuestionMetaLabel(question) {
  if (question.special) {
    return pageData.chrome.test.specialQuestion;
  }

  return pageData.chrome.test.hiddenDimension;
}

function renderQuestions() {
  const visibleQuestions = getVisibleQuestions({
    answers: state.answers,
    questions: state.shuffledQuestions,
    specialQuestions: pageData.specialQuestions,
  });

  questionList.innerHTML = '';
  visibleQuestions.forEach((question, index) => {
    const card = document.createElement('article');
    card.className = 'question';
    card.innerHTML = `
      <div class="question-meta">
        <div class="badge">${formatText(pageData.chrome.test.questionPattern, {
          index: index + 1,
        })}</div>
        <div>${getQuestionMetaLabel(question)}</div>
      </div>
      <div class="question-title">${question.text}</div>
      <div class="options">
        ${question.options
          .map((option, optionIndex) => {
            const optionCode = ['A', 'B', 'C', 'D'][optionIndex] || String(optionIndex + 1);
            const checked = state.answers[question.id] === option.value ? 'checked' : '';
            return `
              <label class="option">
                <input type="radio" name="${question.id}" value="${option.value}" ${checked} />
                <div class="option-code">${optionCode}</div>
                <div>${option.label}</div>
              </label>
            `;
          })
          .join('')}
      </div>
    `;
    questionList.appendChild(card);
  });

  questionList.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      const { name, value } = event.target;
      state.answers[name] = Number(value);

      if (name === pageData.specialQuestions[0].id && Number(value) !== 3) {
        delete state.answers[pageData.drunkTriggerQuestionId];
      }

      renderQuestions();
      updateProgress();
    });
  });

  updateProgress();
}

function updateProgress() {
  const visibleQuestions = getVisibleQuestions({
    answers: state.answers,
    questions: state.shuffledQuestions,
    specialQuestions: pageData.specialQuestions,
  });
  const total = visibleQuestions.length;
  const done = visibleQuestions.filter((question) => state.answers[question.id] !== undefined).length;
  const percent = total === 0 ? 0 : (done / total) * 100;
  const isComplete = total > 0 && total === done;

  progressBar.style.width = `${percent}%`;
  progressText.textContent = formatText(pageData.chrome.test.progressPattern, {
    done,
    total,
  });
  submitButton.disabled = !isComplete;
  testHint.textContent = isComplete
    ? pageData.chrome.test.completeHint
    : pageData.chrome.test.incompleteHint;
}

function renderDimensionList(result) {
  const dimensionList = document.getElementById('dimList');
  dimensionList.innerHTML = pageData.dimensionOrder
    .map((dimension) => {
      const level = result.levels[dimension];
      return `
        <div class="dim-item">
          <div class="dim-item-top">
            <div class="dim-item-name">${pageData.dimensionMeta[dimension].name}</div>
            <div class="dim-item-score">${formatText(
              pageData.chrome.result.scorePattern,
              {
                level,
                score: result.rawScores[dimension],
              }
            )}</div>
          </div>
          <p>${pageData.dimExplanations[dimension][level]}</p>
        </div>
      `;
    })
    .join('');
}

function resolveResultChrome(result) {
  if (result.subType === 'drunk') {
    return {
      badge: pageData.chrome.result.hiddenOverrideBadge,
      kicker: pageData.chrome.result.hiddenOverrideKicker,
      note: pageData.chrome.result.specialNote,
      sub: pageData.chrome.result.hiddenOverrideSub,
    };
  }

  if (result.subType === 'hhhh') {
    return {
      badge: formatText(pageData.chrome.result.fallbackBadgePattern, {
        similarity: result.similarity,
      }),
      kicker: pageData.chrome.result.fallbackKicker,
      note: pageData.chrome.result.specialNote,
      sub: pageData.chrome.result.fallbackSub,
    };
  }

  return {
    badge: formatText(pageData.chrome.result.regularBadgePattern, {
      exact: result.bestNormal.exact,
      similarity: result.bestNormal.similarity,
    }),
    kicker: pageData.chrome.result.modeKicker,
    note: pageData.chrome.result.regularNote,
    sub: pageData.chrome.result.regularSub,
  };
}

function renderResult() {
  const result = computeResult({
    answers: state.answers,
    dimensionMeta: pageData.dimensionMeta,
    dimensionOrder: pageData.dimensionOrder,
    drunkTriggerQuestionId: pageData.drunkTriggerQuestionId,
    normalTypes: pageData.normalTypes,
    questions: pageData.questions,
    typeLibrary: pageData.typeLibrary,
  });
  const chrome = resolveResultChrome(result);
  const type = result.finalType;
  const imagePath = pageData.imagePaths[type.code];

  document.getElementById('resultModeKicker').textContent = chrome.kicker;
  document.getElementById('resultTypeName').textContent = formatText(
    pageData.chrome.result.resultNamePattern,
    {
      code: type.code,
      name: type.cn,
    }
  );
  document.getElementById('matchBadge').textContent = chrome.badge;
  document.getElementById('resultTypeSub').textContent = chrome.sub;
  document.getElementById('resultDesc').textContent = type.desc;
  document.getElementById('posterCaption').textContent = type.intro;
  document.getElementById('funNote').textContent = chrome.note;

  const posterImage = document.getElementById('posterImage');
  posterImage.src = imagePath;
  posterImage.alt = `${type.code} ${type.cn}`;

  renderDimensionList(result);
  showScreen('result');
}

function startTest() {
  state.answers = {};
  state.shuffledQuestions = shuffle(pageData.questions);
  renderQuestions();
  showScreen('test');
}

document.getElementById('startBtn').addEventListener('click', startTest);
document.getElementById('heroStartBtn').addEventListener('click', startTest);
document.getElementById('backIntroBtn').addEventListener('click', () => showScreen('intro'));
document.getElementById('restartBtn').addEventListener('click', startTest);
document.getElementById('toTopBtn').addEventListener('click', () => showScreen('intro'));
submitButton.addEventListener('click', renderResult);
