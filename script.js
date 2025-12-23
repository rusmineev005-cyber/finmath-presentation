// Презентация по финансовой математике
// Вариант №1 - 27 слайдов

// ==================== НАВИГАЦИЯ ====================
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const currentSlideDisplay = document.getElementById('current-slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    
    currentSlideIndex = index;
    currentSlideDisplay.textContent = currentSlideIndex + 1;
    updateButtons();
    
    // Автоматически генерировать таблицу при показе слайда 22
    if (index === 21) {
        setTimeout(generateDaysTable, 100);
    }
}

function updateButtons() {
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === totalSlides - 1;
    
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

function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) showSlide(currentSlideIndex + 1);
}

function prevSlide() {
    if (currentSlideIndex > 0) showSlide(currentSlideIndex - 1);
}

// ==================== ТАБЛИЦА ДНЕЙ ====================
function generateDaysTable() {
    const tableBody = document.getElementById('days-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let dayOfYear = 1;
    const totalDays = 365;
    
    // Покажем только по 2 дня из каждого месяца для компактности
    for (let month = 0; month < 12; month++) {
        const monthName = months[month];
        const days = daysInMonth[month];
        
        // Первый день месяца
        addDayToTable(monthName, 1, dayOfYear, totalDays);
        dayOfYear++;
        
        // 15-й день месяца (если есть)
        if (days >= 15) {
            addDayToTable(monthName, 15, dayOfYear + 13, totalDays);
        }
        
        // Последний день месяца
        addDayToTable(monthName, days, dayOfYear + days - 2, totalDays);
        
        dayOfYear += days - 1;
    }
}

function addDayToTable(monthName, day, dayOfYear, totalDays) {
    const tableBody = document.getElementById('days-table-body');
    const daysRemaining = totalDays - dayOfYear;
    const fractionOfYear = (dayOfYear / totalDays).toFixed(6);
    const reciprocal = (1 / (dayOfYear / totalDays)).toFixed(6);
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${monthName}</td>
        <td>${day}</td>
        <td>${dayOfYear}</td>
        <td>${daysRemaining}</td>
        <td>${fractionOfYear}</td>
        <td>${reciprocal}</td>
    `;
    tableBody.appendChild(row);
}

// ==================== КАЛЬКУЛЯТОР ====================
function calculateLoan() {
    const amount = parseFloat(document.getElementById('loan-amount').value) || 1000000;
    const annualRate = (parseFloat(document.getElementById('interest-rate').value) || 12) / 100;
    const years = parseFloat(document.getElementById('loan-term').value) || 5;
    const interestType = document.getElementById('interest-type').value;
    
    const months = years * 12;
    const monthlyRate = annualRate / 12;
    let resultHTML = '';
    
    if (interestType === 'simple') {
        // Простые проценты
        const totalInterest = amount * annualRate * years;
        const totalAmount = amount + totalInterest;
        const monthlyPayment = totalAmount / months;
        
        resultHTML = `
            <div class="calculation-result">
                <h4>Результаты расчета:</h4>
                <p><strong>Ежемесячный платеж:</strong> ${formatMoney(monthlyPayment)} руб.</p>
                <p><strong>Общая сумма выплат:</strong> ${formatMoney(totalAmount)} руб.</p>
                <p><strong>Переплата:</strong> ${formatMoney(totalInterest)} руб.</p>
                <p><strong>Переплата в %:</strong> ${((totalInterest / amount) * 100).toFixed(2)}%</p>
            </div>
        `;
    } else {
        // Сложные проценты (аннуитет)
        const annuityCoefficient = (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                                 (Math.pow(1 + monthlyRate, months) - 1);
        const monthlyPayment = amount * annuityCoefficient;
        const totalAmount = monthlyPayment * months;
        const totalInterest = totalAmount - amount;
        
        resultHTML = `
            <div class="calculation-result">
                <h4>Результаты расчета:</h4>
                <p><strong>Ежемесячный платеж:</strong> ${formatMoney(monthlyPayment)} руб.</p>
                <p><strong>Общая сумма выплат:</strong> ${formatMoney(totalAmount)} руб.</p>
                <p><strong>Переплата:</strong> ${formatMoney(totalInterest)} руб.</p>
                <p><strong>Переплата в %:</strong> ${((totalInterest / amount) * 100).toFixed(2)}%</p>
            </div>
        `;
    }
    
    document.getElementById('calculation-result').innerHTML = resultHTML;
}

// ==================== ПРИМЕРЫ ====================
function calculateExample(exampleNumber) {
    let amount, annualRate, years, interestType, paymentType;
    let resultHTML = '';
    
    switch(exampleNumber) {
        case 1: // Ипотека
            amount = 3000000;
            annualRate = 0.085;
            years = 20;
            interestType = 'compound';
            paymentType = 'annuity';
            break;
            
        case 2: // Автокредит
            amount = 1500000;
            annualRate = 0.115;
            years = 5;
            interestType = 'compound';
            paymentType = 'differentiated';
            break;
            
        case 3: // Образование
            amount = 500000;
            annualRate = 0.075;
            years = 10;
            interestType = 'simple';
            paymentType = 'annuity';
            break;
    }
    
    const months = years * 12;
    const monthlyRate = annualRate / 12;
    
    if (interestType === 'simple') {
        const totalInterest = amount * annualRate * years;
        const totalAmount = amount + totalInterest;
        const monthlyPayment = totalAmount / months;
        
        resultHTML = `
            <p><strong>Ежемесячный платеж:</strong> ${formatMoney(monthlyPayment)} руб.</p>
            <p><strong>Общая сумма выплат:</strong> ${formatMoney(totalAmount)} руб.</p>
            <p><strong>Переплата:</strong> ${formatMoney(totalInterest)} руб.</p>
            <p><strong>Переплата в %:</strong> ${((totalInterest / amount) * 100).toFixed(2)}%</p>
        `;
    } else if (paymentType === 'annuity') {
        const annuityCoefficient = (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                                 (Math.pow(1 + monthlyRate, months) - 1);
        const monthlyPayment = amount * annuityCoefficient;
        const totalAmount = monthlyPayment * months;
        const totalInterest = totalAmount - amount;
        
        resultHTML = `
            <p><strong>Ежемесячный платеж:</strong> ${formatMoney(monthlyPayment)} руб.</p>
            <p><strong>Общая сумма выплат:</strong> ${formatMoney(totalAmount)} руб.</p>
            <p><strong>Переплата:</strong> ${formatMoney(totalInterest)} руб.</p>
            <p><strong>Переплата в %:</strong> ${((totalInterest / amount) * 100).toFixed(2)}%</p>
        `;
    } else {
        // Дифференцированные
        const principalPayment = amount / months;
        let totalInterest = 0;
        
        for (let i = 0; i < months; i++) {
            const interestPayment = (amount - (principalPayment * i)) * monthlyRate;
            totalInterest += interestPayment;
        }
        
        const totalAmount = amount + totalInterest;
        const firstPayment = principalPayment + (amount * monthlyRate);
        
        resultHTML = `
            <p><strong>Первый платеж:</strong> ${formatMoney(firstPayment)} руб.</p>
            <p><strong>Общая сумма выплат:</strong> ${formatMoney(totalAmount)} руб.</p>
            <p><strong>Переплата:</strong> ${formatMoney(totalInterest)} руб.</p>
            <p><strong>Переплата в %:</strong> ${((totalInterest / amount) * 100).toFixed(2)}%</p>
        `;
    }
    
    document.getElementById(`calc-result-${exampleNumber}`).innerHTML = resultHTML;
}

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================
function formatMoney(value) {
    return parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
}

// ==================== ИНИЦИАЛИЗАЦИЯ ====================
document.addEventListener('DOMContentLoaded', function() {
    // Навигация
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Показываем первый слайд
    showSlide(0);
    
    // Навигация с клавиатуры
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowLeft': event.preventDefault(); prevSlide(); break;
            case 'ArrowRight': event.preventDefault(); nextSlide(); break;
            case 'Home': event.preventDefault(); showSlide(0); break;
            case 'End': event.preventDefault(); showSlide(totalSlides - 1); break;
            case 'PageUp': event.preventDefault(); prevSlide(); break;
            case 'PageDown': event.preventDefault(); nextSlide(); break;
        }
    });
    
    // Автоматический расчет примеров
    setTimeout(() => {
        calculateExample(1);
        calculateExample(2);
        calculateExample(3);
    }, 1000);
    
    console.log('Презентация "Финансовая математика" загружена');
    console.log('Всего слайдов: ' + totalSlides);
});
