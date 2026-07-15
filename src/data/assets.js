const asset = (fileName) => new URL(`../../assets/${fileName}`, import.meta.url).href;

export const assets = {
  background: asset('backgroud.jpg'),
  factory: asset('factory.png'),
  valveSeat: asset('valve-seat.jpg'),
  valveSeatDetail: asset('valve-seat02.jpg'),
  valve: asset('valve.png'),
  manufacturing: asset('manufacturing.jpg'),
  workshop: asset('workshop.png'),
  certificate: asset('iso-cert.png'),
  domesticBrands: asset('domestic-brands.png'),
  manBw: asset('manbw.png'),
  man: asset('man.png'),
  wartsila: asset('wartsila.png'),
  daihatsu: asset('daihatsu.png'),
  yanmar: asset('yanmar.png'),
  mitsubishi: asset('mitsubishi.png'),
  exportValves: asset('export-valves.jpg')
};
