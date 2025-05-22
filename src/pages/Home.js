import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; // Import Link for navigation
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <>
      <div className="home">
        {/* Hero Section */}
        <div className="hero-section text-center text-white py-20 px-4">
          <h1 className="hero-title">Welcome to Yuvi's Artistry</h1>
          <div className="button-group mt-10 flex justify-center gap-6 flex-wrap">
            {/* Wrap Admin button with Link to navigate */}
            <Link to="/login">
              <Button className="neon-button blue">Admin</Button>
            </Link>
              <Link to="/login">
            <Button className="neon-button green">Artist</Button>
            </Link>
            <Link to="/login">
            <Button className="neon-button pink">Customer</Button>
            </Link>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="carousel-wrapper max-w-5xl mx-auto px-4 py-16">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}  // Set interval for autoPlay to 3 seconds (3000ms)
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            {[ 
              { src: "/images/art1.jpg", title: "Divine Strokes", price: "₹999" },
              { src: "/images/art2.jpg", title: "Ethereal Flow", price: "₹1499" },
              { src: "/images/art3.jpg", title: "Mystic Glow", price: "₹1999" },
              { src: "/images/art4.jpeg", title: "Bold Harmony", price: "₹2499" },
              { src: "/images/art5.jpeg", title: "Silent Symphony", price: "₹2999" },
            ].map((art, index) => (
              <div key={index}>
                <img
                  src={art.src}
                  alt={art.title}
                  className="carousel-img"
                />
                <p className="legend">{`${art.title} - ${art.price}`}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* 🌌 Styles */}
      <style>{`
        .home {
          background-color: #0a0a0a;
          font-family: 'Orbitron', sans-serif;
          min-height: 100vh;
        }

        .hero-section {
          background: radial-gradient(circle at 50% 50%,rgb(26, 26, 26) 0%,rgb(58, 144, 184) 100%);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: bold;
          color:rgb(13, 14, 13);
          text-shadow: 0 0 10px #00fff7, 0 0 20px #00ccff;
          padding:1%;
        }

        .neon-button {
          padding: 12px 30px;
          font-size: 1.1rem;
          font-weight: 600;
          border: 2px solid transparent;
          border-radius: 8px;
          transition: all 0.4s ease;
          background-color: transparent;
          color: #fff;
          letter-spacing: 1px;
          margin:1%;
        }

        .neon-button:hover {
          transform: scale(1.05);
          background-color: #ff5ec722;
          border-color: #ff5ec7;
          box-shadow: 0 0 10px #ff5ec7, 0 0 20px #ff5ec7 inset;
        }

        .carousel-img {
          height: 700px;
          width: 100%;
          object-fit: cover;
          transition: all 0.4s ease-in-out;
          margin-top:2%;
        }

        .carousel-img:hover {
          filter: brightness(1.1) saturate(1.2);
          transform: scale(1.02);
        }

        .legend {
          font-size: 1.4rem;
          background: rgba(0, 0, 0, 0.7);
          color: #ffffff;
          padding: 12px 20px;
          border-radius: 8px;
          text-shadow: 0 0 5px #fff;
          backdrop-filter: blur(5px);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .carousel-img {
            height: 300px;
          }
        }
      `}</style>

      {/* Font Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    </>
  );
}
