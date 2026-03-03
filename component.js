/**
 * Завантажує HTML-компонент і вставляє його у placeholder.
 * Після завантаження всіх компонентів ініціалізує модальне вікно.
 */
async function loadComponent(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        el.innerHTML = await response.text();
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadComponent('#header-placeholder', 'header.html'),
        loadComponent('#footer-placeholder', 'footer.html')
    ]);

    // Ініціалізація модалки ПІСЛЯ завантаження компонентів
    initModal();
});

function initModal() {
    const modal = document.getElementById('appointment-modal');
    const closeBtn = document.querySelector('.close-button');
    if (!modal || !closeBtn) return;

    const appointmentBtns = document.querySelectorAll(
        '.btn-primary, .btn-secondary, .btn-footer-appointment'
    );

    appointmentBtns.forEach(btn => {
        if (btn.innerText.toLowerCase().includes('записатися') || btn.classList.contains('doctor-btn')) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}