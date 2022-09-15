export const formatStars = (stars: number) => {
  const formatedStars = stars.toLocaleString().split(',');

  return formatedStars.length > 1
    ? formatedStars.slice(0, -1).join(',') + 'k'
    : formatedStars[0];
};
