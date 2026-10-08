/* =========================================================
   DULCE INVITACIÓN
   BABY SHOWER — HABÍA UNA VEZ...
   JAVASCRIPT PREMIUM
========================================================= */


/* =========================================================
   CONFIGURACIÓN GENERAL
========================================================= */

const CONFIG = {
    eventDate: "2026-12-12T16:00:00-06:00",

    whatsapp: "528445550198",

    gameTime: 25,

    totalHoney: 5,

    totalBees: 3,

    beePenalty: 2,

    honeyMoveAt: 9
};


/* =========================================================
   VARIABLES GLOBALES
========================================================= */

let countdownInterval = null;

let gameInterval = null;

let gameMoveTimeout = null;

let gameStarted = false;

let gameTimeLeft = CONFIG.gameTime;

let honeyFound = 0;

let beesHit = 0;

let currentGalleryIndex = 0;

let galleryImages = [];

let musicPlaying = false;


/* =========================================================
   ELEMENTOS
========================================================= */

const preloader =
    document.getElementById("preloader");

const welcomeScreen =
    document.getElementById("welcomeScreen");

const enterInvitation =
    document.getElementById("enterInvitation");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicToggle =
    document.getElementById("musicToggle");

const siteHeader =
    document.getElementById("siteHeader");

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");

const backToTop =
    document.getElementById("backToTop");


/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (preloader) {
            preloader.classList.add("loaded");
        }

    }, 700);

});


/* =========================================================
   PANTALLA DE BIENVENIDA
========================================================= */

function openInvitation() {

    if (!welcomeScreen) {
        return;
    }

    welcomeScreen.classList.add("hidden");

    document.body.classList.remove("welcome-active");

    startMusic();

}


if (enterInvitation) {

    enterInvitation.addEventListener(
        "click",
        openInvitation
    );

}


/* =========================================================
   MÚSICA
========================================================= */

async function startMusic() {

    if (!backgroundMusic) {
        return;
    }

    try {

        backgroundMusic.volume = 0.35;

        await backgroundMusic.play();

        musicPlaying = true;

        updateMusicIcon();

    } catch (error) {

        musicPlaying = false;

        updateMusicIcon();

        console.warn(
            "La reproducción automática fue bloqueada por el navegador."
        );

    }

}


function pauseMusic() {

    if (!backgroundMusic) {
        return;
    }

    backgroundMusic.pause();

    musicPlaying = false;

    updateMusicIcon();

}


function toggleMusic() {

    if (!backgroundMusic) {
        return;
    }

    if (backgroundMusic.paused) {

        startMusic();

    } else {

        pauseMusic();

    }

}


function updateMusicIcon() {

    if (!musicToggle) {
        return;
    }

    const icon =
        musicToggle.querySelector("i");

    if (!icon) {
        return;
    }

    if (musicPlaying) {

        icon.className =
            "fa-solid fa-volume-high";

        musicToggle.setAttribute(
            "aria-label",
            "Desactivar música"
        );

        musicToggle.setAttribute(
            "title",
            "Desactivar música"
        );

    } else {

        icon.className =
            "fa-solid fa-volume-xmark";

        musicToggle.setAttribute(
            "aria-label",
            "Activar música"
        );

        musicToggle.setAttribute(
            "title",
            "Activar música"
        );

    }

}


if (musicToggle) {

    musicToggle.addEventListener(
        "click",
        toggleMusic
    );

}


/* =========================================================
   MENÚ MÓVIL
========================================================= */

function toggleMenu() {

    if (!menuToggle || !mainNav) {
        return;
    }

    const isOpen =
        mainNav.classList.toggle("active");

    menuToggle.classList.toggle(
        "active",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMenu
    );

}


/* =========================================================
   CERRAR MENÚ AL HACER CLICK EN UN ENLACE
========================================================= */

if (mainNav) {

    const navLinks =
        mainNav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mainNav.classList.remove("active");

                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    });

}


/* =========================================================
   HEADER AL HACER SCROLL
========================================================= */

