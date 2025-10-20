document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  if(body.dataset.animation == "eclipse"){
    const eclipse_tl = getEclipseTimeline();
    eclipse_tl.pause();
    eclipse_tl.duration(1.5);
    eclipse_tl.play();
  } 

 if(body.dataset.animation == "pennsylvania"){
    const pa_tl = getPATimeline();
    pa_tl.pause();
    pa_tl.duration(1.5);
    pa_tl.play();
 }

 navButtonSetup();
});

function handleCards(newCard = null){
  const url = new URL(window.location);
  const details = url.searchParams.get("details") ?? "home";
  const currentCard = document.querySelector(`.card--current`);
  const card = document.querySelector(`.card[data-href=${details}]`);
  console.log("handleCard",details,card,currentCard);
  if(card && card != currentCard){
    let tl;
    switch (details){
      case "home":
        window.location.reload();
        break;
      case "pa":
        tl = getPATimeline();
        tl.pause();
        tl.duration(0.75);
        break;
      case "spain":
        tl = getSpainTimeline();
        tl.pause();
        tl.duration(0.75);
        break;
      default:
        break;
      }
    tl.play();
    cardAnimation(currentCard, card);
  }
}

function cardAnimation(currentCard, newCard) {
  if (!currentCard) return;
  const out_tl = gsap.timeline({
    onComplete: () => {
      currentCard.classList.remove("card--current");
      gsap.set(currentCard, { clearProps: "all" });
      newCard.classList.add("card--current");
      gsap.set(newCard, { clearProps: "all", opacity: 1 });
      //in
      gsap.fromTo(newCard,{
        x: 500,
      },
      {
        x: 0,
        duration:0.5
      }
      )
    }
  });

  //out
  out_tl.to(currentCard, {
    x: -500,   
    duration: 0.35,
    ease: "power1.inOut"
  },0)
  .to(currentCard, {
    rotate: -15,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  }, 0)
  .to(currentCard,{
    height: newCard.offsetHeight,
    duration: 1,
  }, 0); 

  out_tl.delay(0.5).duration(0.5);
}

function slideInCard_tl(card) {
  if (!card) return;

  const tl = gsap.timeline({
    onStart: () => card.classList.add("card--current")
  });

  tl.fromTo(card,
    { x: "50vw", rotate: -15, opacity: 0 },
    {
      x: "0vw",
      rotate: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }
  );

  return tl;
}

function getEclipseTimeline() {
  
  const body = document.body;
  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");
  const stars = document.querySelectorAll(".star");
  const tl = gsap.timeline();

  gsap.set(document.querySelectorAll('.sun-wrapper *'), { clearProps: "all"});
  gsap.set(stars, { clearProps: "all" });

  tl.addLabel("move",0).addLabel("corona","+=0.75");
  
  tl.fromTo(moon, {
    left: "-55%",
    bottom: "-105%"
  },{
    left:  "0%",
    bottom: "0%",
    duration:0.75,
    ease:"none"
  }, 'move');

  tl.fromTo(body, {
    "--space": "#87ceeb",
  },{
    "--space": "#002038",
    duration:1,
    ease:"none"
  }, 'move');

  tl.fromTo(moon, {
    filter: "brightness(1)",
  },{
    filter: "brightness(0)",
    duration:0.65,
    ease:"none"
  }, 'corona-=0.5' );

  tl.fromTo(sun,{
    background: '#ffad00',
  },
  {
    background: 'transparent',
    duration:0.25,
    ease:"none"
  },'corona-=0.125');

  tl.fromTo(sun.querySelectorAll('.corona-ray'), {
    opacity:0,
  },{
    opacity:1,
    duration:0.25,
    ease:"none"
  }, 'corona');

  tl.fromTo(stars,{
    background:'transparent'
  },{
    background:'white',
    ease:"power2.out",
    duration:1
  }, 'move')
  

  return tl;
}

