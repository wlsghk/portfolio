window.onload = function () {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const oneYears = document.querySelector(".vision-folder-1 > img");
  const threeYears = document.querySelector(".vision-folder-3 > img");
  const subtitle = document.querySelector('.intro-subtitle');
  const skillsBox = document.querySelector('.skills-box');
  const projects = document.querySelector('.nav-projects');
  const vision = document.querySelector('.nav-vision > a');

  // aos 연결
  AOS.init();

  // projects json 연결
  fetch("./assets/project.json")
    .then((res) => res.json())
    .then((result) => {
      makeList(result);
    });

  // makeList에 내용 밀어넣기
  function makeList(data) {
    swiperWrapper.innerHTML = null;
    data.forEach((item) => {
      const div = document.createElement("div");
      div.className = "projects-box swiper-slide";
      div.innerHTML = `
      <div class="projects-box-header">${item.title}</div>
      <div class="projects-box-img"><img src="${item.image}" /></div>
      <div class="projects-box-txt"><div class="projects-box-subtitle">${item.subtitle}</div></div>
      <div class="projects-link"><a href="${item.link}" target="_blank" class="projects-link-demo">Demo</a><a href="${item.github}" class="projects-link-github" target="_blank">Github</a></div>
      `;
      swiperWrapper.appendChild(div);
    });
  }

  // Swiper 작동
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
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

  // 비전 타이핑 효과
  const visionTxt = document.querySelector(".vision-right-txt");
  let letters = ["폴더를 클릭해 주세요!"];

  let proc = {};

  oneYears.addEventListener("click", function () {
    if (!proc.oneYears) {
      proc.oneYears =
        "주어진 일에 최선을 다하고 있을 것입니다. 늘 배운다는 자세로 퇴근 후와 주말에도 새로운 기술을 익히기 위해 공부할 것입니다. 매일 조금씩 성장하여 제가 꿈꾸는 개발자의 모습에 가까워지겠습니다.";
    }
  });

  threeYears.addEventListener("click", function () {
    if (!proc.oneYears) {
      proc.oneYears = "초심 그대로 최신 언어와 기술을 익히는 데에 소홀하지 않을 것입니다. 맡은 일에 책임감을 가지고 임하는 훌륭한 프론트엔드 개발자가 되겠습니다.";
    }
  });
  // 속도
  const speed = 100;
  let i = 0;
  // 타이핑 효과
  const typing = async () => {
    for (const p in proc) {
      typingProc(proc[p]);
      return delete proc[p];
    }
    typingProc("폴더를 클릭하고 기다려 주세요!");
  };

  const typingProc = async (msg) => {
    const letter = msg.split("");
    while (letter.length) {
      await wait(speed);
      visionTxt.innerHTML += letter.shift();
    }
    // 잠시 대기
    await wait(800);
    // 지우기
    remove(msg);
  };
  // 글자 지우기
  const remove = async (msg) => {
    const letter = msg.split("");
    while (letter.length) {
      await wait(speed);
      letter.pop();
      visionTxt.innerHTML = letter.join("");
    }
    // 다음 순서의 글자로 지정, 타이핑 함수 다시 실행
    i = !letters[i + 1] ? 0 : i + 1;

    running = null;

    //다음꺼 있으면 실행.
    typing();
  };
  // 딜레이 기능
  function wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
  // 초기 실행
  let running = setTimeout(typing, 0);

  oneYears.addEventListener('click', function () {
    this.src = "../icon/openFolder.png"
    threeYears.src = "../icon/folder.png"
  })

  threeYears.addEventListener('click', function () {
    this.src = "../icon/openFolder.png"
    oneYears.src = "../icon/folder.png"
  })

  // 메인 resize 내용 줄바꿈
  window.addEventListener('resize', function () {
    if (innerWidth <= 676) {
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
  const projectsStart = document.querySelector('.projects-box');
  projects.addEventListener("click", function () {
    threeYears.scrollIntoView({ behavior: "smooth" });
  });
};