function updateHeader() {

    if (!siteHeader) {
        return;
    }

    if (window.scrollY > 60) {

        siteHeader.classList.add(
            "scrolled"
        );

    } else {

        siteHeader.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


/* =========================================================
   BOTÓN VOLVER ARRIBA
========================================================= */

function updateBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 600) {

        backToTop.classList.add(
            "visible"
        );

    } else {

        backToTop.classList.remove(
            "visible"
        );

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   CUENTA REGRESIVA
========================================================= */

function updateCountdown() {

    const targetDate =
        new Date(CONFIG.eventDate).getTime();

    const now =
        Date.now();

    const difference =
        targetDate - now;


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }


    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        if (countdownInterval) {

            clearInterval(
                countdownInterval
            );

        }

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) %
            24
        );

    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) %
            60
        );

    const seconds =
        Math.floor(
            (difference / 1000) %
            60
        );


    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();


countdownInterval =
    setInterval(
        updateCountdown,
        1000
    );


/* =========================================================
   ANIMACIONES REVEAL
========================================================= */

function initializeRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!elements.length) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


initializeRevealAnimations();


/* =========================================================
   LIGHTBOX
========================================================= */

function initializeGallery() {

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );

    const lightboxPrev =
        document.getElementById(
            "lightboxPrev"
        );

    const lightboxNext =
        document.getElementById(
            "lightboxNext"
        );


    if (
        !galleryItems.length ||
        !lightbox ||
        !lightboxImage
    ) {
        return;
    }


    galleryImages =
        Array.from(
            galleryItems
        ).map(item => {

            return item.dataset.image;

        });


    function showImage(index) {

        if (!galleryImages.length) {
            return;
        }

        currentGalleryIndex =
            (
                index +
                galleryImages.length
            ) %
            galleryImages.length;


        lightboxImage.src =
            galleryImages[
                currentGalleryIndex
            ];

        lightboxImage.alt =
            `Fotografía ${
                currentGalleryIndex + 1
            }`;


        lightbox.classList.add(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }


    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    function nextImage() {

        showImage(
            currentGalleryIndex + 1
        );

    }


    function previousImage() {

        showImage(
            currentGalleryIndex - 1
        );

    }


    galleryItems.forEach(
        (item, index) => {

            item.addEventListener(
                "click",
                () => {

                    showImage(index);

                }
            );

        }
    );


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            nextImage
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            previousImage
        );

    }


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (
                event.key ===
                "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                nextImage();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousImage();

            }

        }
    );

}


initializeGallery();


/* =========================================================
   CARTA SECRETA
========================================================= */

function initializeSecretLetter() {

    const openLetter =
        document.getElementById(
            "openLetter"
        );

    const secretLetter =
        document.getElementById(
            "secretLetter"
        );


    if (
        !openLetter ||
        !secretLetter
    ) {
        return;
    }


    openLetter.addEventListener(
        "click",
        () => {

            const isHidden =
                secretLetter.hasAttribute(
                    "hidden"
                );


            if (isHidden) {

                secretLetter.removeAttribute(
                    "hidden"
                );

                openLetter.innerHTML =
                    `
                    <i class="fa-solid fa-envelope"></i>
                    Cerrar carta
                    `;

            } else {

                secretLetter.setAttribute(
                    "hidden",
                    ""
                );

                openLetter.innerHTML =
                    `
                    <i class="fa-solid fa-envelope-open"></i>
                    Abrir carta
                    `;

            }

        }
    );

}


initializeSecretLetter();


/* =========================================================
   MINIJUEGO
   "AYUDA A ENCONTRAR LA MIEL"
========================================================= */

