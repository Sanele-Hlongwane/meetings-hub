import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex-center h-screen w-full">
      <div className="loader border-t-transparent border-blue-500 border-solid border-4 rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default Loader;

