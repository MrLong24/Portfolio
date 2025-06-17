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

            const banner = document.querySelector('.banner');
            const numberOfBubbles = 100; // Số lượng bóng khí

            // Lấy kích thước của banner (toàn bộ section)
            const bannerWidth = banner.offsetWidth;
            const bannerHeight = banner.offsetHeight;

            for (let i = 0; i < numberOfBubbles; i++) {
                const bubble = document.createElement('div');
                bubble.classList.add('bubble');

                const size = Math.random() * 55 + 15;
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;

                const duration = Math.random() * 15 + 10; // Tăng thời gian và phạm vi duration (10s-25s)
                const delay = Math.random() * 20; // Tăng phạm vi delay (0s-20s) để bóng xuất hiện liên tục và đa dạng

                const maxOpacity = Math.random() * 0.4 + 0.3;
                const startScale = Math.random() * 0.4 + 0.6;
                const midScale = Math.random() * 0.4 + 0.8;
                const endScale = Math.random() * 0.4 + 0.7;
                const midRotate = Math.random() * 360 - 180;
                const endRotate = Math.random() * 360 - 180;

                // Vị trí bắt đầu (có thể từ rất xa hai bên hoặc trên/dưới)
                // Chúng ta sẽ cho chúng xuất phát từ một phạm vi rộng hơn cả chiều ngang màn hình
                // Ví dụ: từ -200% chiều rộng đến 200% chiều rộng
                // và từ -100% chiều cao đến 150% chiều cao
                const rangeX = bannerWidth * 3; // Phạm vi di chuyển ngang gấp 3 lần chiều rộng banner
                const rangeY = bannerHeight * 2.5; // Phạm vi di chuyển dọc gấp 2.5 lần chiều cao banner

                const startX = Math.random() * rangeX - (rangeX / 2); // Từ -1.5x đến +1.5x width
                const startY = Math.random() * rangeY - (rangeY / 2); // Từ -1.25x đến +1.25x height

                // Vị trí giữa (phải đủ rộng để bóng đi qua cả hai bên)
                const midX = Math.random() * rangeX - (rangeX / 2);
                const midY = Math.random() * rangeY - (rangeY / 2);

                // Vị trí kết thúc (cũng rất xa hai bên hoặc trên/dưới)
                const endX = Math.random() * rangeX - (rangeX / 2);
                const endY = Math.random() * rangeY - (rangeY / 2);


                // --- Kết thúc phần chỉnh sửa chính ---

                bubble.style.setProperty('--startX', `${startX}px`);
                bubble.style.setProperty('--startY', `${startY}px`);
                bubble.style.setProperty('--midX', `${midX}px`);
                bubble.style.setProperty('--midY', `${midY}px`);
                bubble.style.setProperty('--endX', `${endX}px`);
                bubble.style.setProperty('--endY', `${endY}px`);
                bubble.style.setProperty('--maxOpacity', `${maxOpacity}`);
                bubble.style.setProperty('--startScale', `${startScale}`);
                bubble.style.setProperty('--midScale', `${midScale}`);
                bubble.style.setProperty('--endScale', `${endScale}`);
                bubble.style.setProperty('--midRotate', `${midRotate}deg`);
                bubble.style.setProperty('--endRotate', `${endRotate}deg`);

                bubble.style.animationDuration = `${duration}s`;
                bubble.style.animationDelay = `${delay}s`;

                banner.appendChild(bubble);
            }
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