function initializeGame() {

    const gameArea =
        document.getElementById(
            "gameArea"
        );

    const gameTimer =
        document.getElementById(
            "gameTimer"
        );

    const honeyFoundElement =
        document.getElementById(
            "honeyFound"
        );

    const honeyTotalElement =
        document.getElementById(
            "honeyTotal"
        );

    const gameMessage =
        document.getElementById(
            "gameMessage"
        );

    const startGame =
        document.getElementById(
            "startGame"
        );


    if (
        !gameArea ||
        !gameTimer ||
        !honeyFoundElement ||
        !honeyTotalElement ||
        !gameMessage ||
        !startGame
    ) {
        return;
    }


    /* -----------------------------------------------------
       POSICIONES
    ----------------------------------------------------- */

    const honeyPositions = [

        {
            left: 12,
            top: 23
        },

        {
            left: 39,
            top: 17
        },

        {
            left: 70,
            top: 30
        },

        {
            left: 24,
            top: 65
        },

        {
            left: 76,
            top: 68
        }

    ];


    const secondPositions = [

        {
            left: 18,
            top: 42
        },

        {
            left: 48,
            top: 22
        },

        {
            left: 78,
            top: 48
        },

        {
            left: 31,
            top: 74
        },

        {
            left: 65,
            top: 75
        }

    ];


    const beePositions = [

        {
            left: 55,
            top: 18
        },

        {
            left: 85,
            top: 38
        },

        {
            left: 10,
            top: 58
        }

    ];


    honeyTotalElement.textContent =
        CONFIG.totalHoney;


    /* -----------------------------------------------------
       LIMPIAR JUEGO
    ----------------------------------------------------- */

    function clearGameArea() {

        const dynamicElements =
            gameArea.querySelectorAll(
                ".honey-jar, .game-bee"
            );

        dynamicElements.forEach(
            element => {

                element.remove();

            }
        );

    }


    /* -----------------------------------------------------
       ACTUALIZAR HUD
    ----------------------------------------------------- */

    function updateGameHUD() {

        gameTimer.textContent =
            gameTimeLeft;

        honeyFoundElement.textContent =
            honeyFound;

    }


    /* -----------------------------------------------------
       MENSAJE
    ----------------------------------------------------- */

    function setGameMessage(
        message
    ) {

        gameMessage.textContent =
            message;

    }


    /* -----------------------------------------------------
       CREAR FRASCO
    ----------------------------------------------------- */

    function createHoneyJar(
        position,
        index
    ) {

        const jar =
            document.createElement(
                "button"
            );


        jar.type =
            "button";


        jar.className =
            "honey-jar";


        jar.textContent =
            "🍯";


        jar.dataset.index =
            index;


        jar.setAttribute(
            "aria-label",
            `Frasco de miel ${index + 1}`
        );


        jar.style.left =
            `${position.left}%`;

        jar.style.top =
            `${position.top}%`;


        jar.addEventListener(
            "click",
            event => {

                event.preventDefault();

                collectHoney(jar);

            }
        );


        gameArea.appendChild(
            jar
        );

    }


    /* -----------------------------------------------------
       CREAR ABEJA
    ----------------------------------------------------- */

    function createBee(
        position,
        index
    ) {

        const bee =
            document.createElement(
                "button"
            );


        bee.type =
            "button";


        bee.className =
            "game-bee";


        bee.textContent =
            "🐝";


        bee.dataset.index =
            index;


        bee.setAttribute(
            "aria-label",
            "Abeja"
        );


        bee.style.left =
            `${position.left}%`;

        bee.style.top =
            `${position.top}%`;


        bee.addEventListener(
            "click",
            event => {

                event.preventDefault();

                hitBee(bee);

            }
        );


        gameArea.appendChild(
            bee
        );

    }


    /* -----------------------------------------------------
       COLOCAR FRASCOS
    ----------------------------------------------------- */

    function createHoneyJars(
        positions
    ) {

        positions.forEach(
            (position, index) => {

                if (
                    index <
                    CONFIG.totalHoney
                ) {

                    createHoneyJar(
                        position,
                        index
                    );

                }

            }
        );

    }


    /* -----------------------------------------------------
       COLOCAR ABEJAS
    ----------------------------------------------------- */

    function createBees() {

        beePositions
            .slice(
                0,
                CONFIG.totalBees
            )
            .forEach(
                (position, index) => {

                    createBee(
                        position,
                        index
                    );

                }
            );

    }


    /* -----------------------------------------------------
       MOVER FRASCOS
    ----------------------------------------------------- */

    function moveHoneyJars() {

        const jars =
            gameArea.querySelectorAll(
                ".honey-jar:not(.found)"
            );


        jars.forEach(
            (jar, index) => {

                if (
                    secondPositions[index]
                ) {

                    jar.style.left =
                        `${secondPositions[index].left}%`;

                    jar.style.top =
                        `${secondPositions[index].top}%`;

                }

            }
        );


        if (gameStarted) {

            setGameMessage(
                "¡La miel cambió de lugar! 🐝"
            );

        }

    }


    /* -----------------------------------------------------
       RECOGER MIEL
    ----------------------------------------------------- */

    function collectHoney(
        jar
    ) {

        if (
            !gameStarted ||
            jar.classList.contains(
                "found"
            )
        ) {
            return;
        }


        jar.classList.add(
            "found"
        );


        honeyFound++;

        updateGameHUD();


        if (
            honeyFound >=
            CONFIG.totalHoney
        ) {

            winGame();

            return;

        }


        setGameMessage(
            `¡Encontraste un frasco! Te faltan ${
                CONFIG.totalHoney -
                honeyFound
            }.`
        );

    }


    /* -----------------------------------------------------
       TOCAR ABEJA
    ----------------------------------------------------- */

    function hitBee(
        bee
    ) {

        if (
            !gameStarted ||
            bee.classList.contains(
                "hit"
            )
        ) {
            return;
        }


        bee.classList.add(
            "hit"
        );


        beesHit++;


        gameTimeLeft =
            Math.max(
                0,
                gameTimeLeft -
                CONFIG.beePenalty
            );


        updateGameHUD();


        if (
            gameTimeLeft <= 0
        ) {

            loseGame(
                "¡Las abejas te hicieron perder demasiado tiempo! 🐝"
            );

            return;

        }


        setGameMessage(
            `¡Cuidado con las abejas! -${CONFIG.beePenalty} segundos.`
        );

    }


    /* -----------------------------------------------------
       GANAR
    ----------------------------------------------------- */

    function winGame() {

        if (!gameStarted) {
            return;
        }


        gameStarted = false;


        stopGameTimers();


        setGameMessage(
            "🎉 ¡Lo lograste! Encontraste toda la miel. El pequeño osito está feliz."
        );


        startGame.innerHTML =
            `
            <i class="fa-solid fa-rotate-right"></i>
            Jugar nuevamente
            `;

    }


    /* -----------------------------------------------------
       PERDER
    ----------------------------------------------------- */

    function loseGame(
        customMessage
    ) {

        if (!gameStarted) {
            return;
        }


        gameStarted = false;


        stopGameTimers();


        setGameMessage(
            customMessage ||
            "Se terminó el tiempo. ¡Inténtalo nuevamente!"
        );


        startGame.innerHTML =
            `
            <i class="fa-solid fa-rotate-right"></i>
            Intentar nuevamente
            `;

    }


    /* -----------------------------------------------------
       DETENER TEMPORIZADORES
    ----------------------------------------------------- */

    function stopGameTimers() {

        if (gameInterval) {

            clearInterval(
                gameInterval
            );

            gameInterval = null;

        }


        if (gameMoveTimeout) {

            clearTimeout(
                gameMoveTimeout
            );

            gameMoveTimeout = null;

        }

    }


    /* -----------------------------------------------------
       INICIAR JUEGO
    ----------------------------------------------------- */

    function startGameFunction() {

        stopGameTimers();


        gameStarted = true;

        gameTimeLeft =
            CONFIG.gameTime;

        honeyFound = 0;

        beesHit = 0;


        clearGameArea();

        updateGameHUD();


        createHoneyJars(
            honeyPositions
        );

        createBees();


        setGameMessage(
            "¡Encuentra los 5 frascos! Pero cuidado con las abejas. 🐝"
        );


        startGame.innerHTML =
            `
            <i class="fa-solid fa-hourglass-half"></i>
            Misión en curso
            `;


        /* -------------------------------------------------
           CUENTA DEL JUEGO
        ------------------------------------------------- */

        gameInterval =
            setInterval(
                () => {

                    if (!gameStarted) {
                        return;
                    }


                    gameTimeLeft--;

                    updateGameHUD();


                    if (
                        gameTimeLeft <= 0
                    ) {

                        gameTimeLeft = 0;

                        updateGameHUD();

                        loseGame();

                    }

                },
                1000
            );


        /* -------------------------------------------------
           CAMBIO DE POSICIÓN
        ------------------------------------------------- */

        gameMoveTimeout =
            setTimeout(
                () => {

                    if (gameStarted) {

                        moveHoneyJars();

                    }

                },
                CONFIG.honeyMoveAt * 1000
            );

    }


    /* -----------------------------------------------------
       BOTÓN INICIO
    ----------------------------------------------------- */

    startGame.addEventListener(
        "click",
        startGameFunction
    );


}


