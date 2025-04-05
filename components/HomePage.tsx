"use client"
import React, { useEffect } from 'react';

const HomePage: React.FC = () => {
  // Function to handle smooth scroll navigation
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // JavaScript for form and link handling
  const sendEmail = () => {
    alert("Form submitted!");
    // Your email sending logic here
  };

  useEffect(() => {
    // Initialize JS for dynamic content or functionality
    // Example: Add any other JS functionality you may need
  }, []);

  return (
    <div className="font-poppins">
      {/* Header */}
      <header style={{ backgroundImage: "url('https://ap-southeast-2-seek-apac.graphassets.com/AEzBCRO50TYyqbV6XzRDQz/ICwNwZCiRZWPGr4dwGX4')" }} className="w-full bg-gray-100 bg-cover bg-fixed relative h-screen">
        <div className="bg-seashell absolute top-0 w-full z-10">
          <div className="container mx-auto">
            <div className="flex justify-between py-4">
              <div className="text-2xl font-bold text-dodgerblue uppercase">
                <a href="#">Ahmed</a>
              </div>
              <ul className="flex">
                <li className="px-4 cursor-pointer text-dodgerblue hover:text-blue-600" onClick={() => handleClick('skills')}>Skills</li>
                <li className="px-4 cursor-pointer text-dodgerblue hover:text-blue-600" onClick={() => handleClick('projects')}>Projects</li>
                <li className="px-4 cursor-pointer text-dodgerblue hover:text-blue-600" onClick={() => handleClick('contact')}>Contact</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-5xl text-blue-500 font-semibold capitalize">Software Engineer</p>
          <button className="mt-5 bg-dodgerblue  px-6 py-3 rounded-md hover:bg-blue-600 transition transform duration-500">
            <a href="#">View my work on GitHub</a>
          </button>
          <div className="mt-5">
            <a href="#" className="mr-3 text-white"><i className="fab fa-linkedin fa-2x"></i></a>
            <a href="#" className="mr-3 text-white"><i className="fab fa-facebook fa-2x"></i></a>
            <a href="#"><i className="fab fa-instagram fa-2x text-white"></i></a>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <div id="skills" className="py-32 ">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-semibold text-dodgerblue mb-10">Skills</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Skill items */}
            <div className="border p-8 hover:scale-105 transition duration-300 shadow-lg">
              <i className="fab fa-html5 fa-5x text-orange-500 mb-4"></i>
              <h3 className="text-xl font-bold">HTML5</h3>
              <p>I can write hypertext markup language to build the site structure</p>
            </div>
            <div className="border p-8 hover:scale-105 transition duration-300 shadow-lg">
              <i className="fab fa-css3-alt fa-5x text-blue-500 mb-4"></i>
              <h3 className="text-xl font-bold">CSS & CSS3</h3>
              <p>Write cascading style sheets to coordinate the structure of the site</p>
            </div>
            <div className="border p-8 hover:scale-105 transition duration-300 shadow-lg">
              <i className="fab fa-bootstrap fa-5x text-purple-700 mb-4"></i>
              <h3 className="text-xl font-bold">Bootstrap</h3>
              <p>Using available classes to ease writing CSS code</p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className="bg-black py-32 text-white">
        <h1 className="text-4xl font-semibold text-center text-dodgerblue mb-10">Projects</h1>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project items */}
          <div className="project-item cursor-pointer bg-white border p-4 rounded-lg shadow-md hover:scale-105 transition duration-300">
            <div className="image mb-4">
              <img src="https://github.com/ahmedibrahimaliemam/portfolio/blob/master/images/game.jpg?raw=true" alt="project33" className="w-full h-48 object-cover rounded" />
            </div>
            <div className="project-details">
              <p className="text-lg font-bold text-orange-500">Project 1: <span className="font-bold">Shopping cart with JS</span></p>
              
            </div>
          </div>
          <div className="project-item cursor-pointer bg-white border p-4 rounded-lg shadow-md hover:scale-105 transition duration-300">
            <div className="image mb-4">
              <img src="https://github.com/ahmedibrahimaliemam/portfolio/blob/master/images/image-2.jpg?raw=true" alt="project33" className="w-full h-48 object-cover rounded" />
            </div>
            <div className="project-details">
              <p className="text-lg font-bold text-orange-500">Project 2:<span className="font-bold">Shopping cart with JS</span></p>
              
            </div>
          </div>
          <div className="project-item cursor-pointer bg-white border p-4 rounded-lg shadow-md hover:scale-105 transition duration-300">
            <div className="image mb-4">
              <img src="https://github.com/ahmedibrahimaliemam/portfolio/blob/master/images/chair%20(2).jpg?raw=true" alt="project33" className="w-full h-48 object-cover rounded" />
            </div>
            <div className="project-details">
              <p className="text-lg font-bold text-orange-500">Project  3:<span className="font-bold">Shopping cart with JS</span></p>
              
            </div>
          </div>
          {/* Add other project items here */}
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-32 ">
        <h1 className="text-4xl font-semibold text-dodgerblue text-center mb-10">Contact</h1>
        <form className="max-w-lg mx-auto" onSubmit={(e) => { e.preventDefault(); sendEmail(); }}>
          <div className="mb-4">
            <input type="text" className="form-control p-3 w-full border border-gray-300 rounded-md" placeholder="Name" required />
          </div>
          <div className="mb-4">
            <input type="email" className="form-control p-3 w-full border border-gray-300 rounded-md" placeholder="Email" required />
          </div>
          <div className="mb-4">
            <input type="phone" className="form-control p-3 w-full border border-gray-300 rounded-md" placeholder="Phone" required />
          </div>
          <div className="mb-4">
            <textarea className="form-control p-3 w-full border border-gray-300 rounded-md" placeholder="Leave a comment" required></textarea>
          </div>
          <button type="submit" className="btn bg-black text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer">Submit</button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto text-center">
          <p>&copy; 2022 <a href="#" className="text-dodgerblue">Ahmed Ibrahim</a></p>
          <div className="flex justify-center space-x-5 mt-5 ">
            <a href="#"><i className="fab fa-linkedin fa-2x"></i>linkedin</a>
            <a href="#"><i className="fab fa-facebook fa-2x"></i>facebook</a>
            <a href="#"><i className="fab fa-instagram fa-2x"></i>instagram</a>
            <a href="#"><i className="fab fa-github-square fa-2x"></i>github</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
