const isInView = () => {
  const shape = imageRef.current.getBoundingClientRect();
  return shape.top >= 0 && shape.bottom <= window.innerHeight;
};

export default isInView;
