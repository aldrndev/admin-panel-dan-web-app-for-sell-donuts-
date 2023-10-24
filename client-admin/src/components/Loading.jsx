const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex items-center flex-col justify-center z-50">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-opacity-40 rounded-full animate-spin"></div>
      <p className="text-gray-900 text-lg mt-2.5">
        Request is being processed, please wait...
      </p>
    </div>
  );
};

export default Loading;
