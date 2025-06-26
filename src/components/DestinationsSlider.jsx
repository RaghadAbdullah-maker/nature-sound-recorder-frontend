import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
import { EffectCoverflow } from 'swiper/modules';
import { Link } from 'react-router-dom';

SwiperCore.use([EffectCoverflow]);

function DestinationsSlider() {

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('access_token');
    axios
      .get(`${import.meta.env.VITE_BASE_URL}destinations/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDestinations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Falid');
        setLoading(false);
      });
  }, []);


  return (
    <div className="section">
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
        }}
        className="destination-slider"
      >
        {destinations.map((dest) => (
          <SwiperSlide key={dest.id}>
            <div className="card destination-card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={dest.image} alt={dest.title} />
                </figure>
              </div>
              <div className="card-content">
              <Link to={"recordings/"} className="title is-5">
                {dest.title}
              </Link>
              
                <p className="subtitle is-6">{dest.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default DestinationsSlider;
