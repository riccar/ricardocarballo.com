import $ from 'jquery';
import slick from 'slick-carousel';

  $(document).ready(function(){
    $('.viewer').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 20000,
    });
  });