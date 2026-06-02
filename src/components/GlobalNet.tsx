import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type CityNode = {
  lat: number;
  lng: number;
  city: string;
  client: string;
  project: string;
  tech: string;
  code: string;
  isOrigin?: boolean;
};

const ORIGIN: CityNode = {
  lat: 22.7196,
  lng: 75.8577,
  city: 'Indore',
  client: 'Vortex Cubes (HQ)',
  project: 'Command Center',
  tech: 'Origin Node',
  code: 'IN',
  isOrigin: true
};

const DESTINATIONS: CityNode[] = [
  { lat: 52.3676, lng: 4.9041, city: 'Amsterdam', client: 'Client NL', project: 'Data Pipeline', tech: 'Node.js, AWS', code: 'NL' },
  { lat: 52.52, lng: 13.405, city: 'Berlin', client: 'Client DE', project: 'Automation', tech: 'Python, Docker', code: 'DE' },
  { lat: 38.9072, lng: -77.0369, city: 'Washington DC', client: 'Client US Gov', project: 'Security', tech: 'Rust, AWS', code: 'US' },
  { lat: 40.7128, lng: -74.006, city: 'New York', client: 'Orbosis Global', project: 'IT Services', tech: 'Vue.js, AWS', code: 'US' },
  { lat: 37.7749, lng: -122.4194, city: 'San Francisco', client: 'Agro Tech', project: 'SaaS Platform', tech: 'Next.js, Node.js', code: 'US' },
  { lat: 3.139, lng: 101.6869, city: 'Kuala Lumpur', client: 'Client MY', project: 'FinTech App', tech: 'React Native', code: 'MY' },
  { lat: 23.8103, lng: 90.4125, city: 'Dhaka', client: 'Client BD', project: 'E-commerce', tech: 'React, Shopify', code: 'BD' },
  { lat: 51.5074, lng: -0.1278, city: 'London', client: 'Kohlico', project: 'Logistics', tech: 'Angular, Spring', code: 'GB' }
];

const ALL_CITIES = [ORIGIN, ...DESTINATIONS];

const Globe3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const initGlobe = async () => {
      if (!containerRef.current) return;

      const [{ default: Globe }, THREE] = await Promise.all([
        import('globe.gl'),
        import('three')
      ]);

      if (!isMounted || !containerRef.current) return;

      const arcsData = DESTINATIONS.map((city, index) => ({
        startLat: ORIGIN.lat,
        startLng: ORIGIN.lng,
        endLat: city.lat,
        endLng: city.lng,
        color: ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 1)'],
        delay: index * 500
      }));

      const ringsData = [
        { lat: ORIGIN.lat, lng: ORIGIN.lng, maxR: 12, propagationSpeed: 2, repeatPeriod: 1500, color: '#ffffff' },
        ...DESTINATIONS.map((c) => ({ lat: c.lat, lng: c.lng, maxR: 4, propagationSpeed: 1, repeatPeriod: 2500, color: '#ffffff' }))
      ];

      const width = Math.min(window.innerWidth - 40, 600);
      const height = width;

      const globe = new Globe(containerRef.current)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
        .backgroundColor('rgba(0,0,0,0)')
        .width(width)
        .height(height)
        .pointOfView({ lat: 20, lng: 40, altitude: 2.2 })
        .pointsData(ALL_CITIES)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor(() => '#ffffff')
        .pointAltitude(0.05)
        .pointRadius(0.5)
        .pointsMerge(true)
        .ringsData(ringsData)
        .ringColor('color')
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod')
        .arcsData(arcsData)
        .arcColor('color')
        .arcDashLength(0.6)
        .arcDashGap(0.1)
        .arcDashInitialGap((d: any) => d.delay / 2000)
        .arcDashAnimateTime(2500)
        .arcStroke(0.7);

      const scene = globe.scene();
      scene.traverse((obj: any) => {
        if ((obj.type === 'Line2' || obj.type === 'Mesh') && obj.material?.color?.getHex?.() === 0xffffff) {
          obj.material.blending = THREE.AdditiveBlending;
          obj.material.transparent = true;
        }
      });

      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.5;
      globe.controls().enableZoom = false;

      globeRef.current = globe;
    };

    initGlobe();

    const handleResize = () => {
      if (globeRef.current) {
        const width = Math.min(window.innerWidth - 40, 600);
        globeRef.current.width(width);
        globeRef.current.height(width);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  return (
    <div className="relative w-full max-w-[600px] aspect-square">
      <div ref={containerRef} className="w-full h-full rounded-full overflow-hidden" />
    </div>
  );
};

const GlobalNet: React.FC = () => {
  return (
    <section id="global" className="section bg-dark relative overflow-hidden py-24 md:py-32">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] -z-1"></div>

      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
              className="max-w-[620px] mx-auto lg:mx-0 text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="badge mb-6 inline-flex">Global Reach</div>
              <h2 className="text-h2 font-bold mb-6 uppercase leading-tight">
                Our <span className="gradient-text">Global Network</span>
              </h2>
              <p className="text-lg text-text-light mb-8 leading-relaxed max-w-[58ch] mx-auto lg:mx-0">
                Our infrastructure is built for the world. With high-performance nodes across multiple continents,
                we ensure your systems remain fast, reliable, and accessible from anywhere on the planet.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  '99.99% Uptime',
                  '7+ Countries',
                  '24/7 Global Support'
                ].map((stat, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full bg-secondary/30 px-3 py-1 text-xs sm:text-sm font-medium text-white"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <motion.div
              className="w-full flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <Globe3D />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalNet;
