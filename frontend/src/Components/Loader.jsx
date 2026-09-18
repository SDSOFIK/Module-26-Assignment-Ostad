const Loader = ({ size = 'medium' }) => {
  const sizeClass =
    size === 'small' ? 'h-6 w-6' : size === 'large' ? 'h-16 w-16' : 'h-10 w-10';

  return (
    <div className="flex justify-center items-center py-10">
      <div
        className={`${sizeClass} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}
      ></div>
    </div>
  );
};

export default Loader;