
import React from "react";

const OverviewSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-gradient p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Total Views</h3>
          <p className="text-3xl font-bold text-instablue-800">24,389</p>
          <p className="text-sm text-green-600 mt-2">+15% from last week</p>
        </div>
        <div className="card-gradient p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-instablue-800">3,127</p>
          <p className="text-sm text-green-600 mt-2">+8% from last week</p>
        </div>
        <div className="card-gradient p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Searches Today</h3>
          <p className="text-3xl font-bold text-instablue-800">842</p>
          <p className="text-sm text-green-600 mt-2">+12% from yesterday</p>
        </div>
      </div>
      
      <div className="mt-8 card-gradient p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="pb-4 border-b border-gray-200 flex justify-between">
              <div>
                <p className="font-medium">User searched for @username{item}</p>
                <p className="text-sm text-gray-500">{item * 10} minutes ago</p>
              </div>
              <span className="text-instablue-500 text-sm">View Details</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
