document.addEventListener('DOMContentLoaded', () => {
    const lectureLinks = document.querySelectorAll('.lecture-link');
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const modalText = document.getElementById('modal-text');
    const slideImage = document.getElementById('slide-image');
    const closeModalButton = document.querySelector('.close');
    const copyButton = document.getElementById('copy-button');

    // Массив путей к изображениям для каждой лекции
    const lectureImages = {
        "1": "https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/1_Страница_1.jpg",
        "2": "https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/3_Страница_01.jpg",
        "3": "https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/2_Страница_01.jpg",
        "4":"https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/4_Страница_1.jpg",
        "5":"https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/5_Страница_1.jpg",
        "6":"https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/6_Страница_1.jpg",
        "7":"https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/7_Страница_1.jpg",
        "8":"https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/8_Страница_01.jpg",
        "9":"https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/9_Страница_1.jpg",
        "10":"https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/10_Страница_01.jpg",
        "11":"https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/11_Страница_1.jpg",
        "12":"https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/12_Страница_01.jpg",
        "13":"https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/13_Страница_1.jpg",
        "14":"https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/14_Страница_01.jpg",
        // Добавьте ссылки для других лекций
        "15": "https://raw.githubusercontent.com/nrksu1tan/xix-lectures/refs/heads/main/sources/lectureslides/1/15_Страница_1.jpg"
    };

    lectureLinks.forEach(link => {
        link.addEventListener('click', async (event) => {
            event.preventDefault();

            const lectureNumber = link.dataset.lecture;
            const filePath = `sources/lecture${lectureNumber}.txt`;

            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error('Ошибка загрузки файла');
                }
                const text = await response.text();

                modalText.innerHTML = text;
                slideImage.src = lectureImages[lectureNumber] || ''; // Устанавливаем изображение слайда
                modal.classList.add('show');
            } catch (error) {
                modalText.textContent = 'Ошибка: не удалось загрузить текст лекции.';
                slideImage.src = ''; // Очищаем изображение при ошибке
                modal.classList.add('show');
            }
        });
    });

    // Закрытие модального окна при клике на "X"
    closeModalButton.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Закрытие модального окна при клике вне его содержимого
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Копирование текста лекции в буфер обмена при нажатии на кнопку "Копировать"
    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(modalText.textContent);
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Текст лекции скопирован в буфер обмена.';
            successMessage.classList.add('success-message');
            modalContent.appendChild(successMessage);

            setTimeout(() => {
                modalContent.removeChild(successMessage);
            }, 3000);
        } catch (err) {
            alert('Не удалось скопировать текст.');
        }
    });
});
