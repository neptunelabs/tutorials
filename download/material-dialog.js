document.addEventListener("DOMContentLoaded", function(event){
  // add click events
  var downBtns = document.getElementsByClassName('download-btn');
  for (var i = 0; i < downBtns.length; i++) {
    downBtns[i].addEventListener('click', downloadImage);
  }
});

function openDownloadModal(evt, oCell){
  // change sizes
  var width1 = oCell.sourceWidth;
  var height1 = oCell.sourceHeight;
  var width2 = Math.round(width1) / 2;
  var height2 = Math.round(width2 / (width1 / height1));
  var width4 = Math.round(width1) / 4;
  var height4 = Math.round(width4 / (width1 / height1));

  var dss;
  dss = document.getElementById('dsSize1');
  dss.setAttribute('data-index', oCell.nIndex);
  dss.setAttribute('data-format', 'jpeg');
  dss.setAttribute('data-width', width4);
  dss.setAttribute('data-height', height4);
  dss.gridInstance = this;
  dss.addParameters = { quality: 90 };
  dss.innerText=width4+' x '+height4;

  dss = document.getElementById('dsSize2');
  dss.setAttribute('data-index', oCell.nIndex);
  dss.setAttribute('data-format', 'jpeg');
  dss.setAttribute('data-width', width2);
  dss.setAttribute('data-height', height2);
  dss.gridInstance = this;
  dss.addParameters = { quality: 90 };
  dss.innerText=width2+' x '+height2;

  dss = document.getElementById('dsSize5');
  dss.setAttribute('data-index', oCell.nIndex);
  dss.setAttribute('data-format', 'source');
  dss.setAttribute('data-width', width1);
  dss.setAttribute('data-height', height1);
  dss.gridInstance = this;
  dss.innerText=width1+' x '+height1;

  dss = document.getElementById('dsSize6');
  dss.setAttribute('data-index', oCell.nIndex);
  dss.setAttribute('data-format', 'png');
  dss.setAttribute('data-width', 'dsCustomWidth');
  dss.setAttribute('data-height', 'dsCustomHeight');
  dss.setAttribute('data-max-width', width1);
  dss.setAttribute('data-max-height', height1);
  dss.gridInstance = this;
  dss.addParameters = { effects: 'pad(CC,FFFF)' };

  dss = document.getElementById('dsCustomWidth');
  dss.max = width1;

  dss = document.getElementById('dsCustomHeight');
  dss.max = height1;

  // preview img
  var dpi = document.getElementById('downloadPreviewImg');
  var previewURL = this.getImageDownloadURL(oCell.nIndex, 80, 'jpeg');
  dpi.src = previewURL;

  var elems = document.getElementById('downloadSelection');
  var instances = M.Modal.init(elems, {dismissible: true, preventScrolling: false});
  instances.open();
}

function downloadImage(evt){
  if (evt.srcElement){
    var dsElem = evt.srcElement.getAttribute("data-size-elem");

    var sizeElem = document.getElementById(dsElem);
    if (sizeElem){
      var format = sizeElem.getAttribute('data-format');

      if (format !== 'source' && isNaN(sizeElem.getAttribute('data-width')) === false){
        var addParams = sizeElem.addParameters !== undefined ? sizeElem.addParameters : {};
        sizeElem.gridInstance.downloadImage(sizeElem.getAttribute('data-index'), sizeElem.getAttribute('data-width'), format, addParams);
      }
      else if (format !== 'source' && isNaN(sizeElem.getAttribute('data-width')) === true){

        var addParams = sizeElem.addParameters !== undefined ? sizeElem.addParameters : {};
        var widthId = sizeElem.getAttribute('data-width');
        if (widthId){
          var width = parseInt(document.getElementById(widthId).value);
          var maxWidth = sizeElem.getAttribute('data-max-width');
          width = width > maxWidth ? maxWidth: width;
          addParams.width = width;
        }
        var heightId = sizeElem.getAttribute('data-height');
        if (heightId){
          var height = parseInt(document.getElementById(heightId).value);
          if (height && height != ""){
            var maxHeight = sizeElem.getAttribute('data-max-height');
            height = height > maxHeight ? maxHeight : height;
            addParams.height = height;
          }
        }

        sizeElem.gridInstance.downloadImage(sizeElem.getAttribute('data-index'), width, format, addParams);
      }
      else {
        sizeElem.gridInstance.downloadSourceImage(sizeElem.getAttribute('data-index'));
      }
    }
  }
}