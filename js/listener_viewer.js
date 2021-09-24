class ListenerViewer {
  constructor() {
    this.createListenerViewerContainer();
    this.base_viewer_size = 540;

    const listener_viewer_window_size = JSON.parse(localStorage.getItem('listener_viewer_window_size'));
    this.listener_viewer_window_height = listener_viewer_window_size?.height ? parseInt(listener_viewer_window_size?.height) : 810;
    this.listener_viewer_window_width = listener_viewer_window_size?.width ? parseInt(listener_viewer_window_size?.width) : 1440;
    this.setListenerViewerWindow();

    this.listener_hash = {};
    this.loop = false;
  }

  element = () => {
    return this.listener_viewer_container;
  };

  createListenerViewerContainer = () => {
    this.listener_viewer_container = document.createElement('div');
    this.listener_viewer_container.id = 'listener-viewer-container';
    this.listener_viewer = document.createElement('div');
    this.listener_viewer.classList.add('listener-viewer');
    this.element().appendChild(this.listener_viewer);
  };

  setListenerViewerWindow = () => {
    this.listener_viewer_window = window.open('', 'listener-viewer-window', 'fullscreen=no,width='+this.listener_viewer_window_width+',height='+this.listener_viewer_window_height);
    const style = document.createElement('style');
    style.innerHTML = css_data;
    this.listener_viewer_window.document.head.innerHTML = '';
    this.listener_viewer_window.document.title = 'CommentListenerViewer';
    this.listener_viewer_window.document.head.appendChild(style);
    this.listener_viewer_window.document.body.innerHTML = '';
    this.listener_viewer_window.document.body.appendChild(this.element());
    this.listener_viewer_window.onresize = this.inputListenerWindowSizeToLocalStorage;
    this.timer = 0;

    window.onbeforeunload = () => {
      this.listener_viewer_window.close();
    };
  };

  inputListenerWindowSizeToLocalStorage = () => {
    const height = this.listener_viewer_window.innerHeight;
    const width = this.listener_viewer_window.innerWidth;
    localStorage.setItem(
      'listener_viewer_window_size',
      JSON.stringify({
        height: height,
        width: width,
      })
    );
  };

  addListenerImg = (img) => {
    if (!!this.listener_hash[img.src]) return;
    this.listener_hash[img.src] = img;
    this.listener_viewer.appendChild(img);

    const listener_viewer_height = Object.keys(this.listener_hash).length * (img_margin + img_size);
    this.listener_viewer.style.height = listener_viewer_height;

    if (this.loop) return;
    const window_height = this.listener_viewer_window.innerHeight;
    if (window_height - top_margin > listener_viewer_height) return;
    this.loop = true;
    const clone_element = this.listener_viewer.cloneNode(true);
    this.addAutoScroll(this.listener_viewer);
    this.listener_viewer = clone_element;
    this.element().appendChild(clone_element.cloneNode(true));
  };

  addAutoScroll = (element) => {
    const animation = element.animate([
      {
        height: '0px',
      }
    ], element.childElementCount*scroll_time*1000);
    animation.onfinish = () => {
      const next = element.nextSibling;
      this.addAutoScroll(next);
      this.element().appendChild(this.listener_viewer.cloneNode(true));
      element.remove();
    };
  };
}
