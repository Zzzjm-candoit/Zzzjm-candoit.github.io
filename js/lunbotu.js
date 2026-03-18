document.addEventListener('DOMContentLoaded', function () {

    const sliderWrapper = document.querySelector('.slider-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorItems = document.querySelectorAll('.indicator-item');
    const bannerSlider = document.querySelector('.banner-slider');

  
    let currentIndex = 0; 
    const slideCount = indicatorItems.length; 
    let autoPlayTimer = null;
    
    function goToSlide(index) {
        
        if (index < 0) {
            currentIndex = slideCount - 1; // 小于0则跳转到最后一张
        } else if (index >= slideCount) {
            currentIndex = 0; // 大于等于总数则跳转到第一张
        } else {
            currentIndex = index; // 正常范围则使用传入的索引
        }

        // 计算并设置轮播容器的平移距离
        const translateValue = `translateX(-${currentIndex * 992}px)`;
        sliderWrapper.style.transform = translateValue;

        indicatorItems.forEach((item, idx) => {
            if (idx === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            goToSlide(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            goToSlide(currentIndex + 1);
        });
    }

    if (indicatorItems.length > 0) {
        indicatorItems.forEach((item) => {
            item.addEventListener('click', function () {
                const targetIndex = parseInt(this.dataset.index);
                goToSlide(targetIndex);
            });
        });
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(function () {
            goToSlide(currentIndex + 1);
        }, 3000);
    }

    // 7. 暂停自动轮播函数
    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }
    
    startAutoPlay();

    if (bannerSlider) {
        // 鼠标移入轮播区域，暂停自动轮播
        bannerSlider.addEventListener('mouseenter', stopAutoPlay);
        // 鼠标移出轮播区域，恢复自动轮播
        bannerSlider.addEventListener('mouseleave', startAutoPlay);
    }
});