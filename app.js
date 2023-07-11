function getLatLong() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve({ latitude, longitude });
      },
      (error) => reject(error)
    );
  });
}

// async function getCoords() {
//   try {
//     const coords = await getLatLong();
//     console.log(coords);
//     return {
//       latitude: coords.latitude,
//       longitude: coords.longitude,
//     };
//   } catch (error) {
//     console.error(error);
//   }
// }

getLatLong()
  .then((coords) => {
    const latitude = coords?.latitude ?? Number(19.076);
    const longitude = coords?.longitude ?? Number(72.8777);

    const map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(
        coords?.latitude ? "Your live location" : "Mumbai <br>Default location"
      )
      .openPopup();
  })
  .catch((error) => console.error(error));

// const { latitude, longitude } = await getCoords();
// console.log(latitude, longitude);
