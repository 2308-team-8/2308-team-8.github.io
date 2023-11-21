document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.querySelector('#hamburger-menu-hover');
  const lines = document.querySelectorAll('.line');
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const ourTeam = document.querySelector('#our-team');
  const homeLink = document.querySelector('#home-link');
  const caseStudyLink = document.querySelector('#case-study-link');
  const ourTeamLink = document.querySelector('#our-team-link');
  const $sideNavLogo = $('#side-nav');
  const $caseStudyNav = $('#case-study nav');
  const caseStudyNav = document.querySelector('#case-study nav');
  const caseStudyNavUl = document.querySelector('#case-study nav ul');
  const mobileCaseStudyNavUl = document.querySelector('#case-study-mobile ul');
  const $toTop = $('#toTop-logo');

  $toTop.on('click', function (e) {
    e.preventDefault();
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $('#introduction').offset().top,
      },
      500,
    );
  });

  const snakeCaseify = (text) => text.toLowerCase().split(/ +/).join('-').replace(/\./g, '_');
  const getScrollPosition = () => window.scrollY;
  let scrollPosition = getScrollPosition();
  const getWindowHeight = () => window.innerHeight;
  const getWindowWidth = () => window.innerWidth;

  let lastH2Id;
  const linkableHeaders = [...document.querySelectorAll('#case-study h2, #case-study h3, #our-team h1')].map((el) => {
    if (el.nodeName === 'H2') {
      lastH2Id = el.id;
    }

    return {
      el,
      type: el.nodeName,
      text: el.textContent.replace(/^.*\) /, ''),
      parentId: lastH2Id
    }
  });

  const getCaseStudyHeadingPositions = () =>
    linkableHeaders.reduce((obj, headerObj) => {
      const selector = `#${snakeCaseify(headerObj.text)}`;
      const header = document.querySelector(selector);
      if(!header) {console.log(selector)}
      const position =
        getScrollPosition() + header.getBoundingClientRect().top - 30;
      obj[`${selector}-nav`] = {
        position,
        headerData: headerObj
      };

      return obj;
    }, {});

  const highlightSection = (li, a) => {
    li.style.listStyle = 'disc';
  
    li.style.color = "#D94E86";
    a.style.color = "#D94E86";
  };
  
  const mobileCaseStudyLinks = [];

  (function () {
    let lastH2Id;

    linkableHeaders.forEach((headerObj) => {
      if (headerObj.type === 'H2') {
        lastH2Id = headerObj.el.id;
      } else {
        headerObj.parentId = lastH2Id;
      }

      const li = document.createElement('li');
      li.id = snakeCaseify(`${headerObj.text.replace('!', '').toLowerCase()}-nav`);
      li.dataset['parentHeaderId'] = lastH2Id;
      li.dataset['tagType'] = headerObj.el.nodeName;

      const a = document.createElement('a');
      a.href = snakeCaseify(`#${headerObj.text.replace('!', '')}`);
      a.textContent = headerObj.text.toUpperCase();
      a.className = 'case-study-anchor';

      li.appendChild(a);
      caseStudyNavUl.appendChild(li);

      if (headerObj.type === 'H2') {
        const li2 = document.createElement('li');
        li2.id = snakeCaseify(
          `mobile-${headerObj.text.replace('!', '').toLowerCase()}-nav`,
        );
        li2.dataset['parentHeaderId'] = lastH2Id;
        li2.dataset['tagType'] = headerObj.el.nodeName;

        const a2 = document.createElement('a');
        a2.href = snakeCaseify(`#${headerObj.text.replace('!', '')}`);
        a2.textContent = headerObj.text.toUpperCase();

        mobileCaseStudyLinks.push(a2);
        li2.appendChild(a2);
        mobileCaseStudyNavUl.appendChild(li2);
      }

      headerObj.navEl = li;
    });
  }());

  const showNav = () => {
    const position = getScrollPosition();
    // const narrowScreen = isNarrowScreen();
    topNavVisible = true;

    // handleNavColors();
    scrollPosition = position;

    // if (narrowScreen) document.body.style.backgroundColor = '#282828';
    $(nav).slideDown('fast');

  
    lines.forEach(line => {
      line.style.backgroundColor = '#284389';
    });
  };

  const hideNav = () => {
    // smallNavVisible = false;
    topNavVisible = false;
    // handleNavColors();
    $(nav).slideUp('fast');
    // showSite();
    lines.forEach(line => {
      line.style.backgroundColor = '#ffffff';
    });
  };

  const handleNavDisplay = () => {
    console.log("hi")
    // if (isNarrowScreen()) {
    //   toggleNav();
    // } else {
      showNav();
    // }
  };

  const handleCaseStudyNavStyles = () => {
    const positions = getCaseStudyHeadingPositions();
    const positionValues = Object.values(positions);
    const mobileCaseStudyNav = document.querySelector('#case-study-mobile');
    const position = getScrollPosition();

    const currentParent = document.querySelector('nav li.active-parent');
    const currentChildren = document.querySelectorAll('nav li.active-child');
    let newParentId;

    positionValues.forEach((_, i) => {
      const currentData = positionValues[i].headerData;
      const li = currentData.navEl;
      const a = li.getElementsByTagName('a')[0];
      const currPosition = i > 0 ? positionValues[i].position : 0;
      const nextPositionIdx = i + 1;
      const nextPosition =
        (positionValues[nextPositionIdx] &&
          positionValues[nextPositionIdx].position) || 999999;
      const windowPositionIsAtLi = position >= currPosition && position < nextPosition;

      if (windowPositionIsAtLi && !mobileCaseStudyNav.contains(li)) {
        highlightSection(li, a);

        newParentId = currentData.parentId;
      } else {
        if (li.getAttribute('style')) li.removeAttribute('style');
        if (a.getAttribute('style')) a.removeAttribute('style');
      }
    });

    if (currentParent) {
      currentParent.classList.remove('active-parent');
    }

    currentChildren.forEach(child => child.classList.remove('active-child'));

    newActive = document.querySelectorAll(`[data-parent-header-id="${newParentId}"]`)
    newActive.forEach(el => {
      el.classList.add('active-child');
    });
  };

  const handleCaseStudyNav = () => {
    const position = getScrollPosition();
    let topOfCaseStudy = main.offsetTop;
    let topOfOurTeam = ourTeam.offsetTop;
    const withinCaseStudy =
      position >= topOfCaseStudy && position < topOfOurTeam - getWindowHeight();

    if (getWindowHeight() < 500 || getWindowWidth() < 1100) {
      $sideNavLogo.stop(true, true).css('display', 'none');
      $caseStudyNav.stop(true, true).css('display', 'none');
    } else if (withinCaseStudy) {
      $sideNavLogo.fadeIn(800);
      $caseStudyNav.fadeIn(800);
      $toTop.fadeIn(800);
      let test = $("#hamburger-menu-case-study");
      test.fadeIn(100);

      handleCaseStudyNavStyles();
    } else {
      $sideNavLogo.stop(true, true).css('display', 'none');
      $caseStudyNav.stop(true, true).css('display', 'none');
      $toTop.stop(true, true).css('display', 'none');
    }

    // if (getWindowHeight() < 500) {
    //   $toTop.stop(true, true).css('display', 'none');
    // } else if (withinCaseStudy) {
    //   $toTop.fadeIn(800);
    // } else {
    //   $toTop.stop(true, true).css('display', 'none');
    // }
  };

  function onScroll(event) {
    let offset = window.scrollY;
    let topOfCaseStudy = main.offsetTop;
    let topOfOurTeam = ourTeam.offsetTop;
    
    if (offset > topOfCaseStudy && offset < topOfOurTeam) {
      console.log('Entered case study section')
      lines.forEach(line => {
        line.style.backgroundColor = '#284389';
      });
    } else {
      console.log('Not in the case study section')
      lines.forEach(line => {
        line.style.backgroundColor = '#ffffff';
      });
    }
  }

  hamburgerMenu.addEventListener('click', handleNavDisplay);
  header.addEventListener('mouseenter', hideNav);
  main.addEventListener('mouseenter', hideNav);
  ourTeam.addEventListener('mouseenter', hideNav);
  homeLink.addEventListener('click', hideNav);
  caseStudyLink.addEventListener('click', hideNav);
  ourTeamLink.addEventListener('click', hideNav);


  caseStudyNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const positions = getCaseStudyHeadingPositions();
      const positionKey = `#${e.target.href.split('#')[1]}-nav`;
      const newScrollPosition = positions[positionKey].position;
      window.scrollTo(0, newScrollPosition + 5);
    }
  });

  document.addEventListener('scroll', () => {
    onScroll();
    handleCaseStudyNav();
  });
});

