const isInView = (elementRef) => {
  const rect = elementRef.current.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
};

export default isInView;
