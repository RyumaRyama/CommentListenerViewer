const css_data = `
* {
  margin: 0;
  overflow: hidden;
  background-color: rgb(0, 255, 0);
}

.listener-viewer {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100vw;
  height: 0;
  box-sizing: border-box;
  // position: absolute;
}

img {
  flex-shrink: 0;
  margin-top: ${img_margin}px;
  width: ${img_size}px;
  height: ${img_size}px;
  border-radius: 50%;
  box-sizing: content-box;
}
`;
