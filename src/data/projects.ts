export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'VortexCart',
    description: 'AI-powered ecommerce platform with smart recommendations and neural search.',
    fullDescription: 'VortexCart is a full-featured ecommerce platform powered by AI-driven product recommendations and neural search capabilities. Built on Node.js, it delivers personalized shopping experiences with real-time inventory management and intelligent customer insights.',
    image: '/Neonspark_files/vortexCart.png',
    tags: ['Ecommerce', 'AI', 'Node.js'],
  },
  {
    id: 2,
    title: 'Lumina Marketplace',
    description: 'High-scale multi-vendor platform for luxury sustainable goods.',
    fullDescription: 'Lumina Marketplace is a high-scale multi-vendor platform connecting luxury sustainable brands with conscious consumers. Built with React and AWS, it features vendor dashboards, escrow payments, and carbon footprint tracking.',
    image: '/Neonspark_files/LuminaMarketplace.png',
    tags: ['Ecommerce', 'React', 'AWS'],
  },
  {
    id: 3,
    title: 'Zenith D2C',
    description: 'Premium direct-to-consumer store for high-end lifestyle electronics.',
    fullDescription: 'Zenith D2C is a premium direct-to-consumer storefront for high-end lifestyle electronics. Leveraging Next.js and Stripe, it provides a seamless shopping experience with custom product configurators, subscription management, and real-time order tracking.',
    image: '/Neonspark_files/ZenithD2C.png',
    tags: ['Ecommerce', 'Next.js', 'Stripe'],
    demoUrl: 'https://zenithd2c.example.com',
  },
  {
    id: 4,
    title: 'Samriddhi',
    description: 'Agricultural product registration and online inventory management.',
    fullDescription: 'Samriddhi is an agricultural technology platform for product registration, inventory management, and supply chain tracking. Built with Python and PostgreSQL, it helps farmers and distributors manage stock levels, certifications, and order fulfillment.',
    image: '/Neonspark_files/Samriddhi.png',
    tags: ['Agro Tech', 'Python', 'PostgreSQL'],
  },
  {
    id: 5,
    title: 'Chartmind',
    description: 'AI-powered analytics and data visualization for financial markets.',
    fullDescription: 'Chartmind is an AI-powered analytics platform delivering real-time data visualization for financial markets. Using D3.js for interactive charts and Python-based ML models for predictive insights, it helps traders and analysts make data-driven decisions.',
    image: '/Neonspark_files/chartmindai.png',
    tags: ['AI / Analytics', 'D3.js', 'FinTech'],
    demoUrl: 'https://chartmind.example.com',
  },
  {
    id: 6,
    title: 'ConsultAdmin',
    description: 'Comprehensive administrative platform for business management.',
    fullDescription: 'ConsultAdmin is a comprehensive SaaS platform for business management and administrative workflows. Built with TypeScript and modern dashboard architecture, it streamlines client management, project tracking, invoicing, and team collaboration.',
    image: '/Neonspark_files/consultAdmin.png',
    tags: ['SaaS / Enterprise', 'TypeScript', 'Dashboard'],
  },
  {
    id: 7,
    title: 'Night Club',
    description: 'Premium nightlife booking and event management platform.',
    fullDescription: 'Night Club is a premium nightlife booking platform featuring real-time table reservations, event ticketing, and guest list management. Built with real-time technologies, it offers venue owners a complete solution for event promotion and crowd management.',
    image: '/Neonspark_files/nightclub.png',
    tags: ['Media / Creative Tech', 'Booking', 'Real-time'],
  },
  {
    id: 8,
    title: 'Velocity',
    description: 'Complete corporate training center website with Student Portal.',
    fullDescription: 'Velocity is a complete corporate training center platform featuring a student portal, course management, and progress tracking. Built with React, it enables organizations to create, distribute, and track training programs with detailed analytics and reporting.',
    image: '/Neonspark_files/velocity.png',
    tags: ['EdTech', 'LMS', 'React'],
    demoUrl: 'https://velocity.example.com',
  },
];
