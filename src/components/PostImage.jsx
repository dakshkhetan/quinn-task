const PostImage = ({ images }) => {
  return (
    <div className="w-full h-3/4 md:h-[80%] lg:h-[80%] mb-[2px] overflow-hidden">
      <img
        className="w-full h-full md:w-auto mx-auto"
        src={images[0].mediaurl}
        alt="post"
      />
    </div>
  );
};

export default PostImage;
