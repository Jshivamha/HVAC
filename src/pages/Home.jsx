import { Link } from 'react-router-dom'
import { ShieldCheck, Wrench, Sparkles, Clock, Phone, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
}

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  },
}

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <motion.div 
            className="max-w-2xl text-center lg:text-left"
            initial="hidden"
            animate="show"
            variants={container}
          >
            <motion.h1 
              className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl"
              variants={item}
            >
              Revolutionizing <span className="text-primary">HVAC</span> Solutions
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg leading-8 text-slate-600"
              variants={item}
            >
              Design-centric, energy-efficient HVAC systems for malls, hospitals, offices, and warehouses. 
              We optimize both CAPEX and OPEX with precision engineering and smart automation.
            </motion.p>
            
            <motion.div 
              className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
              variants={item}
            >
              <Button asChild size="lg">
                <Link to="/contact" className="group">
                  <Phone className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Talk to Our Engineers
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/projects" className="group">
                  View Our Work
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative mt-16 lg:mt-0 lg:flex-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative mx-auto aspect-video w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 shadow-xl ring-1 ring-slate-200/50">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600566752225-0c8a8d6088e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-90 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4I Process - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-24">
        <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            <motion.h2 
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              variants={item}
            >
              Our <span className="text-primary">4I Approach</span>
            </motion.h2>
            <motion.p 
              className="mx-auto mt-4 max-w-3xl text-lg text-slate-600"
              variants={item}
            >
              We follow a rigorous 4 'I' approach to everything HVAC, ensuring excellence at every step
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />
            
            {/* Process items */}
            <div className="space-y-16 lg:space-y-24">
              {[
                {
                  title: 'Interact',
                  icon: <ShieldCheck className="h-8 w-8 text-primary" />,
                  content: 'This is the stage where we listen to you. The team of designers at our company pays utmost attention to understand your heating, ventilation, and centralized air conditioning requirements. We take building drawings and layouts to comprehend the building dimensions and features that enable us to innovate and design a customized HVAC solution catered to your specific needs.'
                },
                {
                  title: 'Innovate & Design',
                  icon: <Sparkles className="h-8 w-8 text-primary" />,
                  content: 'Whether it\'s a greenfield turnkey HVAC project or a brownfield ongoing HVAC project, innovation and design play an important role not only in delivering an efficient and aesthetic HVAC solution but also in reducing the CAPEX as well as OPEX. The team of designers at our company is adept at handling large size, medium size, small size projects with equal ease.'
                },
                {
                  title: 'Install',
                  icon: <Wrench className="h-8 w-8 text-primary" />,
                  content: 'Once the design is approved and the work order is issued, our team of installers quickly get into the groove. We select installers based on geography, ratings, and the team size. The installation team works under the supervision of our design engineer and installs the HVAC equipment and machinery as per the approved design and drawing.'
                },
                {
                  title: 'Impress',
                  icon: <Clock className="h-8 w-8 text-primary" />,
                  content: 'After the installation work is completed within the given timeframe, our team of design engineers thoroughly test the HVAC system. Only when the HVAC system has passed through a series of stringent quality checks, we hand it over to the client.'
                }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 group mb-16`}
                >
                  {/* Icon container with number */}
                  <div className="relative flex-shrink-0 z-10 mx-auto lg:mx-0">
                    <div className="relative">
                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white shadow-lg border border-slate-200 group-hover:shadow-xl transition-all duration-300">
                        {item.icon}
                      </div>
                      {/* Desktop number indicator - positioned absolutely within the icon container */}
                      <div className="hidden lg:flex items-center justify-center h-10 w-10 rounded-full bg-white border-2 border-primary/20 text-primary font-bold text-lg absolute -right-2 -top-2 z-20">
                        {index + 1}
                      </div>
                      {/* Mobile number indicator */}
                      <div className="lg:hidden absolute -right-2 -top-2 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold text-sm z-20">
                        {index + 1}
                      </div>
                    </div>
                    <div className="hidden lg:block absolute -z-10 -inset-4 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 w-full lg:w-auto">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 group-hover:shadow-md transition-all duration-300 h-full">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* CTA at the bottom */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg text-slate-600 mb-6">
              Ready to experience our 4I approach for your project?
            </p>
            <Button asChild size="lg">
              <Link to="/contact" className="group">
                Get Started with a Free Consultation
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092921461-39b2f2db99b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            <motion.h2 
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              variants={item}
            >
              Why Choose <span className="text-primary-400">HVMC?</span>
            </motion.h2>
            <motion.p 
              className="mx-auto mt-4 max-w-2xl text-lg text-slate-300"
              variants={item}
            >
              We're committed to excellence in every aspect of our service.
            </motion.p>
          </motion.div>

          <motion.div 
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
          >
            {[
              {
                title: 'Energy Efficiency',
                desc: 'Cut costs with our optimized HVAC solutions designed for maximum energy savings.',
                icon: '⚡',
              },
              {
                title: 'Cost-Effective',
                desc: 'Competitive pricing without compromising on quality or performance.',
                icon: '💰',
              },
              {
                title: 'Expert Team',
                desc: 'Certified professionals with years of industry experience.',
                icon: '👨‍💼',
              },
              {
                title: 'Warranty',
                desc: 'Peace of mind with our comprehensive 1-year warranty on all installations.',
                icon: '🛡️',
              },
            ].map(({ title, desc, icon }, index) => (
              <motion.div 
                key={title}
                variants={item}
                className="group"
              >
                <div className="relative h-full overflow-hidden rounded-2xl bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  <div className="mb-4 text-3xl">{icon}</div>
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-slate-300">{desc}</p>
                  <div className="absolute -right-6 -bottom-6 h-40 w-40 rounded-full bg-primary/10 transition-all duration-500 group-hover:scale-150" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="relative bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Our <span className="text-primary">Products</span>
              </h2>
              <p className="mt-2 text-lg text-slate-600">
                Premium HVAC solutions for every need
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products" className="group">
                Browse All Products
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
          >
            {[
              {
                title: 'VRF / VRV Systems',
                desc: 'High-efficiency variable refrigerant flow systems for optimal climate control.',
                icon: '❄️',
                bg: 'bg-blue-50',
              },
              {
                title: 'Ductable AC',
                desc: 'Powerful and efficient ducted air conditioning solutions for large spaces.',
                icon: '🌬️',
                bg: 'bg-green-50',
              },
              {
                title: 'AHU / FCU',
                desc: 'Advanced air handling and fan coil units for superior air distribution.',
                icon: '🌀',
                bg: 'bg-purple-50',
              },
              {
                title: 'Valves & Accessories',
                desc: 'High-quality components for complete HVAC system integration.',
                icon: '🔧',
                bg: 'bg-amber-50',
              },
            ].map(({ title, desc, icon, bg }, index) => (
              <motion.div 
                key={title}
                variants={item}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className={`p-6 ${bg} bg-opacity-50`}>
                    <div className="mb-4 text-4xl">{icon}</div>
                  </div>
                  <div className="p-6 pt-0">
                    <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                    <p className="mt-2 text-slate-600">{desc}</p>
                    <div className="mt-4">
                      <Link 
                        to="/contact" 
                        className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 group-hover:underline"
                      >
                        Learn more
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Our <span className="text-primary">Projects</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Transforming spaces with innovative HVAC solutions across various industries.
            </p>
          </motion.div>

          <motion.div 
            className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative px-8 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center">
              <div className="lg:w-1/2">
                <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Explore Our Portfolio
                </h3>
                <p className="mt-4 text-lg text-slate-300">
                  From luxury hotels to high-tech IT parks, our projects showcase our expertise in delivering top-tier HVAC solutions.
                </p>
                <div className="mt-8">
                  <Button size="lg" asChild>
                    <Link to="/projects" className="group">
                      View All Projects
                      <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative mt-12 lg:mt-0 lg:ml-12 lg:flex-1">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <motion.div 
                      key={item}
                      className="aspect-square overflow-hidden rounded-lg bg-slate-700"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <div className="h-full w-full bg-slate-300/20" />
                    </motion.div>
                  ))}
                </div>
                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-24">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 shadow-xl sm:px-12 sm:py-16 lg:px-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to optimize your HVAC system?
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
                Get in touch with our experts for a free consultation and customized solution.
              </p>
              <motion.div 
                className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Button 
                  size="lg" 
                  className="bg-white text-blue-700 hover:bg-blue-50 hover:shadow-lg"
                  asChild
                >
                  <Link to="/contact">
                    Get Free Consultation
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link to="/projects">
                    View Our Work
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
