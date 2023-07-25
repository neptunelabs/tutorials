// add key handler to remove all bookmarks
$FSI.addEvent(window, 'keyup', myKeyHandlerForThumbBar);

function myKeyHandlerForThumbBar(evt) {
  if (evt.keyCode === 46) {
    var elBar = document.getElementById('elThumbBarVert');
    elBar.removeAllImages();
  }
}

var nBookmarkCount = 1;
function onFSIViewChanged() {
  var elBar = document.getElementById('elThumbBarVert');

  // get the current image url from the FSI Viewer instance
  var url = this.getVisibleImageURL();

  var sourceImagePath = $FSI.utils.getParameterValueFromURL(url, 'source');
  var imageEffects = $FSI.utils.getParameterValueFromURL(url, 'effects');

  if (sourceImagePath) {
    // limit to max 50 bookmark thumbnails
    if (elBar.getImageCount() >= 50) elBar.removeImages(0);

    // we could just add the "sourceImagePath" as string to FSI ThumbBar,
    // but we want to add a label and the image section currently viewed as well
    var oImage = {
      src: sourceImagePath,
      parameters: {
        thumbLabel: 'bookmark #' + nBookmarkCount++,
        initialView: '1,1,' + this.getVisibleImageRect().toString(),
      },
    };

    // add the image effects as seen in the FSI Viewer instance (if any)
    if (imageEffects) oImage.parameters.effects = imageEffects;

    // add the image to the thumbnail bar
    var ret = elBar.addImages([oImage]);

    // scroll the vertical thumb bar to the image we just added
    elBar.focusImage(ret[0].nIndex);
  }
}