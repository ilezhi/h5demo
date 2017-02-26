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
  var mySwiper = new Swiper('#picSwiper', {
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

  var myNewsSwiper = new Swiper('#newsSwiper', {
    onSlideChangeEnd: function (swiper) {
      var cur = swiper.realIndex + 1;
      $('#mainNews').find('.tab-num .num').text(cur);
      $('#mainNews').find('.news-bottom-btn .circle').removeClass('active').eq(cur - 1).addClass('active');
    }
  });

  if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(/{([^{}]*)}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };
  }

  var template = ['<li>',
                    '<a href="{linkTo}">',
                      '<aside class="img-title">',
                        '<img src="{pic}" />',
                      '</aside>',
                      '<div class="cont">',
                        '<h4>{title}</h4>',
                        '<div class="comt-wrap">',
                          '<span>{comt}<i></i></span>',
                        '</div>',
                      '</div>',
                    '</a>',
                  '</li>'].join('');

  // 点击展开更多
  $('#newsMore').on('click', function() {
    var isLoading = $(this).data('isLoading');

    if (isLoading) {
      return;
    }

    $(this).data('isLoading', true);
    var that = this;
    $.get('/data/news.json', function (data) {
      var elStr = data.map(function (row) {
        return template.supplant(row);
      });

      $('#newsList').append(elStr);
      $(that).data('isLoading', false);
    });
  });

  var myFeedNews = new Swiper('#newsFeedSwiper', {
    freeMode: true,
    slidesPerView: 2.5,
    offsetSlidesAfter : 2.5
  });

  var sportsNews = new Swiper('#sportsSwiper', {
    freeMode: true,
    slidesPerView: 2.5,
    offsetSlidesAfter : 2.5
  });

});
