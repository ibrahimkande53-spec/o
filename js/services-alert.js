// ===== SERVICES ALERT ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
    const services = [
        document.getElementById('service-informatique'),
        document.getElementById('service-business'),
        document.getElementById('service-immobilier')
    ];

    // Check if all services exist
    if (services.length === 3 && services.every(s => s !== null)) {
        const blinkDuration = 800; // Duration of each blink in ms
        const pauseDuration = 400; // Pause between blinks in ms
        const totalCycleTime = (blinkDuration + pauseDuration) * services.length;

        // Function to make a service blink
        function blinkService(index) {
            if (services[index]) {
                services[index].classList.add('blinking');
                setTimeout(() => {
                    if (services[index]) {
                        services[index].classList.remove('blinking');
                    }
                }, blinkDuration);
            }
        }

        // Function to start the alert cycle
        function startAlertCycle() {
            // Reset all services first
            services.forEach(service => {
                if (service) {
                    service.classList.remove('blinking');
                }
            });

            // Blink each service in sequence
            services.forEach((service, index) => {
                if (service) {
                    setTimeout(() => {
                        blinkService(index);
                    }, index * (blinkDuration + pauseDuration));
                }
            });

            // Repeat the cycle
            setTimeout(() => {
                startAlertCycle();
            }, totalCycleTime);
        }

        // Start the animation after a short delay
        setTimeout(() => {
            startAlertCycle();
        }, 1000);

        // Add hover effect
        services.forEach(service => {
            if (service) {
                service.addEventListener('mouseenter', () => {
                    service.classList.add('hover-active');
                });

                service.addEventListener('mouseleave', () => {
                    service.classList.remove('hover-active');
                });
            }
        });
    }
});

