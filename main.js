$(function () {
  var sina = {
    init: function () {
      // 顶部导航隐藏一部分
      var $menus = $('#myMenu').children();
      var count = $menus.length;
      $menus.slice(11, count - 1).addClass('hide');
    }
  };

  sina.init();

  $('#collapseMenu').on('click', function () {
    var $siblings = $(this).siblings();
    var $hide = $siblings.filter('.hide')
    var isHide = $hide.length >= 1;
    var $arrow = $(this).find('.btn-collapse');

    if (isHide) {
      $hide.removeClass('hide');
      $arrow.removeClass('down').addClass('up');
      return;
    }

    $siblings.slice(11, $siblings.length).addClass('hide');
    $arrow.removeClass('up').addClass('down');
  });

  // 顶部轮播图
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: 3000,
    initialSlide: 1,
    onInit: function (swiper) {
      var count = swiper.slides.length - 2;
      var cur = swiper.realIndex + 1;
      $('#indicators').find('.curNum').text(cur)
                      .next().text(count);

    },
    onSlideChangeEnd: function (swiper) {
      var cur = swiper.realIndex + 1;
      $('#indicators').find('.curNum').text(cur);
    }
  });
});
