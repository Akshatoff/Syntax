document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, SplitText)
    const timelineEvents = gsap.utils.toArray('.timeline-event');
    let lamba = SplitText.create("#lamba", {
        type: "words",
    })

    let animation = gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "top top",
            end: "+=500",
            scrub: true,
            pin: "#about",
            // markers: true // Uncomment for debugging
        }
    })

    animation.fromTo(
        lamba.words, {
            y: -100,
            opacity: 0,
            rotation: "random(-80, 80)",
        }, {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.7,
            ease: "back",
            stagger: 0.15,
        }
    )

    timelineEvents.forEach((event, index) => {
        // Determine initial x position based on whether it's an odd (left) or even (right) event
        const initialX = event.classList.contains('timeline-event:nth-child(even)') ? 100 : -100; // Right side moves left, Left side moves right

        gsap.fromTo(event, {
            opacity: 0,
            x: initialX, // Start from the calculated initial X
            y: 0 // Keep y at 0 to focus on X movement
        }, {
            opacity: 1,
            x: 0, // Animate to its natural position
            y: 0,
            duration: 0.8, // Slightly longer duration for a smoother slide
            ease: "power3.out", // A good ease for sliding effects
            scrollTrigger: {
                trigger: event,
                start: "top 80%", // Animation starts when the top of the element is 80% from the top of the viewport
                end: "+=200",
                toggleActions: "play none none none",
                scrub: 1,
                // markers: true // Uncomment for debugging
            }
        });

        // Animation for the image within each timeline event (retained)
        gsap.fromTo(event.querySelector('img'), {
            scale: 0.8,
            opacity: 0,
            y: 20
        }, {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: event,
                start: "top 80%",
                toggleActions: "play none none none",
            }
        });

        // Animation for the text (h2 and h3) within each timeline event (retained)
        gsap.fromTo(event.querySelectorAll('h2, h3'), {
            opacity: 0,
            // Adjust x for text animation to complement the main element's slide
            x: event.classList.contains('timeline-event:nth-child(even)') ? -50 : 50
        }, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: event,
                start: "top 80%",
                toggleActions: "play none none none",
            }
        });
    });
})

// Initialize Lenis
const lenis = new Lenis({
    autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
    // console.log(e);
});
