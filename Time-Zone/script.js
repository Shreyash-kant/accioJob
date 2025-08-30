const resultContainer = document.getElementById("result-container");
const timeZoneContainer = document.getElementById("time-zone-container");
const submitBtn = document.getElementById("submit-btn");
const addressInput = document.getElementById("address");
//enter a geoapify api key to test
// const API_KEY = ;
const REVERSE_GEOCODE_BASE_URL = "https://api.geoapify.com/v1/geocode/reverse?";
const FORWARD_GEOCODE_BASE_URL =
  "https://api.geoapify.com/v1/geocode/search?text=";

function renderDetails(
  country,
  postCode,
  city,
  timeZone,
  lat,
  long,
  container = timeZoneContainer
) {
  // timeZoneContainer.innerHTML = "";
  container.innerHTML = `<div class="labels-container">
        <div class="label-name">Name of Time Zone:</div>
        <p class="info">${timeZone.name}</p>
      </div>
      <div class="labels-container coord-container">
        <div class="label-name latitude">
          Lat:
          <p class="info latitude-info">${lat}</p>
        </div>

        <div class="label-name longitude">
          Long:
          <p class="info longitude-info">${long}</p>
        </div>
      </div>
      <div class="labels-container">
        <div class="label-name">Offset STD:</div>
        <p class="info">${timeZone.offset_STD}</p>
      </div>
      <div class="labels-container">
        <div class="label-name">Offset STD Seconds:</div>
        <p class="info">${timeZone.offset_STD_seconds}</p>
      </div>
      <div class="labels-container">
        <div class="label-name">Offset DST:</div>
        <p class="info">${timeZone.offset_DST}</p>
      </div>
      <div class="labels-container">
        <div class="label-name">Offset DST Seconds:</div>
        <p class="info">${timeZone.offset_DST_seconds}</p>
      </div>
      <div class="labels-container">
        <div class="label-name">Country:</div>
        <p class="info">${country}</p>
      </div>
      <div class="labels-container">
        <div class="label-name">Postcode:</div>
        <p class="info">${postCode}</p>
      </div>
      <div class="labels-container">
        <div class="label-name">City:</div>
        <p class="info">${city}</p>
      </div>`;
}

async function fechTimeZoneDetails(latitude, longitude) {
  try {
    const response = await fetch(
      `${REVERSE_GEOCODE_BASE_URL}lat=${latitude}&lon=${longitude}&apiKey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong while fetching request!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  //   console.log("Latitude:", latitude);
  //   console.log("Longitude:", longitude);
  fechTimeZoneDetails(latitude, longitude)
    .then((data) => {
      //   console.log("fetched object", data);
      const obj = data.features[0];
      const propertiesObj = obj.properties;
      const { country, city, postcode, timezone } = propertiesObj;
      renderDetails(country, postcode, city, timezone, latitude, longitude);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
function failure(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

async function fetchAddress(address) {
  try {
    const response = await fetch(
      `${FORWARD_GEOCODE_BASE_URL}${encodeURIComponent(
        address
      )}&apiKey=${API_KEY}`
    );
    if (!response.ok)
      throw new Error("something went wrong while fetching address details");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, failure);
  } else console.log("geolocation is not supported");
});

submitBtn.addEventListener("click", (event) => {
  const inputAddress = addressInput.value.trim();
  if (!inputAddress)
    document.getElementById("error-message").style.display = "block";
  else {
    fetchAddress(inputAddress)
      .then((data) => {
        // console.log("for this address:", data);
        if (data.features && data.features.length > 0) {
          const obj = data.features[0];
          const propertiesObj = obj.properties;
          const { country, city, postcode, timezone, lat, lon } = propertiesObj;

          // Call a rendering function to display the results
          document.getElementById("your-result").style.display = "block";
          document.getElementById("error-message").style.display = "none";
          resultContainer.style.display = "block";
          renderDetails(
            country,
            postcode,
            city,
            timezone,
            lat,
            lon,
            resultContainer
          );
        } else {
          alert("No results found for that address.");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
});
