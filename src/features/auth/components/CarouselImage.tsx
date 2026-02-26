export default function CarouselImage() {
  return (
    <section
      id="ContainerBackgroundImages"
      className="flex w-full max-w-171.25"
    >
      <span className="fixed w-171.25 top-0 left-0 right-0 h-40 bg-[linear-gradient(0deg,rgba(235,237,242,0)_0%,#EBEDF2_100%)] z-10"></span>
      <span className="fixed w-171.25 bottom-0 left-0 right-0 h-40 bg-[linear-gradient(0deg,#EBEDF2_0%,rgba(235,237,242,0)_100%)] z-10"></span>
      <section
        id="BackgroundImages"
        className="fixed top-0 h-screen w-full max-w-171.25 overflow-hidden"
      >
        <div className="flex justify-center gap-2.5">
          <div className="flex flex-col w-95 gap-2.5">
            <div className="slider w-95">
              <div className="slide-top flex flex-col gap-2.5">
                <img src="assets/images/thumbnails/auth-1.png" alt="image" />
                <img src="assets/images/thumbnails/auth-2.png" alt="image" />
                <img src="assets/images/thumbnails/auth-3.png" alt="image" />
                <img src="assets/images/thumbnails/auth-1.png" alt="image" />
                <img src="assets/images/thumbnails/auth-2.png" alt="image" />
                <img src="assets/images/thumbnails/auth-3.png" alt="image" />
              </div>
            </div>
            <div className="slider w-95">
              <div className="slide-top flex flex-col gap-2.5">
                <img src="assets/images/thumbnails/auth-1.png" alt="image" />
                <img src="assets/images/thumbnails/auth-2.png" alt="image" />
                <img src="assets/images/thumbnails/auth-3.png" alt="image" />
                <img src="assets/images/thumbnails/auth-1.png" alt="image" />
                <img src="assets/images/thumbnails/auth-2.png" alt="image" />
                <img src="assets/images/thumbnails/auth-3.png" alt="image" />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-68.75 gap-2.5">
            <div className="slider w-68.75">
              <div className="slide-bottom flex flex-col gap-2.5">
                <img src="assets/images/thumbnails/auth-4.png" alt="image" />
                <img src="assets/images/thumbnails/auth-5.png" alt="image" />
                <img src="assets/images/thumbnails/auth-6.png" alt="image" />
                <img src="assets/images/thumbnails/auth-4.png" alt="image" />
                <img src="assets/images/thumbnails/auth-5.png" alt="image" />
                <img src="assets/images/thumbnails/auth-6.png" alt="image" />
              </div>
            </div>
            <div className="slider w-68.75">
              <div className="slide-bottom flex flex-col gap-2.5">
                <img src="assets/images/thumbnails/auth-4.png" alt="image" />
                <img src="assets/images/thumbnails/auth-5.png" alt="image" />
                <img src="assets/images/thumbnails/auth-6.png" alt="image" />
                <img src="assets/images/thumbnails/auth-4.png" alt="image" />
                <img src="assets/images/thumbnails/auth-5.png" alt="image" />
                <img src="assets/images/thumbnails/auth-6.png" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
