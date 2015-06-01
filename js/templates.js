$(document).ready(function()
{
  $.templates("priceTemplate",   "#priceTemplate");
  $.templates("sectionTemplate", "#sectionTemplate");
  $.templates("legendItem",      "#legendItem");

  // By having this as *data* we could potentially translate
  // the text into different language, or pull the data from
  // the neocast data.
  var legend = [
    { icon: "house", name: "Speciality" },
    { icon: "veg",   name: "Vegetarian" },
    { icon: "hot",   name: "Spicy" }
  ];


  $(".column_header").each(function(index, element)
  {
    // Indexes are 0 based, your CSS/etc is 1 based, so add one to index
    var templateData = { index: index + 1 };
    var html = $.render.priceTemplate(templateData);
    $(this).html(html);

    // I would optimize this (for a good JS coder) to:
    // $(this).html($.render.priceTemplate({index: index+1});
  });

  for(var index=1; index <= 12; index++)
  {
    var templateData = { index: index };
    var html = $.render.sectionTemplate(templateData);
    $("#sectionContainer").append(html);

    // I would optimize this (for a good JS coder) to:
    //$("#sectionContainer").append($.render.sectionTemplate({index: index});
  }

  $(legend).each(function(index, templateData)
  {
    var html = $.render.legendItem(templateData);
    $("#legend .row").append(html);
  });
  // I would optimize this (for a good JS coder) to:
  // $(legend).each(function(index, templateData)
  // {
  //   $("#legend .row").append($.render.legendItem(templateData));
  // });
});

