import React from "react";
import {
  FaQuoteLeft,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <section className="max-w-5xl mx-auto bg-gray-200 shadow-lg rounded-lg p-8 mb-12">
        <h1 className="text-4xl font-bold text-white bg-grey-200 py-10 mb-6 text-center">
          About Us
        </h1>

        <div className="space-y-12">
          {/* Mission Section */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to provide a comprehensive and user-friendly
              platform for managing attendance, leave requests, and generating
              insightful reports. We aim to streamline administrative tasks and
              enhance productivity for organizations of all sizes.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-green-50 p-6 rounded-lg shadow-3xl">
            <h2 className="text-3xl font-semibold text-green-600 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We envision a future where attendance management is seamless and
              intuitive. Our goal is to empower organizations with the tools
              they need to manage their workforce efficiently and make
              data-driven decisions with ease.
            </p>
          </div>

          {/* Team Section */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
              Meet the Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                <img
                  src="https://via.placeholder.com/150"
                  alt="John Doe"
                  className="w-32 h-32 rounded-full mb-4 border-4 border-blue-200"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  John Doe
                </h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              {/* Team Member 2 */}
              <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Jane Smith"
                  className="w-32 h-32 rounded-full mb-4 border-4 border-green-200"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Jane Smith
                </h3>
                <p className="text-gray-600">Chief Technology Officer</p>
              </div>
              {/* Team Member 3 */}
              <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Emily Johnson"
                  className="w-32 h-32 rounded-full mb-4 border-4 border-yellow-200"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Emily Johnson
                </h3>
                <p className="text-gray-600">Head of Customer Support</p>
              </div>
              {/* Add more team members as needed */}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
              What Our Users Say
            </h2>
            <div className="space-y-6">
              {/* Testimonial 1 */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <FaQuoteLeft className="text-gray-400 text-xl mr-2" />
                  <p className="text-gray-700">
                    The attendance portal has significantly streamlined our
                    process. It's easy to use and very effective.
                  </p>
                </div>
                <p className="text-gray-600 font-semibold">Alex Brown</p>
                <p className="text-gray-500">HR Manager</p>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <FaQuoteLeft className="text-gray-400 text-xl mr-2" />
                  <p className="text-gray-700">
                    Great tool for managing leave requests and attendance. The
                    reports are detailed and insightful.
                  </p>
                </div>
                <p className="text-gray-600 font-semibold">Jamie Lee</p>
                <p className="text-gray-500">Operations Director</p>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaEnvelope className="text-gray-600 text-xl mr-4" />
                <p className="text-gray-700">contact@attendanceportal.com</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-gray-600 text-xl mr-4" />
                <p className="text-gray-700">+1 (123) 456-7890</p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-600 text-xl mr-4" />
                <p className="text-gray-700">
                  1234 Attendance St, Suite 567, City, Country
                </p>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {/* FAQ 1 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  How do I get started with the portal?
                </h3>
                <p className="text-gray-700">
                  You can get started by signing up for an account. Once
                  registered, you can log in and start exploring the features.
                </p>
              </div>
              {/* FAQ 2 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Is there a mobile app available?
                </h3>
                <p className="text-gray-700">
                  Currently, our platform is web-based. However, we are working
                  on a mobile app to make it even more accessible.
                </p>
              </div>
              {/* Add more FAQs as needed */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
