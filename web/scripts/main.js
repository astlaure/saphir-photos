function toggleLike(element, id) {
  const liked = element.classList.contains('selected');
  const token = document.querySelector('head meta[name=csrf]');

  fetch(ROOT_APP_URL + '/photos/likes', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _csrf: token.getAttribute('content'), id, liked: !liked }),
  }).then(() => {
    element.classList.toggle('selected');
  }).catch(() => {})
}

window.toggleLike = toggleLike;
