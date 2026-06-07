document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. OBSŁUGA KALENDARZA
    // ==========================================
    const calendarDays = document.getElementById('calendar-days');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const summaryDuration = document.getElementById('summary-duration');

    let startDate = null;
    let endDate = null;

    function renderCalendar() {
        calendarDays.innerHTML = '';

        // Pusty dzień z poprzedniego miesiąca (30 września)
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        emptyDay.textContent = '30';
        calendarDays.appendChild(emptyDay);

        // Generowanie dni od 1 do 31
        for (let i = 1; i <= 31; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = i;

            // Logika podświetlania klas na podstawie wybranego zakresu
            if (startDate === i) {
                dayElement.classList.add('selected-start');
            }
            if (endDate === i) {
                dayElement.classList.add('selected-end');
            }
            if (startDate && endDate && i > startDate && i < endDate) {
                dayElement.classList.add('in-range');
            }

            // Obsługa kliknięcia
            dayElement.addEventListener('click', () => handleDayClick(i));
            
            calendarDays.appendChild(dayElement);
        }

        // Dodanie pustych dni na końcu
        for (let i = 1; i <= 3; i++) {
            const emptyDayEnd = document.createElement('div');
            emptyDayEnd.className = 'day empty';
            emptyDayEnd.textContent = i;
            calendarDays.appendChild(emptyDayEnd);
        }
    }

    function handleDayClick(day) {
        if (!startDate || (startDate && endDate)) {
            // Pierwsze kliknięcie lub resetowanie wyboru
            startDate = day;
            endDate = null;
        } else if (startDate && !endDate) {
            // Drugie kliknięcie - ustalamy koniec zakresu
            if (day > startDate) {
                endDate = day;
            } else {
                // Jeśli kliknięto datę wcześniejszą niż startowa, resetujemy start na nową
                startDate = day;
            }
        }

        updateInputs();
        renderCalendar(); // Przerenderuj, aby zaktualizować klasy CSS (kolory)
    }

    function updateInputs() {
        if (startDate) {
            startDateInput.value = `Oct ${startDate}, 2024`;
        } else {
            startDateInput.value = '';
        }

        if (endDate) {
            endDateInput.value = `Oct ${endDate}, 2024`;
            // Aktualizacja tekstu w prawym panelu podsumowania
            const daysCount = (endDate - startDate) + 1;
            summaryDuration.textContent = `${daysCount} days (Oct ${startDate} - Oct ${endDate})`;
        } else {
            endDateInput.value = '';
            summaryDuration.textContent = 'Select delivery period';
        }
    }

    // Pierwsze uruchomienie kalendarza
    renderCalendar();


    // ==========================================
    // 2. OBSŁUGA WYBORU KALORII
    // ==========================================
    const calorieButtons = document.querySelectorAll('.toggle-btn');
    const energySummaryValue = document.querySelectorAll('.summary-item .value')[1]; 

    calorieButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Usuń klasę 'active' ze wszystkich przycisków kalorii
            calorieButtons.forEach(btn => btn.classList.remove('active'));
            
            // Dodaj klasę 'active' tylko do klikniętego przycisku
            this.classList.add('active');

            // Zaktualizuj tekst w podsumowaniu po prawej stronie
            if (energySummaryValue) {
                energySummaryValue.textContent = this.textContent + ' / day';
            }
        });
    });

});