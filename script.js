/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("open");
});

closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
    });

});


/* ================= DESTINATION CAROUSEL ================= */

const cards = document.querySelectorAll(".destination-card");
const carousel = document.getElementById("carousel");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

const totalCards = cards.length;



/* UPDATE CAROUSEL */

function updateCarousel() {

    cards.forEach((card, index) => {

        card.classList.remove(
            "active",
            "left-card",
            "right-card",
            "hidden-card"
        );


        let difference =
            (index - currentIndex + totalCards)
            % totalCards;


        if (difference === 0) {

            card.classList.add("active");

        }

        else if (difference === 1) {

            card.classList.add("right-card");

        }

        else if (difference === totalCards - 1) {

            card.classList.add("left-card");

        }

        else {

            card.classList.add("hidden-card");

        }

    });


}


/* NEXT */

function nextSlide() {

    currentIndex =
        (currentIndex + 1) % totalCards;

    updateCarousel();

}


/* PREVIOUS */

function previousSlide() {

    currentIndex =
        (currentIndex - 1 + totalCards)
        % totalCards;

    updateCarousel();

}


nextBtn.addEventListener(
    "click",
    nextSlide
);

prevBtn.addEventListener(
    "click",
    previousSlide
);


/* ================= AUTO SLIDE ================= */

let autoSlide =
    setInterval(nextSlide, 5000);


/* STOP AUTO SLIDE WHILE TOUCHING */

carousel.addEventListener(
    "mouseenter",
    () => {
        clearInterval(autoSlide);
    }
);

carousel.addEventListener(
    "mouseleave",
    () => {

        autoSlide =
            setInterval(nextSlide, 5000);

    }
);


/* ================= MOBILE SWIPE ================= */

let touchStartX = 0;
let touchEndX = 0;


carousel.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


carousel.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const distance =
        touchEndX - touchStartX;


    if (Math.abs(distance) < 50) {
        return;
    }


    if (distance < 0) {

        nextSlide();

    } else {

        previousSlide();

    }

}


/* INITIAL */

updateCarousel();
