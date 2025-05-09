import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Home() {

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">Welcome to Yuvi's Artistry</h1>

        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          className="mb-10"
        >
          {/* 🖼️ Custom static slides */}
          <div>
            <img src="/images/art1.jpg" alt="Art 1" className="h-[100px] w-90% object-cover rounded-xl shadow-lg" />
            <p className="legend text-lg bg-opacity-70 bg-black text-white p-2">Art Title 1 - ₹999</p>
          </div>
          <div>
            <img src="/images/art2.jpg" alt="Art 2" className="h-[100px] w-90% object-cover rounded-xl shadow-lg" />
            <p className="legend text-lg bg-opacity-70 bg-black text-white p-2">Art Title 2 - ₹1499</p>
          </div>
          <div>
            <img src="/images/art3.jpg" alt="Art 3" className="h-[100px] w-90% object-cover rounded-xl shadow-lg" />
            <p className="legend text-lg bg-opacity-70 bg-black text-white p-2">Art Title 3 - ₹1999</p>
          </div>
          <div>
            <img src="/images/art4.jpeg" alt="Art 4" className="h-[100px] w-90% object-cover rounded-xl shadow-lg" />
            <p className="legend text-lg bg-opacity-70 bg-black text-white p-2">Art Title 4 - ₹2499</p>
          </div>
          <div>
            <img src="/images/art5.jpeg" alt="Art 5" className="h-[100px] w-90% object-cover rounded-xl shadow-lg" />
            <p className="legend text-lg bg-opacity-70 bg-black text-white p-2">Art Title 5 - ₹2999</p>
          </div>
        </Carousel>      
      </div>

      <style>{`

      h1{
      text-align:center;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

      }
        .carousel .slide {
          background-color: #f3f4f6;
          width: 90%;
          height: 76vh; /* Adjusted height for a more consistent view */
        }

        .carousel .legend {
          font-size: 1.25rem;
          font-weight: bold;
          text-align: center;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 10px;
          border-radius: 5px;
          margin-top: 5%; /* Fixed typo: 'marigin-top' to 'margin-top' */
        }

        .carousel .thumb {
          border-radius: 8px;
        }

        /* Grid Image Hover Effect */
        .grid img {
          transition: transform 0.3s ease;
          object-fit: cover; /* Ensures the image fills the container without distortion */
          height: 90%; /* Ensures it fills the given height */
        }

        .grid img:hover {
          transform: scale(1.05);
        }

        .button {
          padding: 10px 20px;
          background-color: #38b2ac;
          color: white;
          border-radius: 4px;
          text-align: center;
        }

        .button:hover {
          background-color: #319795;
        }
      `}</style>
    </>
  );
}
