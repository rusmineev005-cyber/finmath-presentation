// Презентация по финансовой математике
// Правильная навигация по 22 слайдам

// Переменные для управления слайдами
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const currentSlideDisplay = document.getElementById('current-slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Функция для показа слайда
function showSlide(index) {
    // Проверяем границы
    if (index < 0) {
        index = 0;
    } else if (index >= totalSlides) {
        index = totalSlides - 1;
    }
    
    // Скрываем все слайды
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Показываем текущий слайд
    slides[index].classList.add('active');
    
    // Обновляем счетчик
    currentSlideIndex = index;
    currentSlideDisplay.textContent = currentSlideIndex + 1;
    
    // Обновляем состояние кнопок
    updateButtons();
    
    // Прокручиваем к началу слайда
    slides[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Обновление состояния кнопок
function updateButtons() {
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    
    // Визуальная обратная связь для кнопок
    if (prevBtn.disabled) {
        prevBtn.style.opacity = '0.5';
        prevBtn.style.cursor = 'not-allowed';
    } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
    }
    
    if (nextBtn.disabled) {
        nextBtn.style.opacity = '0.5';
        nextBtn.style.cursor = 'not-allowed';
    } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
    }
}

// Следующий слайд
function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
        showSlide(currentSlideIndex + 1);
    }
}

// Предыдущий слайд
function prevSlide() {
    if (currentSlideIndex > 0) {
        showSlide(currentSlideIndex - 1);
    }
}

// Навигация с клавиатуры
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            prevSlide();
            break;
            
        case 'ArrowRight':
            event.preventDefault();
            nextSlide();
            break;
            
        case 'Home':
            event.preventDefault();
            showSlide(0);
            break;
            
        case 'End':
            event.preventDefault();
            showSlide(totalSlides - 1);
            break;
            
        case 'PageUp':
            event.preventDefault();
            prevSlide();
            break;
            
        case 'PageDown':
            event.preventDefault();
            nextSlide();
            break;
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики на кнопки
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Показываем первый слайд
    showSlide(0);
    
    // Выводим информацию в консоль (можно удалить)
    console.log('Презентация загружена успешно!');
    console.log('Всего слайдов: ' + totalSlides);
    console.log('Используйте:');
    console.log('- Кнопки "Назад" и "Вперед"');
    console.log('- Стрелки ← → на клавиатуре');
    console.log('- PageUp/PageDown для навигации');
    console.log('- Home/End для перехода к началу/концу');
});

// Функция для перехода к конкретному слайду (можно использовать для меню)
function goToSlide(slideNumber) {
    const index = slideNumber - 1; // Переводим номер слайда в индекс
    if (index >= 0 && index < totalSlides) {
        showSlide(index);
    }
}

// Добавляем возможность клика по номеру слайда в консоли для отладки
if (typeof console !== 'undefined') {
    console.goToSlide = goToSlide;
}