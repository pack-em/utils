const scrollRefIntoView = (ref) =>
  ref.current &&
  ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });

export default scrollRefIntoView;
