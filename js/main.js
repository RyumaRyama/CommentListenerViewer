const main = async () => {
  const listener_viewer = new ListenerViewer();
  const comment_observer = new CommentObserver(listener_viewer);

  await comment_observer.startObservation();
}

main();
