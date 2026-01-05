import { useEffect } from 'react';

/**
 * Hook untuk mengaktifkan animasi scroll menggunakan Intersection Observer
 *
 * Cara penggunaan:
 * 1. Import hook ini di komponen Anda
 * 2. Panggil useScrollAnimations() di dalam useEffect
 * 3. Tambahkan class 'animate-on-scroll', 'fade-in-up', 'fade-in-left', 'fade-in-right', atau 'scale-in' ke elemen yang ingin dianimasikan
 * 4. Tambahkan class 'stagger-1', 'stagger-2', dll untuk delay bertingkat
 */
export const useScrollAnimations = () => {
  useEffect(() => {
    // Setup Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Trigger ketika 15% elemen terlihat
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Tambahkan class 'is-visible' ketika elemen masuk viewport
          entry.target.classList.add('is-visible');
        } else {
          // Hapus class 'is-visible' ketika elemen keluar viewport
          // Ini memungkinkan animasi diputar ulang setiap kali scroll
          entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    // Target semua elemen dengan class animasi
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .section-bg-animate'
    );

    animatedElements.forEach((el) => observer.observe(el));

    // Cleanup
    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};

/**
 * Helper function untuk menambahkan animasi class ke elemen secara manual
 * @param {HTMLElement} element - Elemen yang akan dianimasikan
 * @param {string} animationType - Tipe animasi (fade-in-up, fade-in-left, fade-in-right, scale-in)
 * @param {string} staggerDelay - Delay bertingkat (stagger-1, stagger-2, dll)
 */
export const addAnimationClass = (element, animationType = 'fade-in-up', staggerDelay = '') => {
  if (!element) return;

  element.classList.add(animationType);
  if (staggerDelay) {
    element.classList.add(staggerDelay);
  }
};

/**
 * Component wrapper untuk section dengan scroll snap dan animasi
 */
export const ScrollSection = ({ children, className = '', sectionId = '' }) => {
  useEffect(() => {
    // Add scroll-snap class to section
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.add('snap-section');
    }
  }, [sectionId]);

  return (
    <section id={sectionId} className={`snap-section ${className}`}>
      {children}
    </section>
  );
};

export default useScrollAnimations;