function getPATimeline() {
  const body = document.body;
  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");
  const stars = document.querySelectorAll(".star");

  gsap.set(document.querySelectorAll('.sun-wrapper *'), { clearProps: "all"});
  gsap.set(stars, { clearProps: "all" });

  const tl = gsap.timeline({
    onComplete: () =>{
      sun.classList.remove("spain-mask");
      sun.classList.add("pa-mask");
        gsap.fromTo(sun,{
          background: '#ffad00',
          maskSize: '150%',
        }, {
          background: '#032d61',
          maskSize: '90%',
          duration:0.5
        })
    }
  });

  tl.to(stars,{
    background:'transparent',
    ease:"power2.out",
    duration:1
  }, 'move');

  tl.addLabel("corona",0).addLabel("move","+=0.50");
  
  tl.fromTo(moon, {
    filter: "brightness(0)",
  },{
    filter: "brightness(1)",
    duration:0.65,
    ease:"none"
  }, 'corona' );

  tl.fromTo(sun,{
    background: 'transparent',
  },
  {
    background: '#ffad00',
    duration:0.4,
    ease:"none"
  },'corona');

  tl.fromTo(sun.querySelectorAll('.corona-ray'), {
    opacity:1,
  },{
    opacity:0,
    duration:0.25,
    ease:"none"
  }, 'corona');
  
  tl.fromTo(moon, {
    left: "0%",
    bottom: "0%",
    opacity:1,
  },{
    left:  "35%",
    bottom: "-275%",
    opacity:0,
    duration:1,
    ease:"none"
  }, 'corona+=0.15');

  tl.fromTo(body, {
    "--space": "#002038",
  },{
    "--space": "#87ceeb",
    duration:1,
    ease:"none"
  }, 'move');
  

  // tl.fromTo(moon, {
  //   opacity: 1,
  // },{
  //   opacity:0,
  //   duration:0.25,
  //   ease:"power2.out"
  // }, 'move');


  return tl;
}

function getSpainTimeline() {
  const body = document.body;
  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");
  const stars = document.querySelectorAll(".star");

  gsap.set(document.querySelectorAll('.sun-wrapper *'), { clearProps: "all"});
  gsap.set(stars, { clearProps: "all" });

  const tl = gsap.timeline({
    onComplete: () =>{
      sun.classList.remove("pa-mask");
      sun.classList.add("spain-mask");
        gsap.fromTo(sun,{
          background: '#ffad00',
          maskSize: '150%',
        }, {
          background: '#AA151B',
          maskSize: '100%',
          duration:0.5
        });
    }
  });

  tl.to(stars,{
    background:'transparent',
    ease:"power2.out",
    duration:1
  }, 'move');

  tl.addLabel("corona",0).addLabel("move","+=0.50");
  
  tl.fromTo(moon, {
    filter: "brightness(0)",
  },{
    filter: "brightness(1)",
    duration:0.65,
    ease:"none"
  }, 'corona' );

  tl.fromTo(sun,{
    background: 'transparent',
  },
  {
    background: '#ffad00',
    duration:0.4,
    ease:"none"
  },'corona');

  tl.fromTo([sun.querySelectorAll('.corona-ray'), sun.querySelectorAll('.corona-blur')], {
    opacity:1,
  },{
    opacity:0,
    duration:0.25,
    ease:"none"
  }, 'corona');
  
  tl.fromTo(moon, {
    left: "0%",
    bottom: "0%",
    opacity:1,
  },{
    left:  "35%",
    bottom: "-275%",
    opacity:0,
    duration:1,
    ease:"none"
  }, 'corona+=0.15');

  tl.fromTo(body, {
    "--space": "#002038",
  },{
    "--space": "#87ceeb",
    duration:1,
    ease:"none"
  }, 'move');
  

  // tl.fromTo(moon, {
  //   opacity: 1,
  // },{
  //   opacity:0,
  //   duration:0.25,
  //   ease:"power2.out"
  // }, 'move');


  return tl;
}

function navButtonSetup(){
  const buttons = document.querySelectorAll("button.nav-button");
  buttons.forEach(button => {
    button.addEventListener("click", function(e){
      // e.preventDefault();
      const href = e.target.dataset.href;
      window.scrollTo(0, 0);
      if(href != "home"){
        addQueryParam("details", href);
      } else {
        addQueryParam("details", "");
      }
      handleCards();
    })
  });
}


function addQueryParam(key, value) {
  const url = new URL(window.location);
  if(value == ""){
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }
  history.replaceState({}, "", url);
}