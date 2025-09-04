export async function fetchLocation(cityName: string) {
  const params = new URLSearchParams({
    q: cityName,
    format: 'json',
    limit: '5',
    polygon_geojson: '1',
  });

  const url = `https://nominatim.openstreetmap.org/search?${params.toString()}`;

  //   console.log('Fetching URL:', url);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'User-Agent': 'io-react-native-test/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchReverseLocation(lat: number, lon: number) {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    format: 'json',
    zoom: '18',
    addressdetails: '1',
  });

  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'User-Agent': 'io-react-native-test/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json();
}
