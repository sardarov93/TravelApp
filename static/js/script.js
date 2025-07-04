// CSRF токен
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!/^GET|HEAD|OPTIONS|TRACE$/i.test(settings.type)) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

// Регистрация
$('#registerForm').submit(function(e) {
    e.preventDefault();
    $.post('/register/', $(this).serialize(), function(data) {
        if (data.success) {
            location.reload();
        } else {
            $('#registerErrors').text(Object.values(data.errors).flat().join(', '));
        }
    });
});

// Логин
$('#loginForm').submit(function(e) {
    e.preventDefault();
    $.post('/login/', $(this).serialize(), function(data) {
        if (data.success) {
            location.reload();
        } else {
            $('#loginErrors').text(Object.values(data.errors).flat().join(', '));
        }
    });
});

// Выход
$('#logoutBtn').click(function() {
    $.post('/logout/', {}, function(data) {
        if (data.success) {
            location.reload();
        }
    });
});







    document.querySelectorAll('.faq-question').forEach((question) => {
            question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const btn = question.querySelector('.toggle-btn');
            const isVisible = answer.style.display === 'block';

            document.querySelectorAll('.faq-answer').forEach((el) => el.style.display = 'none');
            document.querySelectorAll('.toggle-btn').forEach((b) => b.textContent = '+');

            if (!isVisible) {
                answer.style.display = 'block';
                btn.textContent = '−';
            }
            });
        });