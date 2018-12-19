class Snowflake{
   constructor(x, y, z){
       this.x = x;
       this.y = y;
       this.z = z
   }

   toString(){
      return '<a-entity class="snow" position="' + this.x + ' ' + this.y + ' ' + this.z + '" rotation="0 0 0" obj-model="obj: #snowflake;" scale=".2 .2 .2" material="side:double;transparent:true;src:#flake_tile"><a-animation attribute="position" easing="linear" dur="' + (Math.random() * 20000 + 15000) + '" fill="forwards" to="' + this.x + ' ' + (Math.random() * 40 - 200) + ' ' + this.z + '"></a-animation><a-animation attribute="rotation" easing="linear" dur="' + (Math.random() * 20000 + 15000) + '" fill="forwards" to="' + (Math.random() * 30) + ' ' + (Math.random() * 360) + ' 0"></a-animation></a-entity>';
   }

} 



function makeOne() {
        let initX = (Math.random() * 100 - 50);
        let initY = (Math.random() * 100 + 100);
        let initZ = (Math.random() * 100 - 50);
        let snowflake = new Snowflake(initX, initY, initZ); 
        $(snowflake.toString()).appendTo($('a-scene'));
    }

    function maintain() {
        const numSnowflakes = 120;
        if ($('a-entity.snow').length < numSnowflakes) {
            makeOne();
        } else if ($('a-entity.snow').eq(0).attr('position').y < -100) {
            $('a-entity.snow').eq(0).remove();
        }
    }

    function snow() {
        randInterval = setInterval(function () {
            maintain();
        }, 300);
    }

    function backToPreview(){
      clearInterval(randInterval);
            $('a-entity.snow').remove();
            $('body').removeClass('snowing');
            $(sampleText).appendTo($('.container'));
            $('#cam').removeAttr('look-controls');
            $('#cam').attr('rotation', '0 0 0');
            scene = document.querySelector('a-scene');
            scene.exitVR();
   }

   function letItSnow(){
     $('body').addClass('snowing');
     let dataUrl = tile.toDataURL()
     applyImg(dataUrl);
     snow();
     $('.sample').remove();
     $('#cam').attr('look-controls', '')
   }

