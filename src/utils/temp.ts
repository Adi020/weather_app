export const kelvinToCelcius = (tempK: number): String => {
  return `${(tempK - 273.15).toFixed(1)}°C`;
};

export const kelvinToFahrenheit = (tempK: number): String => {
  return `${((tempK - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
};
