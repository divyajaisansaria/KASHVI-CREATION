import React from "react";
import Footer from "../../components/common/Footer";
import { BookText } from "lucide-react";
import { motion } from "framer-motion";

const TermsConditions = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f4f0] text-[#6b3d2f]">
      <div className="container mx-auto px-6 py-12 flex-grow">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BookText className="text-[#0a373b] mr-4" size={48} />
          </motion.div>
          <motion.h1
            className="text-3xl font-semibold"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Terms & Conditions
          </motion.h1>
        </div>

        {/* Terms and Conditions Content */}
        <motion.div
          className="space-y-6 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <motion.p variants={paragraphVariants}>
            <img
              src="[Image URL - Subtle background of legal documents or a quill]"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-10"
            />
            Please read these terms and conditions carefully before using our website. By accessing this website, you agree to comply
            with and be bound by these terms.
          </motion.p>

          <MotionSection title="Website Use">
            Users must engage with the website lawfully and respect the intellectual property of others. Any unauthorized use or harmful
            activities are strictly prohibited.
            {/* Image Suggestion: Icon representing law/justice */}
          </MotionSection>

          <MotionSection title="Product Information">
            Product descriptions and images are for illustration purposes only and may not be exact representations of the actual
            products. We strive to provide accurate details, but variations may occur.
            {/* Image Suggestion: Saree image, slightly blurred */}
          </MotionSection>

          <MotionSection title="Pricing and Payment">
            Prices are subject to change and may exclude taxes and shipping charges. We reserve the right to modify prices without prior
            notice. Payment must be made in full before shipment.
          </MotionSection>

          <MotionSection title="Returns and Refunds">
            Please refer to our Return and Refund Policy for information on item returns and refunds. Certain conditions and limitations
            may apply.
          </MotionSection>

          <MotionSection title="Intellectual Property">
            All content, including text, graphics, logos, and images, belongs to Kashvi Creations and is protected by copyright laws.
            Unauthorized use, reproduction, or distribution is prohibited.
          </MotionSection>

          <MotionSection title="Governing Law">
            These terms are governed by the laws of the applicable jurisdiction. Any disputes shall be resolved in accordance with these
            laws.
          </MotionSection>

          {/* Contact Us Section */}
          <motion.div className="mt-8 border-t pt-4" variants={paragraphVariants}>
            <p className="text-center">
              For any inquiries, please contact us at{" "}
              <a href="mailto:hello@kashvi.com" className="text-[#0a373b] underline hover:text-[#6b3d2f] transition-colors">
                hello@kashvi.com
              </a>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
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

export default TermsConditions;
