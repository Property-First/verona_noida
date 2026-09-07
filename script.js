

    /* =========================
       MENU
    ========================= */

    const menuToggle = document.getElementById("menuToggle");
    const sideNav = document.getElementById("sideNav");
    const closeMenu = document.getElementById("closeMenu");
    const navOverlay = document.getElementById("navOverlay");


    function openMenu() {

        sideNav.classList.add("active");

        navOverlay.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    function closeNav() {

        sideNav.classList.remove("active");

        navOverlay.classList.remove("active");

        document.body.style.overflow = "";

    }


    menuToggle.addEventListener("click", openMenu);

    closeMenu.addEventListener("click", closeNav);

    navOverlay.addEventListener("click", closeNav);



    /* =========================
       CLOSE MENU WHEN LINK CLICKED
    ========================= */

    document.querySelectorAll(".side-nav a").forEach(function(link) {

        link.addEventListener("click", function() {

            closeNav();

        });

    });



    /* =========================
       ESC KEY
    ========================= */

    document.addEventListener("keydown", function(e) {

        if (e.key === "Escape") {

            closeNav();

        }

    });


/* =========================
   SMOOTH GALLERY SLIDER
========================= */

const track = document.getElementById("galleryTrack");
const slides = document.querySelectorAll(".gallery-slide");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let isAnimating = false;

const totalSlides = slides.length;


/* =========================
   UPDATE SLIDER
========================= */

function updateSlider() {

    isAnimating = true;

    track.style.transform =
        `translateX(-${currentIndex * 100}%)`;


    /* Active image */

    slides.forEach((slide, index) => {

        slide.classList.remove("active");

        if (index === currentIndex) {
            slide.classList.add("active");
        }

    });


    /* Wait until animation finishes */

    setTimeout(() => {

        isAnimating = false;

    }, 1000);

}


/* =========================
   NEXT
========================= */

nextBtn.addEventListener("click", function () {

    if (isAnimating) return;

    if (currentIndex < totalSlides - 1) {

        currentIndex++;

        updateSlider();

    }

});


/* =========================
   PREVIOUS
========================= */

prevBtn.addEventListener("click", function () {

    if (isAnimating) return;

    if (currentIndex > 0) {

        currentIndex--;

        updateSlider();

    }

});


/* =========================
   INITIAL
========================= */

slides[0].classList.add("active");



/* =========================
   PROJECT TABS
========================= */

const tabs = document.querySelectorAll(".project-tab");
const tabContents = document.querySelectorAll(".tab-content");


tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target = tab.dataset.tab;


        /* Remove active from tabs */

        tabs.forEach(item => {
            item.classList.remove("active");
        });


        /* Remove active from content */

        tabContents.forEach(content => {
            content.classList.remove("active");
        });


        /* Activate selected */

        tab.classList.add("active");

        document
            .getElementById(target)
            .classList.add("active");

    });

});



/* =========================
   MULTIPLE IMAGE SLIDERS
========================= */

const sliders = document.querySelectorAll(".media-slider");


sliders.forEach(slider => {

    const track = slider.querySelector(".media-track");

    const slides = slider.querySelectorAll(".media-slide");

    const prev = slider.querySelector(".media-prev");

    const next = slider.querySelector(".media-next");


    let current = 0;

    let animating = false;


    /* If only one image */

    if (slides.length <= 1) {

        prev.style.display = "none";

        next.style.display = "none";

        return;

    }


    /* First slide */

    slides[0].classList.add("active");


    /* Update */

    function updateSlider() {

        if (animating) return;

        animating = true;


        track.style.transform =
            `translateX(-${current * 100}%)`;


        slides.forEach((slide, index) => {

            slide.classList.toggle(
                "active",
                index === current
            );

        });


        setTimeout(() => {

            animating = false;

        }, 1000);

    }


    /* Next */

    next.addEventListener("click", () => {

        if (current < slides.length - 1) {

            current++;

            updateSlider();

        }

    });


    /* Previous */

    prev.addEventListener("click", () => {

        if (current > 0) {

            current--;

            updateSlider();

        }

    });

});

/* =========================
   360 DEGREE VIEWER
========================= */

const tourImage = document.getElementById("tour360Image");

const tourContainer =
    document.querySelector(".tour-360-container");

const tourLeft =
    document.getElementById("tourLeft");

const tourRight =
    document.getElementById("tourRight");

const dragIndicator =
    document.querySelector(".drag-indicator");


/*
    Number of images

    Example:

    1.webp
    2.webp
    3.webp
    ...
    36.webp
*/

const totalFrames = 9;


/* Current frame */

let currentFrame = 1;


/* Drag variables */

let isDragging = false;

let startX = 0;

let lastX = 0;

let accumulatedMovement = 0;


/* How sensitive the dragging is */

const dragSensitivity = 8;


/* =========================
   SHOW FRAME
========================= */

function showFrame(frame) {

    if (frame < 1) {

        frame = totalFrames;

    }

    if (frame > totalFrames) {

        frame = 1;

    }

    currentFrame = frame;


    tourImage.src =
        `./360/${currentFrame}.png`;

}


