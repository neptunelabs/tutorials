function switchImageSample() {
  // add "click" handler to all 3 thumbnail images
  for (var i = 1; i < 4; i++) {
    var el = document.getElementById('img' + i);
    $FSI.addEvent(el, 'click', onThumbnailClick);
  }
}

function onThumbnailClick() {
  var img = this.getElementsByTagName('img');

  if (img && img[0]) {
    // get the src attribute of the <img> tag
    var strImageURL = img[0].getAttribute('src');

    // get the "source" parameter value from the URL
    var src = $FSI.utils.getParameterValueFromURL(strImageURL, 'source');

    // change the image in FSI Viewer
    var parameters = {imagePath: src};
    var viewer = document.getElementById('myViewer');
    viewer.changeImage(parameters);
  }
}

addEventListener('DOMContentLoaded', (event) => {
  switchImageSample();
});