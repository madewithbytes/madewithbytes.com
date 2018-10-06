(function () {
  var posts = document.getElementsByClassName('post');
  for (var item of posts) {
    item.style.backgroundImage = `url(${item.dataset.bg})`;
  }
})();
