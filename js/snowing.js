 function makeOne() {
        let initX = (Math.random() * 100 - 50);
        let initY = (Math.random() * 100 + 100);
        let initZ = (Math.random() * 100 - 50);
        let snowflakeText = '<a-entity class="snow" position="' + initX + ' ' + initY + ' ' + initZ + '" rotation="0 0 0" obj-model="obj: #snowflake;" scale=".2 .2 .2" material="side:double;transparent:true;src:#flake_tile"><a-animation attribute="position" easing="linear" dur="' + (Math.random() * 20000 + 15000) + '" fill="forwards" to="' + initX + ' ' + (Math.random() * 40 - 200) + ' ' + initZ + '"></a-animation><a-animation attribute="rotation" easing="linear" dur="' + (Math.random() * 20000 + 15000) + '" fill="forwards" to="' + (Math.random() * 30) + ' ' + (Math.random() * 360) + ' 0"></a-animation></a-entity>';
        $(snowflakeText).appendTo($('a-scene'));
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

