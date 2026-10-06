
document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector(".header");
  const toggle=document.querySelector(".mobile-toggle");
  const nav=document.querySelector(".nav-links");

  const onScroll=()=>{
    header?.classList.toggle("scrolled", window.scrollY>20);
    document.querySelectorAll(".scale-on-scroll").forEach(el=>{
      const r=el.getBoundingClientRect();
      const vh=window.innerHeight;
      const center=r.top+r.height/2;
      const dist=Math.min(1,Math.abs(center-vh/2)/(vh*.8));
      const scale=1.02-(dist*.08);
      el.style.transform=`scale(${scale.toFixed(3)})`;
    });
  };
  window.addEventListener("scroll",onScroll,{passive:true}); onScroll();

  toggle?.addEventListener("click",()=>{
    nav?.classList.toggle("open");
    toggle.setAttribute("aria-expanded",nav?.classList.contains("open")?"true":"false");
  });

  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
  },{threshold:.14});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  // timeline interaction
  const steps=[...document.querySelectorAll(".time-step")];
  const detail=document.querySelector(".timeline-detail");
  steps.forEach((step,i)=>{
    step.addEventListener("click",()=>{
      steps.forEach(s=>s.classList.remove("active"));
      step.classList.add("active");
      if(detail){
        const title=step.dataset.title||"عنوان مرحله";
        const text=step.dataset.text||"توضیحات این مرحله بعداً توسط کلینیک تکمیل می‌شود.";
        detail.querySelector("h4").textContent=title;
        detail.querySelector("p").textContent=text;
        const link=detail.querySelector("a");
        if(link) link.href=step.dataset.href||"#";
      }
    });
  });

  // FAQ
  document.querySelectorAll(".faq-q").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const item=btn.parentElement;
      item.classList.toggle("open");
      btn.setAttribute("aria-expanded",item.classList.contains("open")?"true":"false");
    });
  });
});


// Auto-rotating testimonial slider: changes every 10 seconds.
(function setupTestimonialSlider(){
  const slider=document.querySelector('.testimonial-slider');
  const track=slider?.querySelector('.testimonial-track');
  const cards=slider?[...slider.querySelectorAll('.testimonial-card')]:[];
  const prev=slider?.querySelector('.slider-prev');
  const next=slider?.querySelector('.slider-next');
  const dotsWrap=document.querySelector('.slider-dots');
  if(!slider || !track || cards.length===0) return;

  let index=0;
  let timer=null;

  const visibleCount=()=>{
    if(window.innerWidth<=780) return 1;
    if(window.innerWidth<=1100) return 2;
    return 4;
  };

  const maxIndex=()=>Math.max(0,cards.length-visibleCount());

  const renderDots=()=>{
    if(!dotsWrap) return;
    const total=maxIndex()+1;
    dotsWrap.innerHTML='';
    for(let i=0;i<total;i++){
      const dot=document.createElement('button');
      dot.type='button';
      dot.className='slider-dot'+(i===index?' active':'');
      dot.setAttribute('aria-label',`رفتن به اسلاید ${i+1}`);
      dot.addEventListener('click',()=>{index=i; update(); restart();});
      dotsWrap.appendChild(dot);
    }
  };

  const update=()=>{
    const count=visibleCount();
    const gap=parseFloat(getComputedStyle(track).gap)||0;
    const cardWidth=cards[0].getBoundingClientRect().width;
    const distance=(cardWidth+gap)*index;
    // RTL track: moving left reveals the next cards in reading order.
    track.style.transform=`translate3d(-${distance}px,0,0)`;
    dotsWrap?.querySelectorAll('.slider-dot').forEach((dot,i)=>dot.classList.toggle('active',i===index));
  };

  const goNext=()=>{index=index>=maxIndex()?0:index+1;update();};
  const goPrev=()=>{index=index<=0?maxIndex():index-1;update();};
  const start=()=>{clearInterval(timer);timer=setInterval(goNext,10000);};
  const restart=()=>start();

  next?.addEventListener('click',()=>{goNext();restart();});
  prev?.addEventListener('click',()=>{goPrev();restart();});
  window.addEventListener('resize',()=>{index=Math.min(index,maxIndex());renderDots();update();});

  renderDots();
  update();
  start();
})();

// Hover/pan treatment for the About image: enlarge and gently move only on hover.
(function setupAboutImageHover(){
  const media=document.querySelector('.about-image');
  const img=media?.querySelector('img');
  if(!media || !img) return;
  media.addEventListener('pointermove',(e)=>{
    const r=media.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-.5)*2;
    const y=((e.clientY-r.top)/r.height-.5)*2;
    img.style.transform=`scale(1.14) translate3d(${(-x*2.8).toFixed(2)}%,${(-y*2.8).toFixed(2)}%,0)`;
  });
  media.addEventListener('pointerleave',()=>{img.style.transform='scale(1) translate3d(0,0,0)';});
})();

// Insurance slider: compact cards with 10-second autoplay.
(function setupInsuranceSlider(){
  const slider=document.querySelector('.insurance-slider');
  const track=slider?.querySelector('.insurance-track');
  const cards=slider?[...slider.querySelectorAll('.insurance-card')]:[];
  const prev=slider?.querySelector('.insurance-prev');
  const next=slider?.querySelector('.insurance-next');
  const dotsWrap=document.querySelector('.insurance-dots');
  if(!slider || !track || !cards.length) return;
  let index=0,timer=null;
  const visibleCount=()=>window.innerWidth<=450?1:window.innerWidth<=780?2:window.innerWidth<=1100?4:6;
  const maxIndex=()=>Math.max(0,cards.length-visibleCount());
  const renderDots=()=>{
    if(!dotsWrap) return;
    dotsWrap.innerHTML='';
    for(let i=0;i<=maxIndex();i++){
      const dot=document.createElement('button');
      dot.type='button'; dot.className='insurance-dot'+(i===index?' active':'');
      dot.setAttribute('aria-label',`رفتن به اسلاید بیمه ${i+1}`);
      dot.addEventListener('click',()=>{index=i;update();restart();});
      dotsWrap.appendChild(dot);
    }
  };
  const update=()=>{
    const gap=parseFloat(getComputedStyle(track).gap)||0;
    const width=cards[0].getBoundingClientRect().width;
    track.style.transform=`translate3d(-${(width+gap)*index}px,0,0)`;
    dotsWrap?.querySelectorAll('.insurance-dot').forEach((d,i)=>d.classList.toggle('active',i===index));
  };
  const goNext=()=>{index=index>=maxIndex()?0:index+1;update();};
  const goPrev=()=>{index=index<=0?maxIndex():index-1;update();};
  const start=()=>{clearInterval(timer);timer=setInterval(goNext,10000);};
  const restart=()=>start();
  next?.addEventListener('click',()=>{goNext();restart();});
  prev?.addEventListener('click',()=>{goPrev();restart();});
  window.addEventListener('resize',()=>{index=Math.min(index,maxIndex());renderDots();update();});
  renderDots();update();start();
})();
