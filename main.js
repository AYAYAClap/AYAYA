document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector('.hamburger');
    const header = document.querySelector('#header');
    const mask = document.querySelector('#mask');
    const naviLinks = document.querySelectorAll('#navi a');
    const bg = document.querySelector('.bg');
    const butya = document.getElementById('butya');
    const misuta = document.getElementById('misuta');
    
    // ハンバーガーメニュー
    hamburger.addEventListener('click', () => {
        header.classList.toggle('open');
    });
    
    mask.addEventListener('click', () => {
        header.classList.remove('open');
    });
    
    naviLinks.forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('open');
        });
    });


    // スムーススクロール
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
      
    if (anchorLinks.length === 0) return;
      
    anchorLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
    
            const href = link.getAttribute('href');
    
            const target = (href === '#' || href === '')
            ? document.documentElement
            : document.querySelector(href);
    
            target?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    // フェード表示（IntersectionObserver）
    const observerOptions = {
        root: null,
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('fadein-show');
            observer.unobserve(entry.target);
        });
    }, observerOptions);
    
    document.querySelectorAll('.inview').forEach(el => {
        observer.observe(el);
    });

    
    // スクロールイベント
    let ticking = false;
    
    const handleScroll = () => {

        const scroll = window.scrollY;
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        //bg
        const butyaPos = butya.offsetTop - windowHeight;
        const misutaPos = misuta.offsetTop - windowHeight;
    
        if (scroll > butyaPos && scroll < misutaPos) {
            bg.classList.add('is-show');
        } else {
            bg.classList.remove('is-show');
        }
    
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    });
    
    window.addEventListener('resize', () => {
        requestAnimationFrame(handleScroll);
    });

    // カルーセル
    const track = document.querySelector('.carousel-track');
    const prev = document.querySelector('.carousel-prev');
    const next = document.querySelector('.carousel-next');
    
    if (!track || !prev || !next) return;
    
    const img = track.querySelector('img');
    
    const gap = parseInt(getComputedStyle(track).gap);
    const itemWidth = img.clientWidth + gap;
    
    const scrollAmount = itemWidth * 6;
    
    prev.classList.add('hide');
    
    next.addEventListener('click', () => {
    
        track.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    
        prev.classList.remove('hide');
        next.classList.add('hide');
    
    });
    
    prev.addEventListener('click', () => {
    
        track.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    
        prev.classList.add('hide');
        next.classList.remove('hide');
    
    });






});



