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

    // Lookup the value for the item for this entry
    // -- use that to lookup the label, desc, and calories
    //    in the metadata using the value retrieved as the
    //    root of the key name.
  }

  setInterval(function()
  {
    for(var index=1; index <= 12; index++)
    {
      var item_key = NEOCAST.data.player('item-' + index);

      var label = NEOCAST.data.player(item_key);,           console.log("Change event for " + item_key + " with a value of "      + label + " into dom id #item-" + index); $("#item-" + index).html(label); });
      var desc  = NEOCAST.data.player(item_key + "_desc");  console.log("Change event for " + item_key + "_desc with a value of " + desc  + " into dom id #desc-" + index); $("#desc-" + index).html(desc);  });
      var cal   = NEOCAST.data.player(item_key + "_cal");   console.log("Change event for " + item_key + "_cal with a value of "  + cal   + " into dom id #cal-"  + index); $("#cal-"  + index).html(cal);   });
  }, 1000);

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

