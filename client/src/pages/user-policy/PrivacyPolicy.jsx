import React from "react";
import Footer from "../../components/common/Footer";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import Head from "../../components/shopping-view/header";
import WhatsAppButton from "../../components/common/WhatsAppButton";
const PrivacyPolicy = () => {
  return (
    <div>
      <Head/>
    <div className="min-h-screen flex flex-col bg-[#f8f4f0] text-[#6b3d2f]">
      <div className="container mx-auto px-6 py-12 flex-grow">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Lock className="text-[#0a373b] mr-4" size={48} />
          </motion.div>
          <motion.h1
            className="text-3xl font-semibold"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Privacy Policy
          </motion.h1>
        </div>

        {/* Privacy Policy Content */}
        <motion.div
          className="space-y-6 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <motion.p variants={paragraphVariants}>
            <img
              src="[Image URL - A lock icon or a subtle image related to security/privacy]"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-10"
            />
            Your privacy is important to us. This policy explains how we handle your data and protect your personal information.
          </motion.p>

          <MotionSection title="Data Collection">
            We collect personal details such as your name, email address, and browsing behavior to enhance your experience on our website
            and personalize our services.
            {/* Image Suggestion: Icon of a form or data collection */}
          </MotionSection>

          <MotionSection title="Data Usage">
            We use your data to improve our services, personalize content, and send you relevant updates and promotional offers. You can
            opt out of receiving marketing communications at any time.
          </MotionSection>

          <MotionSection title="Data Sharing">
            We do not sell or rent your data to third parties. However, we may share information with trusted partners who assist us in
            operating our website and providing our services. We ensure that these partners adhere to strict data protection standards.
          </MotionSection>

          <MotionSection title="Cookies">
            Our website uses cookies to improve user experience and analyze website traffic. You can manage your cookie preferences in your
            browser settings.
          </MotionSection>

          <MotionSection title="Data Security">
            We implement strong security measures to protect your personal information from unauthorized access, disclosure, or
            alteration.
             {/* Image Suggestion: Lock Icon */}
          </MotionSection>

          <MotionSection title="Your Rights">
            You have the right to access, correct, or delete your personal data. To exercise these rights or for any privacy-related
            concerns, please contact us.
          </MotionSection>

          {/* Contact Us Section */}
          <motion.div className="mt-8 border-t pt-4" variants={paragraphVariants}>
            <p className="text-center">
              For privacy-related concerns, reach out at{" "}
              <a href="mailto:hello@kashvi.com" className="text-[#0a373b] underline hover:text-[#6b3d2f] transition-colors">
                hello@kashvi.com
              </a>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
      <WhatsAppButton/>
      <Footer />
    </div>
    </div>
  );
};

// Motion Section Component
const MotionSection = ({ title, children }) => (
  <motion.section
    className="mb-6 relative"
    variants={paragraphVariants}
    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
    transition={{ duration: 0.2 }}
  >
      {/* Image Suggestion: Scale image of a saree*/}
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    <p>{children}</p>
  </motion.section>
);

// Animation Variants
const paragraphVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export default PrivacyPolicy;
