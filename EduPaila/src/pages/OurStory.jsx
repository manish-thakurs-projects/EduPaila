import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OurStory = () => {
  const navigate = useNavigate();

  const data = {
    labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022'],
    datasets: [
      {
        label: 'Cost of Education',
        data: [500, 600, 700, 800, 1000, 1300, 1600], // Sample data points for the cost of education
        borderColor: '#4b8b3b',
        backgroundColor: 'rgba(75, 139, 59, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleNavigateToResources = () => {
    navigate('/joinus'); // Navigate to resources page when button clicked
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.h1
        className="text-3xl font-semibold text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Our Story
      </motion.h1>

      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="text-lg text-gray-700 text-center">
          Education has become increasingly expensive over the past few years, and we noticed that many students and
          parents are struggling to find affordable resources. We decided to create a platform that offers educational
          resources at a minimal cost, so everyone has access to quality learning materials.
        </p>
      </motion.div>

      {/* Graph Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <h2 className="text-xl font-semibold mb-4">Rising Education Costs</h2>
        <Line data={data} options={options} />
      </motion.div>

      <motion.div
        className="text-center flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <Button color="green" onClick={handleNavigateToResources} pill outline>
          Join Us
        </Button>
      </motion.div>
    </div>
  );
};

export default OurStory;
