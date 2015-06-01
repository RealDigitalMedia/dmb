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

  // This method takes the name of an "element" such that the
  // NEOCAST *KEY* is the same as the DOM element for which the
  // NEOCAST *VALUE* will be shoved into that element's DOM
  //
  // Following this pattern makes it easy to see where the
  // NEOCAST data goes to inside of an HTML page.
  //
  var setup_dom_element_to_refresh_its_value_from_same_named_neocast_key = function(element)
  {
    NEOCAST.data.player(element, function(value) { $("#" + element).html(value); });
  };

  $(".column_header").each(function(index, element)
  {
    // Indexes are 0 based, your CSS/etc is 1 based, so add one to index
    index = index + 1

    var templateData = { index: index };
    var html = $.render.priceTemplate(templateData);
    $(this).html(html);
    // I would optimize this (for a good JS coder) to:
    // $(this).html($.render.priceTemplate({index: index+1});

    // Display the price and type information whenever it changes
    setup_dom_element_to_refresh_its_value_from_same_named_neocast_key("price-" + index);
    setup_dom_element_to_refresh_its_value_from_same_named_neocast_key("type-" + index);
    // ^^^^^^ this is a shortcut for the following:
    // NEOCAST.data.player("price-" + index, function(value) { $("#price-" + index).html(value); });
    // NEOCAST.data.player("type-"  + index, function(value) { $("#type-"  + index).html(value); });
  });

  for(var index=1; index <= 12; index++)
  {
    var templateData = { index: index };
    var html = $.render.sectionTemplate(templateData);
    $("#sectionContainer").append(html);

    // I would optimize this (for a good JS coder) to:
    //$("#sectionContainer").append($.render.sectionTemplate({index: index});

    // Display the item, description and calorie info whenever loaded
    setup_dom_element_to_refresh_its_value_from_same_named_neocast_key("item-" + index);
    setup_dom_element_to_refresh_its_value_from_same_named_neocast_key("desc-" + index);
    setup_dom_element_to_refresh_its_value_from_same_named_neocast_key("cal-" + index);
    // ^^^^^^ this is a shortcut for the following:
    // NEOCAST.data.player("item-" + index, function(value) { $("#item-" + index).html(value); });
    // NEOCAST.data.player("desc-" + index, function(value) { $("#desc-"  + index).html(value); });
    // NEOCAST.data.player("cal-"  + index, function(value) { $("#cal-"   + index).html(value); });
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
  //
});

