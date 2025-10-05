// ===== СЛАЙДЕР =====
const sliderContainer = document.getElementById('slider-container');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;
const slideCount = document.querySelectorAll('.slide').length;

setInterval(() => {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
}, 5000);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

function updateSlider() {
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// ===== ВИКТОРИНА =====
const questions = [
    {
        question: "В каком году был основан ПХТТ?",
        options: ["1920", "1930", "1945", "1952"],
        answer: 3
    },
    {
        question: "Кем были первые 60 учащихся ПХТТ в 1952 годум",
        options: ["Ветераны ВОВ", "Работники кировского завода", "Инженеры", "Работники мотовилихинского завода"],
        answer: 1
    },
    {
        question: "По ходатайству какого завода был основан ПХТТ",
        options: ["ПЦБК", "Машиностроитель", "Кировского завода"],
        answer: 2
    },
    {
        question: "В каком году была основана специальность 18.02.13 Технология производства изделий из полимерных композитов.",
        options: ["2007", "2018", "2015", "2011"],
        answer: 1
    },
    {
        question: "По какой интерактивной игре в ПХТТ каждый год проводят турниры",
        options: ["Лови удачу", "Киномания", "Что где когда", "Кто хочет стать миллионером"],
        answer: 2
    },
    {
        question: "Что активно использовали преподаватели ПХТТ для демонстрации химических процессов до эпохи цифровых технологий?",
        options: ["Компьютеры", "Плакаты", "Доски", "Учебники"],
        answer: 1
    },
    {
        question: "На замену какой специальности пришла специальность 18.02.13 Технология производства изделий из полимерных композитов.",
        options: ["Технология производства и переработки пластических масс и эластомеров", "Сварщик (ручной и частично механизированной сварки (наплавки)", "Управление качество", "Монтаж, техническое обслуживание и ремонт промышленного оборудования (по отраслям"],
        answer: 0
    },
    {
        question: "В каком году учебный год начался в новом корпусе?",
        options: ["1957", "1955", "1956", "1966"],
        answer: 0
    },
    {
        question: "До какого года проработал директором Шарашов А.И.?",
        options: ["1999", "1973", "2001", "1988"],
        answer: 2
    },
    {
        question: "Каким стал техникум после реорганизаций 2012 и 2018 годов? ",
        options: ["Центром подготовки специальстов среднего звена", "Одним из крупнейших учреждений СПО в Пермском крае", "Центром проф подготовки", "Таким же учебным учрежденияем как и все"],
        answer: 1
    },

];

const elements = {
    question: document.getElementById('question'),
    options: document.getElementById('options'),
    nextBtn: document.getElementById('next-btn'),
    restartBtn: document.getElementById('restart-btn'),
    result: document.getElementById('result')
};

let currentQuestionIndex = 0;
let score = 0;

function initializeQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    elements.result.style.display = 'none';
    elements.restartBtn.style.display = 'none';
    elements.nextBtn.style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    elements.question.textContent = question.question;
    elements.options.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectAnswer(index));
        elements.options.appendChild(optionElement);
    });
}

function selectAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const options = elements.options.children;
    
    // Блокируем клики после выбора
    Array.from(options).forEach(option => {
        option.style.pointerEvents = 'none';
    });

    // Проверяем ответ
    if (selectedIndex === question.answer) {
        options[selectedIndex].classList.add('correct');
        score++;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.answer].classList.add('correct');
    }

    elements.nextBtn.style.display = 'block';
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        elements.nextBtn.style.display = 'none';
    } else {
        showResult();
    }
}

function showResult() {
    elements.question.textContent = 'Викторина завершена!';
    elements.options.innerHTML = '';
    elements.nextBtn.style.display = 'none';
    elements.restartBtn.style.display = 'block';
    elements.result.textContent = `Ваш результат: ${score} из ${questions.length}`;
    elements.result.style.display = 'block';
}

// Обработчики событий
elements.nextBtn.addEventListener('click', showNextQuestion);
elements.restartBtn.addEventListener('click', initializeQuiz);

// Инициализация при загрузке
initializeQuiz();