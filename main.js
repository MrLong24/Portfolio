// Mobile menu toggle - Đảm bảo hoạt động
        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');

            // Toggle mobile menu
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('Menu toggle clicked'); // Debug log
                navLinks.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });

            // Đóng mobile menu khi click outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('nav')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });

            // Smooth scrolling cho navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        // Đóng mobile menu sau khi click
                        navLinks.classList.remove('active');
                        menuToggle.classList.remove('active');
                    }
                });
            });
        });

        // Animation khi scroll đến các section
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Quan sát tất cả các section
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

        // Form submission handling
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Cảm ơn bạn đã gửi tin nhắn! Tôi sẽ phản hồi sớm nhất có thể.');
            this.reset();
        });