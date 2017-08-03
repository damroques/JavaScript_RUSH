
$(document).ready(function(){

  var peutBouger=false;
  var moveIt = 100;

  $.fn.mygame = function(size)
  {
    var size = size;
    var gameObject = $(this).attr('id');
    var blockSize = size;
    var boardSize = size * 4 + (size / 6);

    $('main').append('<div id ="board"></div>');
    $("#board").css({'width': boardSize , 'height':boardSize});

    for(var x = 0; x < 4; x++) {
      for(var y = 0; y < 4; y++) {
        var unit = $('<div class="square-container caseVide" valeurRangee="'+x+'" valeurColonne="'+y+'"></div>').css({'width':blockSize ,'height':blockSize});

        unit.appendTo('#board');

      }
      $('#board').append('<div style = "clear:both"></div>');

    }
    plus();
    plus();

    $(document).keydown(function(event)
    {
      if(peutBouger)
      {
        peutBouger=false;
        aBouge=false;

        switch(event.keyCode)
        {
          // ...........................................move left
          case 37:
          $('.tile').sort(function(a,b)
          {
            var attrA = $(a).attr('valeurColonne');

            var attrB = $(b).attr('valeurColonne');

            if(attrA>attrB)
            {
              return 1;
            }
            if(attrA<attrB)
            {
              return -1;
            }
            return 0;
          })

          .each(function()
          {
            var maColonne = parseInt($(this).attr('valeurColonne'));
            var maRangee = parseInt($(this).attr('valeurRangee'));
            var destination = maColonne;

            $(this).attr('valeurDétruite',0)

            if(maColonne>0)
            {
              for(x=maColonne-1;x>=0;x--)
              {
                if($('.square-container[valeurColonne='+x+'][valeurRangee='+maRangee+']').hasClass('casePleine'))
                {
                  if($(this).html()==$('.tile[valeurColonne='+x+'][valeurRangee='+maRangee+']').html())
                  {
                    $(this).attr('valeurDétruite',1)
                    destination = x;
                  }
                  break;
                }
                else{
                  destination = x
                }
              }
              if(maColonne!=destination)
              {
                aBouge=true;
              }
              $(this).animate(
                {
                  left: '-='+ ((size)*(maColonne-destination))
                },moveIt,function()
                {
                  if($(this).attr('valeurDétruite')==1)
                  {
                    $('.tile[valeurColonne='+destination+'][valeurRangee='+maRangee+']').html(parseInt($(this).html()*2));
                    $(this).remove();
                  }
                });
                $('.square-container[valeurColonne='+maColonne+'][valeurRangee='+maRangee+']').removeClass('casePleine').addClass('caseVide');
                $(this).attr('valeurColonne',destination);
                $('.square-container[valeurColonne='+destination+'][valeurRangee='+maRangee+']').removeClass('caseVide').addClass('casePleine');

              }
            });
            break;
            // ..............................................move right
            case 39:
            $('.tile').sort(function(a,b)
            {
              var attrA = $(a).attr('valeurColonne');
              var attrB = $(b).attr('valeurColonne');

              if(attrA > attrB){
                return -1;
              }
              if(attrA < attrB)
              {
                return 1;
              }
              return 0;
            })

            .each(function()
            {
              var maColonne = parseInt($(this).attr('valeurColonne'));
              var maRangee = parseInt($(this).attr('valeurRangee'));
              var destination = maColonne;
              $(this).attr('valeurDétruite',0)

              if(maColonne<4){

                for(x=maColonne+1;x<=3;x++)
                {
                  if($('.square-container[valeurColonne='+x+'][valeurRangee='+maRangee+']').hasClass('casePleine'))
                  {
                    if($(this).html()==$('.tile[valeurColonne='+x+'][valeurRangee='+maRangee+']').html())
                    {
                      $(this).attr('valeurDétruite',1)
                      destination = x;
                    }
                    break;
                  }
                  else
                  {
                    destination = x
                  }
                }
                if(maColonne != destination)
                {
                  aBouge = true;
                }
                $(this).animate({
                  left: '+='+ ((size)*(destination-maColonne))
                },moveIt,function()
                {
                  if($(this).attr('valeurDétruite')==1)
                  {
                    $('.tile[valeurColonne='+destination+'][valeurRangee='+maRangee+']').html(parseInt($(this).html()*2));
                    $(this).remove();
                  }
                });
                $('.square-container[valeurColonne='+maColonne+'][valeurRangee='+maRangee+']').removeClass('casePleine').addClass('caseVide');
                $(this).attr('valeurColonne',destination);
                $('.square-container[valeurColonne='+destination+'][valeurRangee='+maRangee+']').removeClass('caseVide').addClass('casePleine');
              }
            })
            break;
            // ............................................move up....
            case 38:
            $('.tile').sort(function(a,b)
            {
              var attrA = $(a).attr('valeurRangee');
              var attrB = $(b).attr('valeurRangee');
              if(attrA>attrB)
              {
                return 1;
              }
              if(attrA < attrB)
              {
                return -1;
              }
              return 0;
            })

            .each(function()
            {
              var maColonne = parseInt($(this).attr('valeurColonne'));
              var maRangee = parseInt($(this).attr('valeurRangee'));
              var destination = maRangee;

              $(this).attr('valeurDétruite',0)

              if(maRangee>0)
              {
                for(x=maRangee-1;x>=0;x--)
                {
                  if($('.square-container[valeurColonne='+maColonne+'][valeurRangee='+x+']').hasClass('casePleine'))
                  {
                    if($(this).html()==$('.tile[valeurColonne='+maColonne+'][valeurRangee='+x+']').html())
                    {
                      $(this).attr('valeurDétruite',1)
                      destination = x;
                    }
                    break;
                  }
                  else
                  {
                    destination = x
                  }
                }
                if(destination!=maRangee)
                {
                  aBouge=true;
                }
                $(this).animate(
                  {
                    top: '-='+ ((size)*(maRangee-destination))
                  },moveIt,function()
                  {
                    if($(this).attr('valeurDétruite')== 1)
                    {
                      $('.tile[valeurColonne='+maColonne+'][valeurRangee='+destination+']').html(parseInt($(this).html()*2));
                      $(this).remove();
                    }
                  });
                  $('.square-container[valeurColonne='+maColonne+'][valeurRangee='+maRangee+']').removeClass('casePleine').addClass('caseVide');
                  $(this).attr('valeurRangee',destination);
                  $('.square-container[valeurColonne='+maColonne+'][valeurRangee='+destination+']').removeClass('caseVide').addClass('casePleine');
                }
              })
              break;
              // ................................................move down
              case 40:
              $('.tile').sort(function(a,b)
              {
                var attrA = $(a).attr('valeurRangee');
                var attrB = $(b).attr('valeurRangee');
                if(attrA > attrB)
                {
                  return -1;
                }
                if(attrA < attrB)
                {
                  return 1;
                }
                return 0;
              })

              .each(function()
              {
                var maColonne = parseInt($(this).attr('valeurColonne'));
                var maRangee = parseInt($(this).attr('valeurRangee'));
                var destination = maRangee;
                $(this).attr('valeurDétruite',0);
                if(maRangee<4)
                {
                  for(x = maRangee+1; x <= 3; x++)
                  {
                    if($('.square-container[valeurColonne='+maColonne+'][valeurRangee='+x+']').hasClass('casePleine'))
                    {
                      if($(this).html() == $('.tile[valeurColonne='+maColonne+'][valeurRangee='+x+']').html())
                      {
                        $(this).attr('valeurDétruite',1)
                        destination = x;
                      }
                      break;
                    }
                    else
                    {
                      destination = x
                    }
                  }
                  if(destination!=maRangee)
                  {
                    aBouge=true;
                  }
                  $(this).animate(
                    {
                      top: '+='+ ((size)*(destination-maRangee))
                    },moveIt,function()
                    {
                      if($(this).attr('valeurDétruite')==1)
                      {
                        $('.tile[valeurColonne='+maColonne+'][valeurRangee='+destination+']').html(parseInt($(this).html()*2));
                        $(this).remove();
                      }
                    });
                    $('.square-container[valeurColonne='+maColonne+'][valeurRangee='+maRangee+']').removeClass('casePleine').addClass('caseVide');
                    $(this).attr('valeurRangee',destination);
                    $('.square-container[valeurColonne='+maColonne+'][valeurRangee='+destination+']').removeClass('caseVide').addClass('casePleine');
                  }
                })
                break;
              }
              if(aBouge)
              {
                plus();
              }
              else{
                peutBouger=true;
              }
            }
          });
          function plus()
          {
            var casesVides = $('.caseVide').length;
             console.log(casesVides);
            var deuxOPif = Math.floor(Math.random()*casesVides);
            var tile = $('.caseVide').eq(deuxOPif);
            var deuxOu4 = Math.random() < 0.5 ? 2 : 4;
            $(tile).removeClass('caseVide');
            $(tile).addClass('casePleine');
            var gameOver = $('.caseVide').length;

            var positionCase = $(tile).position();

            // console.log(positionCase);
            if(casesVides<2 && peutBouger==false){
              $('#gameOver').html('Game Oveeerr');

            }
            $('#board').append('<div id = "lastadded" class = "tile" valeurRangee="'+$(tile).attr('valeurRangee')+'" valeurColonne="'+$(tile).attr('valeurColonne')+'">'+deuxOu4+'</div>')
            $('.tile').css({
              "width": size ,
              "height" : size
            })
            $('#lastadded').css({top:(positionCase.top),left:(positionCase.left)})
            $('#lastadded').fadeTo(moveIt*3,1,function(){

              peutBouger=true;
              showScore();
            })
            $('#lastadded').attr('id','');
          }
          function showScore()
          {
            var score = 0;
            $('.tile').sort(function(a,b){
              var attrA = parseInt($(a).html());
              var attrB = parseInt($(b).html());

              if(attrA>attrB)
              {
                return -1;
              }
              if(attrA<attrB)
              {
                return 1;
              }
              return 0;
            }).each(function()
            {
              score += parseInt($(this).html());

            });
            score*=parseInt($('.tile').first().html());
            score *=0.5;
            $('#monScoreDiv').html('Ton score: '+score);

          }

        };


        $("body").mygame(120);


      });
