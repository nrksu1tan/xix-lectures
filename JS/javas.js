document.addEventListener('DOMContentLoaded', () => {
    const lectureLinks = document.querySelectorAll('.lecture-link');
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const modalText = document.getElementById('modal-text');
    const closeModalButton = document.querySelector('.close');
    const copyButton = document.getElementById('copy-button');

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
                modal.classList.add('show');
            } catch (error) {
                modalText.textContent = 'Ошибка: не удалось загрузить текст лекции.';
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
            // Отображаем временное сообщение об успешном копировании
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Текст лекции скопирован в буфер обмена.';
            successMessage.classList.add('success-message');
            modalContent.appendChild(successMessage);

            // Удаляем сообщение через 3 секунды
            setTimeout(() => {
                modalContent.removeChild(successMessage);
            }, 3000);
        } catch (err) {
            alert('Не удалось скопировать текст.');
        }
    });
});
