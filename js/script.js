window.onload = function () {
    const swiperProject = document.querySelector(".projects-wrapper");
    const oneYears = document.querySelector(".vision-folder-1 > img");
    const threeYears = document.querySelector(".vision-folder-3 > img");
    const subtitle = document.querySelector('.intro-subtitle');
    const skillsBox = document.querySelector('.skills-box');
    const navMain = document.querySelector('.nav-main > img');
    const navProjects = document.querySelector('.nav-projects');
    const navVision = document.querySelector('.nav-vision');
    const intro = document.querySelector('.intro');
    const header = document.querySelector('.header');
    const introduceFirstImg = document.querySelector('.introduce-first > img');
    const introduceSecondImg = document.querySelector('.introduce-second > img')

    // aos 연결
    AOS.init();

    // 원 페이지 Swiper 작동
    var firstwSwiper = new Swiper(".first-swiper", {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // 랜딩 페이지 typing 효과
    let content = `저의 포트폴리오 사이트에 오신 것을 환영합니다. \n 엔터 키를 누르면 작업물을 볼 수 있습니다. \n 귀중한 시간을 내어 구경해 주셔서 감사합니다. \n \t \n * 만약 어떤 문제를 발견한다면 \n 푸터에 있는 이메일로 연락해 주세요. \n \t \n Press ENTER key to continue`;
    let typing = document.querySelector(".msg");
    let i = 0;

    function typingText() {
        if (i < content.length) {
            let txt = content.charAt(i);
            typing.innerHTML += txt == "\n" ? "<br/>" : txt;
            i++;
        }
    }

    setInterval(typingText, 100);

    // projects json 연결
    fetch("assets/project.json")
        .then((res) => res.json())
        .then((result) => {
            makeList(result);
        });

    // makeList에 내용 밀어넣기
    function makeList(data) {
        swiperProject.innerHTML = null;
        data.forEach((item) => {
            const div = document.createElement("div");
            div.className = "projects-box swiper-slide";
            div.innerHTML = `
      <div class="projects-box-header">${item.title}</div>
      <div class="projects-box-img"><img src="${item.image}" /></div>
      <div class="projects-box-txt"><div class="projects-box-subtitle">${item.subtitle}</div></div>
      <div class="projects-link"><a href="${item.link}" target="_blank" class="projects-link-demo">Demo</a><a href="${item.github}" class="projects-link-github" target="_blank">Github</a></div>
      `;
            swiperProject.appendChild(div);
        });
    }

    // Swiper 작동
    var secondSwiper = new Swiper(".second-swiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".projects-box",
            clickable: true,
        },
        breakpoints: {
            "@0.00": {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
            },
        },
    });


    // 메인 resize 내용 줄바꿈
    window.addEventListener('resize', function () {
        if (innerWidth <= 769) {
            subtitle.innerHTML = `<p>
      개발자를 꿈꾸는 배진화의 포트폴리오 페이지입니다. 2023년 2월, 대구 그린아트 컴퓨터 학원에서 기업 요구를 반영한 디지털비즈니스 웹앱(UX)디자인 & 개발자 양성과정을 수료했습니다. 현재는 리액트를 공부하며 포트폴리오를 채워 나가고 있습니다.</p>`
        } else {
            subtitle.innerHTML = `
      <p>
        개발자를 꿈꾸는 배진화의 포트폴리오 페이지입니다. 2023년 2월,
        대구 그린아트 컴퓨터 <br />학원에서 기업 요구를 반영한
        디지털비즈니스 웹앱(UX)디자인 & 개발자 양성과정을 수료<br />했습니다.
        현재는 리액트를 공부하며 포트폴리오를 채워 나가고 있습니다.
      </p>
    `;
        }
    })

    // 스킬 테이블 resize 배치 변경
    window.addEventListener('resize', function () {
        if (innerWidth <= 688) {
            skillsBox.innerHTML = `
      <tr><td class="html">HTML</td><td class="css">CSS</td></tr>
      <tr><td class="js">JavaScript</td><td class="react">React.js</td></tr>`
        } else {
            skillsBox.innerHTML = `
      <tr>
        <td class="html">HTML</td>
        <td class="css">CSS</td>
        <td class="js">JavaScript</td>
        <td class="react">React.js</td>
      </tr>
      `;
        }
    })

    // 네비 바 클릭하면 위치 이동
    const projects = document.querySelector('.projects');
    const introduce = document.querySelector('.introduce');
    const introSecret = document.querySelector('.intro-secret');
    navProjects.addEventListener('click', function () {
        projects.scrollIntoView({ behavior: 'smooth' });
    })
    navVision.addEventListener('click', function () {
        introduce.scrollIntoView({ behavior: 'smooth' });
    })
    navMain.addEventListener('click', function () {
        introSecret.scrollIntoView({ behavior: 'smooth' });
    })

    // 엔터 키 누르면 인트로 스크롤
    window.addEventListener('keyup', e => {
        if (e.key === 'Enter') {
            introSecret.scrollIntoView({ behavior: 'smooth' });
        }
    })

    window.addEventListener("wheel", (e) => {
        if (e.deltaY === 100 || e.deltaY < -100) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
        // console.log(e.deltaY, e.deltaX);
    })

    // introduce 이미지에 마우스오버 시 이미지 변경
    introduceFirstImg.addEventListener("mouseover", (e) => {
        introduceFirstImg.src = "./img/health.png";
    });
    introduceFirstImg.addEventListener("mouseout", (e) => {
        introduceFirstImg.src = "./img/before.png";
    });

    introduceSecondImg.addEventListener("mouseover", (e) => {
        introduceSecondImg.src = "./img/travel.png";
    });
    introduceSecondImg.addEventListener("mouseout", (e) => {
        introduceSecondImg.src = "./img/before.png";
    });
}
