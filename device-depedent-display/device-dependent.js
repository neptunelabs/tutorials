function initZoom() {
  var zoomDiv = document.getElementById('zoomImage');
  if ($FSI.isMobileDevice) {
    // any mobile device (Android/iOS/windows phone)
    var node = document.createElement('fsi-viewer');
    node.setAttribute('width', '600');
    node.setAttribute('height', '600');
    node.setAttribute('src', 'images/samples/showcase/handbags/80610_1.tif');
    zoomDiv.appendChild(node);
    $FSI.initCustomNode(node);
  } else {
    var image = document.createElement('img');
    image.setAttribute('width', '600');
    image.setAttribute(
      'src',
      '//docs.neptunelabs.com/fsi/server?type=image&source=images/samples/showcase/handbags/80610_1.tif&height=600&format=jpeg',
    );
    zoomDiv.appendChild(image);
    FSIQuickZoom = new $FSI.QuickZoom({debug: true, useDevicePixelRatio: true});
    FSIQuickZoom.init();
  }
}