/* =========================
   NEXT FRAME
========================= */

function nextFrame() {

    showFrame(currentFrame + 1);

}


/* =========================
   PREVIOUS FRAME
========================= */

function previousFrame() {

    showFrame(currentFrame - 1);

}


/* =========================
   MOUSE DOWN
========================= */

tourContainer.addEventListener(
    "mousedown",
    function(event) {

        isDragging = true;

        startX = event.clientX;

        lastX = event.clientX;

        accumulatedMovement = 0;

        dragIndicator.classList.add("hide");

    }
);


/* =========================
   MOUSE MOVE
========================= */

document.addEventListener(
    "mousemove",
    function(event) {

        if (!isDragging) return;


        const movement =
            event.clientX - lastX;


        accumulatedMovement += movement;

        lastX = event.clientX;


        if (
            Math.abs(accumulatedMovement)
            >= dragSensitivity
        ) {

            if (accumulatedMovement > 0) {

                previousFrame();

            } else {

                nextFrame();

            }


            accumulatedMovement = 0;

        }

    }
);


/* =========================
   MOUSE UP
========================= */

document.addEventListener(
    "mouseup",
    function() {

        isDragging = false;

    }
);


/* =========================
   TOUCH START
========================= */

tourContainer.addEventListener(
    "touchstart",
    function(event) {

        isDragging = true;

        startX =
            event.touches[0].clientX;

        lastX =
            event.touches[0].clientX;

        accumulatedMovement = 0;

        dragIndicator.classList.add("hide");

    },
    {
        passive: true
    }
);


/* =========================
   TOUCH MOVE
========================= */

tourContainer.addEventListener(
    "touchmove",
    function(event) {

        if (!isDragging) return;


        const currentX =
            event.touches[0].clientX;


        const movement =
            currentX - lastX;


        accumulatedMovement += movement;

        lastX = currentX;


        if (
            Math.abs(accumulatedMovement)
            >= dragSensitivity
        ) {

            if (accumulatedMovement > 0) {

                previousFrame();

            } else {

                nextFrame();

            }


            accumulatedMovement = 0;

        }

    },
    {
        passive: true
    }
);


/* =========================
   TOUCH END
========================= */

tourContainer.addEventListener(
    "touchend",
    function() {

        isDragging = false;

    }
);


/* =========================
   BUTTONS
========================= */

tourLeft.addEventListener(
    "click",
    previousFrame
);


tourRight.addEventListener(
    "click",
    nextFrame
);


/* =========================
   PROPERTY DRAG TO SCROLL
========================= */

const propertyScroll =
    document.querySelector(".property-scroll");

let propertyIsDown = false;
let propertyStartX = 0;
let propertyScrollLeft = 0;


/* Mouse Down */

propertyScroll.addEventListener("mousedown", (e) => {

    propertyIsDown = true;

    propertyScroll.classList.add("dragging");

    propertyStartX =
        e.pageX - propertyScroll.offsetLeft;

    propertyScrollLeft =
        propertyScroll.scrollLeft;

});


/* Mouse Leave */

propertyScroll.addEventListener("mouseleave", () => {

    propertyIsDown = false;

    propertyScroll.classList.remove("dragging");

});


/* Mouse Up */

propertyScroll.addEventListener("mouseup", () => {

    propertyIsDown = false;

    propertyScroll.classList.remove("dragging");

});


/* Mouse Move */

propertyScroll.addEventListener("mousemove", (e) => {

    if (!propertyIsDown) return;

    e.preventDefault();

    const currentX =
        e.pageX - propertyScroll.offsetLeft;

    const distance =
        (currentX - propertyStartX) * 1.5;

    propertyScroll.scrollLeft =
        propertyScrollLeft - distance;

});


    const popupOverlay =
            document.getElementById("popupOverlay");

        const popupBox =
            document.getElementById("popupBox");

        const enquiryForm =
            document.getElementById("enquiryForm");

        const formContent =
            document.getElementById("formContent");

        const successMessage =
            document.getElementById("successMessage");


        /* OPEN POPUP */

        function openPopup() {

            popupOverlay.classList.add("active");

            document.body.style.overflow = "hidden";
        }


        /* CLOSE POPUP */

        function closePopup() {

            popupOverlay.classList.remove("active");

            document.body.style.overflow = "";
        }


        /* CLICK OUTSIDE TO CLOSE */

        popupOverlay.addEventListener(
            "click",
            function(e) {

                if (e.target === popupOverlay) {
                    closePopup();
                }

            }
        );


        /* ESC KEY */

        document.addEventListener(
            "keydown",
            function(e) {

                if (e.key === "Escape") {
                    closePopup();
                }

            }
        );


        /* FORM SUBMIT */

        enquiryForm.addEventListener(
            "submit",
            function(e) {

                e.preventDefault();


                /*
                   Add your PHP / API submission here.
                */


                formContent.style.display = "none";

                successMessage.style.display = "block";

            }
        );

   
