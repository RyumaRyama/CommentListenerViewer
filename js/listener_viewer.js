class ListenerViewer {
  constructor() {
    this.createListenerViewerContainer();
    this.base_viewer_size = 540;

    const listener_viewer_window_size = JSON.parse(localStorage.getItem('listener_viewer_window_size'));
    this.listener_viewer_window_height = listener_viewer_window_size?.height ? parseInt(listener_viewer_window_size?.height) : 810;
    this.listener_viewer_window_width = listener_viewer_window_size?.width ? parseInt(listener_viewer_window_size?.width) : 1440;
    this.setListenerViewerWindow();
  }

  element = () => {
    return this.listener_viewer_container;
  };

  createListenerViewerContainer = () => {
    this.listener_viewer_container = document.createElement('div');
    this.listener_viewer_container.id = 'listener-viewer';
  };

  setListenerViewerWindow = () => {
    this.listener_viewer_window = window.open('', 'listener-viewer-window', 'fullscreen=no,width='+this.listener_viewer_window_width+',height='+this.listener_viewer_window_height);
    const style = document.createElement('style');
    style.innerHTML = css_data;
    this.listener_viewer_window.document.head.innerHTML = '';
    this.listener_viewer_window.document.title = 'GenericColonListenerViewer';
    this.listener_viewer_window.document.head.appendChild(style);
    this.listener_viewer_window.document.body.innerHTML = '';
    this.listener_viewer_window.document.body.appendChild(this.element());
    this.timer = 0;
    this.listener_viewer_window.onresize = this.windowResize;

    window.onbeforeunload = () => {
      this.listener_viewer_window.close();
    };
  };

  windowResize = () => {
    if (this.timer > 0) clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      const height_gap = this.listener_viewer_window.outerHeight - this.listener_viewer_window.innerHeight;
      const width_gap = this.listener_viewer_window.outerWidth - this.listener_viewer_window.innerWidth;

      let height = this.listener_viewer_window.innerHeight;
      let width = this.listener_viewer_window.innerWidth;
      if (height*16 > width*9) {
        this.listener_viewer_window.resizeTo(height * (16/9) + width_gap, height + height_gap);
      } else if (height*16 < width*9) {
        this.listener_viewer_window.resizeTo(width + width_gap, width * (9/16) + height_gap);
      }

      height = this.listener_viewer_window.innerHeight;
      width = this.listener_viewer_window.innerWidth;
      if (height*16 > (width+1)*9) {
        this.listener_viewer_window.resizeTo(width + width_gap, width * (9/16) + height_gap);
      } else if ((height+1)*16 < width*9) {
        this.listener_viewer_window.resizeTo(height * (16/9) + width_gap, height + height_gap);
      }

      this.inputListenerWindowSizeToLocalStorage();
    }, 25);
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
    this.element().appendChild(img);
  };
}
