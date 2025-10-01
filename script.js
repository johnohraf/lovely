document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Таймер дней ---
    const daysCounter = document.getElementById('days-counter');
    const startDate = new Date('2025-09-30T00:00:00');

    function updateTimer() {
        const currentDate = new Date();
        const diffTime = currentDate - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        daysCounter.textContent = diffDays >= 0 ? diffDays : 0;
    }
    updateTimer();
    setInterval(updateTimer, 1000 * 60 * 60); // Обновляем раз в час, для дней этого достаточно

    // --- 2. Анимация фона ---
    const background = document.getElementById('background-animation');
    const elements = ['❤', 'love', 'forever', 'amor', '✨', '💕', 'I love you'];

    function createFloatingElement() {
        const element = document.createElement('span');
        element.classList.add('floating-element');
        
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = `${Math.random() * 100}vw`;
        element.style.fontSize = `${1 + Math.random() * 1.5}rem`;
        element.style.animationDuration = `${10 + Math.random() * 10}s`;
        element.style.animationDelay = `${Math.random() * 5}s`;

        background.appendChild(element);

        setTimeout(() => {
            element.remove();
        }, 20000);
    }
    setInterval(createFloatingElement, 700);


    // --- 3. Музыкальный плеер ---
    // ВАЖНО: загрузка треков с телефона на GitHub Pages невозможна.
    // Сайт статичный. Треки нужно заранее положить в папку 'music'.
    const playlistData = [
        { title: 'Ваша любимая песня 1', src: 'music/track1.mp3' },
        { title: 'Романтичный трек 2', src: 'music/track2.mp3' },
        { title: 'Песня вашего знакомства 3', src: 'music/track3.mp3' },
    ];

    const audio = document.getElementById('audio-source');
    const trackTitle = document.getElementById('track-title');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const playlistElement = document.getElementById('playlist');

    let currentTrackIndex = 0;
    let isPlaying = false;

    // Загрузка плейлиста в HTML
    playlistData.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.title;
        li.dataset.index = index;
        playlistElement.appendChild(li);
    });
    
    const playlistItems = document.querySelectorAll('#playlist li');

    function loadTrack(index) {
        const track = playlistData[index];
        audio.src = track.src;
        trackTitle.textContent = track.title;
        currentTrackIndex = index;
        updatePlaylistUI();
    }

    function updatePlaylistUI() {
        playlistItems.forEach((item, index) => {
            if (index === currentTrackIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function playTrack() {
        isPlaying = true;
        audio.play();
        playBtn.textContent = '❚❚';
    }

    function pauseTrack() {
        isPlaying = false;
        audio.pause();
        playBtn.textContent = '▶';
    }

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    });

    prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + playlistData.length) % playlistData.length;
        loadTrack(currentTrackIndex);
        playTrack();
    });

    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlistData.length;
        loadTrack(currentTrackIndex);
        playTrack();
    });

    playlistItems.forEach(item => {
        item.addEventListener('click', () => {
            loadTrack(parseInt(item.dataset.index));
            playTrack();
        });
    });
    
    audio.addEventListener('ended', () => {
        nextBtn.click(); // Автоматически переключаем на следующий трек
    });

    loadTrack(0); // Загружаем первый трек при старте

    // --- 4. Карусель фотографий ---
    const slideContainer = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    const prevCarouselBtn = document.getElementById('carousel-prev');
    const nextCarouselBtn = document.getElementById('carousel-next');

    let carouselIndex = 0;
    const totalImages = images.length;

    function updateCarousel() {
        slideContainer.style.transform = `translateX(-${carouselIndex * 100}%)`;
    }

    nextCarouselBtn.addEventListener('click', () => {
        carouselIndex = (carouselIndex + 1) % totalImages;
        updateCarousel();
    });

    prevCarouselBtn.addEventListener('click', () => {
        carouselIndex = (carouselIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    });
    
    // Автоматическая прокрутка карусели
    setInterval(() => {
        nextCarouselBtn.click();
    }, 5000); // каждые 5 секунд

  
});

