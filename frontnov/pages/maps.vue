<template>
    <ui-header></ui-header>

    <div>
    <GmapMap
      :center="{ lat: 37.7749, lng: -122.4194 }"
      :zoom="12"
      style="width: 100%; height: 400px;"
    >
      <GmapMarker :position="{ lat: 37.7749, lng: -122.4194 }" />
    </GmapMap>
  </div>

    <div class="spacer"></div>
  <ui-footer></ui-footer>
</template>


<script setup>



/* import { GmapMap, GmapMarker } from "vue-toastification";


definePageMeta({
  name: "Maps",
  components: {
    GmapMap,
    GmapMarker
 
  },
})


// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerView({
    map: map,
    position: position,
    title: "Uluru",
  });
}

initMap();
*/
</script>

