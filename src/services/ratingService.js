const getStoredData = (key, initial) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
};

export const ratingService = {
  getRatings: () => getStoredData('customer_ratings', []),
  
  submitRating: (ratingData) => {
    const ratings = ratingService.getRatings();
    const newRating = {
      ...ratingData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    const newRatings = [...ratings, newRating];
    localStorage.setItem('customer_ratings', JSON.stringify(newRatings));
    return newRating;
  }
};
