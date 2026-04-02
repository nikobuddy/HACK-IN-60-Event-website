export type ProblemStatement = {
  id: string;
  title: string;
  problem: string;
  challenge: string;
};

export const problemStatements: ProblemStatement[] = [
  {
    id: "fuel",
    title: "Fuel Availability & Queue Indicator",
    problem:
      "Drivers often waste time and fuel searching for petrol pumps during shortages, only to find long queues or no availability.",
    challenge:
      "Build a system that helps users check real-time fuel availability and queue status at nearby petrol stations.",
  },
  {
    id: "support",
    title: "Smart Customer Support Assistant",
    problem:
      "Companies receive a high volume of repetitive customer queries related to orders, payments, and service updates, causing delays and workload for support teams.",
    challenge:
      "Build an intelligent assistant that can understand and respond to common customer queries instantly.",
  },
  {
    id: "crop",
    title: "Crop Decision Assistant for Farmers",
    problem:
      "Farmers often struggle to choose the right crop for the upcoming season based on soil, weather, and previous cultivation history.",
    challenge:
      "Build an intelligent assistant that recommends the best crop based on season, soil type, and previous crops.",
  },
  {
    id: "verify",
    title: "War & Conflict Fact Verification Tool",
    problem:
      "Information about wars and conflicts spreads quickly online, but much of it is misleading, incomplete, or exaggerated.",
    challenge:
      "Build a tool that verifies claims related to wars and conflicts, classifying them as true, false, or misleading with a brief explanation.",
  },
  {
    id: "kumbh",
    title: "Kumbh Mela Tent Locator",
    problem:
      "During large gatherings like the Kumbh Mela, finding nearby resting tents becomes difficult due to crowd density and unclear navigation.",
    challenge:
      "Build a solution that helps users locate the nearest available resting tents efficiently.",
  },
];
