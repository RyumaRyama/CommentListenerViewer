class CommentObserver {
  constructor(listener_viewer) {
    this.listener_viewer = listener_viewer;
  };

  startObservation = async () => {
    const comments = document.getElementById('item-offset').firstElementChild;
    const observer = new MutationObserver(() => {
      this.getListener(comments.lastElementChild);
    });
    const config = { childList: true };
    observer.observe(comments, config);
  };

  getListener = (chat_data) => {
    const img = chat_data.querySelector('img');
    this.listener_viewer.addListenerImg(img);
  };
}
