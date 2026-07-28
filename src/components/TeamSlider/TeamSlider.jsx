import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { teamMembers } from '../../data/tools.js';
import { image } from '../../lib/assets.js';
import styles from './TeamSlider.module.scss';

export default function TeamSlider() {
  return (
    <section className="team container" aria-label="Our team">
      <button
        className={`team__nav-arrow team-slider-prev ${styles.button} ${styles.previous}`}
        type="button"
        aria-label="Previous team member"
      >
        ‹
      </button>
      <Swiper
        modules={[A11y, Navigation, Pagination]}
        className={styles.slider}
        navigation={{
          prevEl: '.team-slider-prev',
          nextEl: '.team-slider-next',
        }}
        pagination={{ clickable: true }}
        loop
        a11y={{
          prevSlideMessage: 'Previous team member',
          nextSlideMessage: 'Next team member',
        }}
      >
        {teamMembers.map((member) => (
          <SwiperSlide key={member.name}>
            <div className="team__body">
              <div className="team__member member">
                <div className="member__photo-wrapper">
                  <img
                    src={image('david-suarez.png')}
                    alt={member.name}
                    className="member__photo"
                    loading="lazy"
                  />
                  <div className="member__photo-wrapper--backdrop-bliks" />
                </div>
                <div className="member__info">
                  <h3 className="member__name">{member.name}</h3>
                  <p className="member__role">{member.role}</p>
                </div>
              </div>
              <blockquote className="team__quote backdrop-title" data-title="“">
                {member.quote}
              </blockquote>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className={`team__nav-arrow team-slider-next ${styles.button} ${styles.next}`}
        type="button"
        aria-label="Next team member"
      >
        ›
      </button>
    </section>
  );
}
