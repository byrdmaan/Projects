$('#banana').hover(function() {
        $(this).attr('src', '/./img/banana.jpg');
      }, function() {
        $(this).attr('src', '/./img/peel.jpg');
      });

      function PlaySound(soundobj) {
          var thissound=document.getElementById(soundobj);
          thissound.play();
      }

      function StopSound(soundobj) {
          var thissound=document.getElementById(soundobj);
          thissound.pause();
      }