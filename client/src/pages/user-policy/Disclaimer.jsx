import React from "react";
import Footer from "../../components/common/Footer";
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import Head from "../../components/shopping-view/header";
import WhatsAppButton from "../../components/common/WhatsAppButton";
const Disclaimer = () => {
  return (
    <div>
      <Head/>
    <div className="min-h-screen flex flex-col bg-[#f8f4f0] text-[#6b3d2f]">
      <div className="container mx-auto px-6 py-12 flex-grow relative"> {/* Make container relative */}
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ShieldAlert className="text-[#0a373b] mr-4" size={48} />
          </motion.div>
          <motion.h1
            className="text-3xl font-semibold"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Disclaimer
          </motion.h1>
        </div>

        {/* Disclaimer Content */}
        <motion.div
          className="space-y-6 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <motion.p variants={paragraphVariants}>
            <img
              src="[Image URL - e.g., a subtle watermark or background texture related to fabric]"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-10" // Adjust opacity as needed
            />
            The information provided on this website (Kashvi Creations) is for general informational purposes only. While we strive
            for accuracy, we make no guarantees about the completeness or reliability of any content.
          </motion.p>

          <MotionSection title="Accuracy of Information">
            We aim to provide accurate and up-to-date information regarding our sarees, policies, and services. However, we make no
            warranties regarding its reliability or applicability. Reliance on any information provided on this website is solely at
            your own risk.
          </MotionSection>

          <MotionSection title="External Links">
            Our website may contain links to third-party sites that we do not control or endorse. We are not responsible for the content,
            privacy practices, or security of these external websites.
            {/* Image Suggestion: Small icon linking out */}
          </MotionSection>

          <MotionSection title="Limitation of Liability">
            Kashvi Creations shall not be liable for any losses, damages, or inconveniences caused by the use of our website or reliance
            on its content. This includes, but is not limited to, direct, indirect, incidental, or consequential damages.
            {/* Image Suggestion: Scale image of a saree*/}
          </MotionSection>

          <MotionSection title="Product Representation">
            Product descriptions, images, and pricing on our website are for reference purposes only and may not always be entirely
            accurate or up to date. We reserve the right to correct any errors or omissions.
             {/* Image Suggestion: Small icon linking out */}
          </MotionSection>

          <MotionSection title="Price and Offer Changes">
            Prices and offers displayed on our website are subject to change without prior notice. We reserve the right to modify or
            discontinue any product or offer at any time.
          </MotionSection>

          {/* Contact Us Section */}
          <motion.div className="mt-8 border-t pt-4" variants={paragraphVariants}>
            <p className="text-center">
              If you have any questions or concerns regarding this disclaimer, please contact us at{" "}
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
    className="mb-6 relative" // Make it relative to contain absolute image
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

export default Disclaimer;
