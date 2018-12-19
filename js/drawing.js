    function createDot(className, x, y){
     return '<div class="' + className + '" style="left:' + x + 'px;top:' + y + 'px;"></div>';  

   } 
   function makeFirstDot(tileX, tileY, offsetX, offsetY){
      let dataUrl = tile.toDataURL()
      operations.push(dataUrl.toString());
      tileContext.globalCompositeOperation = 'destination-out';
      dotContext.globalCompositeOperation = 'source-over';
      tileContext.beginPath();
      dotContext.beginPath();
      tileContext.moveTo(tileX, tileY);
      dotContext.moveTo(offsetX, offsetY);
      isDrawing = 1;
      return createDot('first dot', offsetX, offsetY);
   }

   function continueDrawing(tileX, tileY, offsetX, offsetY){
     tileContext.lineTo(tileX, tileY);
     dotContext.lineTo(offsetX, offsetY);
     dotContext.stroke();
     isDrawing++;
     return createDot('dot', offsetX, offsetY);
   }

   function endDrawing(){
      tileContext.closePath();
      tileContext.fill();
      dotContext.closePath();
      dotContext.clearRect(0, 0, $('#dot_canvas').width(), $('#dot_canvas').height());
      isDrawing = 0;
      $('.dot').remove();
   }
   
   function clearDotCanvas(){
        dotContext.clearRect(0, 0, $('#dot_canvas').width(), $('#dot_canvas').height());
        $('.dot').remove();
   }
    
   function applyImg(dataUrl) {
        $('a-assets > img').attr('src', dataUrl);
        $('.sample').remove();
        $(sampleText).appendTo($('.container'))
    }

   function applyHistory(condition){
       let img = new Image();
         img.onload = function(){
         tileContext.globalCompositeOperation = 'copy';
         tileContext.drawImage(img, 0, 0,  $('#main_canvas').width(), $('#main_canvas').height());
      };
      img.src = condition;
      applyImg(condition);
   }

   function paper() {
        $('#main_canvas').attr('height', $('.wrapper').height() * 0.7 * 2)
        $('#main_canvas').attr('width', $('.wrapper').height() * 0.7 * 0.54838709677 * 2)
        $('#dot_canvas').attr('width', $('.wrapper').width() * 2)
        $('#dot_canvas').attr('height', $('.wrapper').height() * 2)
        tile = document.getElementById("main_canvas");
        tile.style.width = tile.width / 2 + 'px';
        tile.style.height = tile.height / 2 + 'px';
        tile.getContext('2d').scale(2, 2);
        tileContext = tile.getContext("2d");
        tileContext.fillStyle = "rgba(255,255,255,1)";
        tileContext.fillRect(0, 0, $('#main_canvas').width(), $('#main_canvas').height());
        $('.cover.right').css('top', ($('#main_canvas').offset().top - $('.wrapper').offset().top) + 'px');
        $('.cover.left').css('top', ($('#main_canvas').offset().top - $('.wrapper').offset().top) + 'px');
        $('.cover.right').css('left', (($('.wrapper').width() - $('#main_canvas').width()) / 2 + $('#main_canvas').width()) + 'px');
        $('.cover.left').css('right', (($('.wrapper').width() - $('#main_canvas').width()) / 2 + $('#main_canvas').width()) + 'px');
        dot = document.getElementById("dot_canvas");
        dot.style.width = dot.width / 2 + 'px';
        dot.style.height = dot.height / 2 + 'px';
        dot.getContext('2d').scale(2, 2);
        dotContext = dot.getContext("2d");
        dotContext.fillStyle = "rgba(255,0,0,1)";
        dotContext.strokeStyle = '#666';
        dotContext.setLineDash([2, 4]);
        dotContext.lineWidth = 1;
    }

    function getImage() {
      html2canvas($('.wrapper').get(0)).then(function(canvas) {
      let img = canvas.toDataURL();
      let link = document.createElement('a');
      link.href = img;
      link.download = 'snowflake.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
     });
    }