initializeGame();


/* =========================================================
   WHATSAPP
========================================================= */

function initializeWhatsApp() {

    const whatsappButton =
        document.getElementById(
            "whatsappButton"
        );


    if (!whatsappButton) {
        return;
    }


    whatsappButton.addEventListener(
        "click",
        () => {

            const message =
                encodeURIComponent(
                    "Hola 🌿 Quiero confirmar mi asistencia al Baby Shower."
                );


            const url =
                `https://wa.me/${CONFIG.whatsapp}?text=${message}`;


            whatsappButton.href =
                url;

        }
    );

}


initializeWhatsApp();


/* =========================================================
   PARALLAX SUAVE
========================================================= */

function initializeParallax() {

    const heroBackground =
        document.querySelector(
            ".hero-background"
        );

    const countdownBackground =
        document.querySelector(
            ".countdown-background"
        );

    const rsvpBackground =
        document.querySelector(
            ".rsvp-background"
        );

    const endingBackground =
        document.querySelector(
            ".ending-background"
        );


    const backgrounds = [
        heroBackground,
        countdownBackground,
        rsvpBackground,
        endingBackground
    ].filter(Boolean);


    if (!backgrounds.length) {
        return;
    }


    let ticking = false;


    function updateParallax() {

        const scrollY =
            window.scrollY;


        backgrounds.forEach(
            background => {

                const rect =
                    background
                        .parentElement
                        .getBoundingClientRect();


                const offset =
                    (
                        rect.top +
                        rect.height / 2 -
                        window.innerHeight / 2
                    ) * 0.05;


                background.style.transform =
                    `scale(1.04) translateY(${offset}px)`;

            }
        );


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        { passive: true }
    );


    updateParallax();

}


