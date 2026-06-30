import L from "leaflet";

import fire from "../assets/icons/fire.jpg";
import medical from "../assets/icons/medical.jpg";
import rescue from "../assets/icons/rescue.jpg";
import flood from "../assets/icons/flood.jpg";
import food from "../assets/icons/food.jpg";
import water from "../assets/icons/water.jpg";

function createIcon(iconUrl) {

  return new L.Icon({

    iconUrl,

    iconSize: [45, 45],

    iconAnchor: [22, 45],

    popupAnchor: [0, -40]

  });

}

export const resourceIcons = {

  fire: createIcon(fire),

  medical: createIcon(medical),

  rescue: createIcon(rescue),

  flood: createIcon(flood),

  food: createIcon(food),

  water: createIcon(water),

  default: createIcon(medical)

};