$(function () {
  // handleMenuOpen
  $('.J_MenuOpenBtn').click(function (e) {
    $(this).parents('#header').find('.J_MunePanel').removeClass('hidden').removeClass('opacity-0 scale-95').addClass('opacity-100 scale-100')
  });

  // handleMenuClose
  $('.J_MenuCloseBtn').click(function (e) {
    $(this).parents('#header').find('.J_MunePanel').removeClass('opacity-100 scale-100').addClass('opacity-0 scale-95').addClass('hidden')
  });
})