initializeParallax();


/* =========================================================
   PROTECCIÓN CONTRA COPIA
========================================================= */

/*
   Esto funciona como una barrera de disuasión
   contra copias casuales.

   No existe una protección absoluta para contenido
   que se muestra en un navegador.
*/


document.addEventListener(
    "contextmenu",
    event => {

        event.preventDefault();

    }
);


document.addEventListener(
    "selectstart",
    event => {

        /*
           Permitimos selección dentro de inputs,
           textarea y select por si posteriormente
           se agregan formularios.
        */

        const target =
            event.target;

        if (
            target.matches(
                "input, textarea, select"
            )
        ) {
            return;
        }


        event.preventDefault();

    }
);


document.addEventListener(
    "dragstart",
    event => {

        if (
            event.target.tagName ===
            "IMG"
        ) {

            event.preventDefault();

        }

    }
);


document.addEventListener(
    "copy",
    event => {

        event.preventDefault();

    }
);


document.addEventListener(
    "cut",
    event => {

        event.preventDefault();

    }
);


document.addEventListener(
    "paste",
    event => {

        /*
           Solo impedimos pegar fuera de formularios.
        */

        const target =
            event.target;

        if (
            target.matches(
                "input, textarea"
            )
        ) {
            return;
        }


        event.preventDefault();

    }
);


/* =========================================================
   ATAJOS DE TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const key =
            event.key.toLowerCase();

        const modifier =
            event.ctrlKey ||
            event.metaKey;


        if (
            modifier &&
            [
                "c",
                "x",
                "v",
                "a",
                "s",
                "u",
                "p"
            ].includes(key)
        ) {

            const target =
                event.target;


            if (
                target.matches(
                    "input, textarea, select"
                )
            ) {
                return;
            }


            event.preventDefault();

        }

    }
);


/* =========================================================
   EVITAR ARRASTRE DE TODAS LAS IMÁGENES
========================================================= */

document.querySelectorAll(
    "img"
).forEach(
    image => {

        image.setAttribute(
            "draggable",
            "false"
        );

    }
);


/* =========================================================
   CERRAR MENÚ SI SE CAMBIA A DESKTOP
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 800 &&
            mainNav
        ) {

            mainNav.classList.remove(
                "active"
            );

            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {
            return;
        }


        /* Cerrar menú */

        if (
            mainNav &&
            mainNav.classList.contains(
                "active"
            )
        ) {

            mainNav.classList.remove(
                "active"
            );


            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }


        /* Cerrar lightbox */

        const lightbox =
            document.getElementById(
                "lightbox"
            );


        if (
            lightbox &&
            lightbox.classList.contains(
                "active"
            )
        ) {

            lightbox.classList.remove(
                "active"
            );

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow =
                "";

        }

    }
);


/* =========================================================
   INICIALIZACIÓN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateHeader();

        updateBackToTop();

        updateCountdown();

    }
);