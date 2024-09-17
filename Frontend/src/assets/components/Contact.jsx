import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <section className="max-w-5xl mx-auto bg-gray-200 shadow-lg rounded-lg p-8 mb-12">
        <h1 className="text-4xl font-bold text-white bg-grey-200 py-10 mb-6 text-center">
          Contact Us
        </h1>

        <div className="space-y-12">
          {/* Contact Information Section */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-3xl">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-gray-600 text-xl mr-4" />
                <p className="text-gray-700">contact@attendanceportal.com</p>
              </div>
              <div className="flex items-center mb-4">
                <FaPhone className="text-gray-600 text-xl mr-4" />
                <p className="text-gray-700">+1 (123) 456-7890</p>
              </div>
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-gray-600 text-xl mr-4" />
                <p className="text-gray-700">
                  1234 Attendance St, Suite 567, City, Country
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full px-4 py-2 border rounded-lg"
                  rows="6"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Find Us Here
            </h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full rounded-lg shadow-md"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.434763547116!2d-122.41941868468154!3d37.77492927975938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808b1e274c29%3A0x5b1d9185107c7f5b!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1634276482635!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
