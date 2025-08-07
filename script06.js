gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", function() {
  const slides = gsap.utils.toArray(".slide");
  const activeSlideImages = gsap.utils.toArray(".active-slide img");

  gsap.set(activeSlideImages, {opacity: 0});
  
  slides.forEach((slide, index) => {
    const isLeft = index % 2 === 1;
    const startX = isLeft ? "-20%" : "-80%";
  
    gsap.to(slide, {
      z: 3000,
      opacity: 1,
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true
      }
    });
    
    gsap.to(slide, {
      x: isLeft ? "-30%" : "-30%",
      scale: 1.5,
      opacity: 1,
      scrollTrigger: {
        trigger: ".container",
        start: `${index * 100}% top`,
        end: `${(index + 1) * 100}% top`,
        scrub: true
      }
    });
    
    ScrollTrigger.create({
      trigger: ".container",
      start: `${index * 10}% top`,
      end: `${(index + 1) * 10}% top`,
      onEnter: () => {
        gsap.to(activeSlideImages, {opacity: 0, duration: 0.0});
        gsap.to(activeSlideImages[index], {opacity: 1, duration: 0.0});
      },
      onEnterBack: () => {
        gsap.to(activeSlideImages, {opacity: 0, duration: 1.5});
        gsap.to(activeSlideImages[index], {opacity: 1, duration: 1.5});
      }
    });
  });
});
