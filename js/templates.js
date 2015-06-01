$(document).ready(function()
{
  $.templates("priceTemplate",   "#priceTemplate");
  $.templates("sectionTemplate", "#sectionTemplate");

  $(".column_header").each(function(index, element)
  {
     var html = $.render.priceTemplate({index: index + 1});
     $(this).html(html);
  });

  for(var index=1; index <= 12; index++)
  {
     var html = $.render.sectionTemplate({index: index});
     $("#sectionContainer").append(html);
  }
});

